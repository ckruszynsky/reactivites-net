using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IDbContextResolver _contextResolver;
            public Handler (IDbContextResolver contextResolver, IUserAccessor userAccessor)
            {
                _contextResolver = contextResolver;
                _userAccessor = userAccessor;

            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var currentUsername = _userAccessor.GetCurrentUsername ();

                var observer = await context.Set<AppUser> ()
                    .SingleOrDefaultAsync (x => x.UserName == currentUsername);

                var target = await context.Set<AppUser> ()
                    .SingleOrDefaultAsync (x => x.UserName == request.Username);

                if (target == null)
                {
                    throw new RestException (HttpStatusCode.NotFound, new { User = "Not found" });
                }

                var following = await context.Set<UserFollowing> ()
                    .SingleOrDefaultAsync (f => f.ObserverId == observer.Id && f.TargetId == target.Id);

                if (following == null)
                {
                    throw new RestException (HttpStatusCode.BadRequest, new { User = "You are not following this user" });
                }

                context.Set<UserFollowing> ().Remove (following);
                var success = await context.SaveChangesAsync () > 0;
                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception ("Problem saving changes");
            }
        }
    }
}