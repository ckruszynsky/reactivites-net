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
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler (IDbContextResolver contextResolver, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _contextResolver = contextResolver;

            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext();
                var user = await context.Set<AppUser>()
                    .Include (x => x.Photos)
                    .SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

                var photo = user.Photos.FirstOrDefault (p => p.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException (HttpStatusCode.NotFound, new { Photo = "Not Found" });
                }

                if (photo.IsMain)
                {
                    throw new RestException (HttpStatusCode.BadRequest, new { Photo = "You cannot delete your main photo." });
                }

                var result = _photoAccessor.Delete (request.Id);

                if (string.IsNullOrEmpty (result))
                {
                    throw new Exception ("Problem deleting the photo");
                }

                user.Photos.Remove (photo);
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