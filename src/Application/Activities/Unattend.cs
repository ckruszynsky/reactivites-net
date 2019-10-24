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

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IUserAccessor _userAccessor;
            public Handler (IDbContextResolver contextResolver, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _contextResolver = contextResolver;

            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext();
                var activity = await context.Set<Activity>().FindAsync (request.Id);

                if (activity == null)
                {
                    throw new RestException (HttpStatusCode.NotFound, new
                    {
                        Activity = "Could not find activity"
                    });
                }

                var user = await context.Set<AppUser>()
                    .SingleOrDefaultAsync (u => u.UserName == _userAccessor.GetCurrentUsername ());

                var attendance = await context.Set<UserActivity>()
                    .SingleOrDefaultAsync (ua => ua.ActivityId == activity.Id && ua.AppUserId == user.Id);

                if (attendance == null)
                {
                    return Unit.Value;
                }

                if (attendance.IsHost)
                {
                    throw new RestException (HttpStatusCode.BadRequest, new { Attendance = "You cannot remove yourself from an event which you are hosting." });
                }

                context.Set<UserActivity>().Remove (attendance);

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