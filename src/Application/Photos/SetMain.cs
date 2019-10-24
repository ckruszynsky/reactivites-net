using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IUserAccessor _userAccessor;
            public Handler(IDbContextResolver contextResolver, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _contextResolver = contextResolver;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext();
                var user = await context.Set<AppUser>()
                        .Include(u=> u.Photos)
                        .SingleOrDefaultAsync(x=> x.UserName == _userAccessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(x=> x.Id == request.Id);
                
                if(photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo="Not Found"});
                
                var currentMain = user.Photos.FirstOrDefault(x=> x.IsMain);
                currentMain.IsMain = false;
                photo.IsMain = true;

                var success = await context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}