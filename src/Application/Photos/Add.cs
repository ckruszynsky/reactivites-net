using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler (IDbContextResolver contextResovler, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _contextResolver = contextResovler;

            }
            public async Task<Photo> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var uploadResult = _photoAccessor.Add (request.File);
                var user = await context.Set<AppUser> ()
                    .Include (x => x.Photos)
                    .SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

                var photo = new Photo
                {
                    Url = uploadResult.Url,
                    Id = uploadResult.Id
                };
                if (!user.Photos.Any (x => x.IsMain))
                {
                    photo.IsMain = true;
                }
                user.Photos.Add (photo);
                var success = await context.SaveChangesAsync () > 0;
                if (success)
                {
                    return photo;
                }
                throw new Exception ("Problem saving changes");
            }
        }
    }
}