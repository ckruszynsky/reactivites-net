using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly IDbContextResolver _contextResolver;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        public ProfileReader (IDbContextResolver contextResolver, IUserAccessor userAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _userAccessor = userAccessor;
            _contextResolver = contextResolver;

        }
        public async Task<Profile> ReadProfile (string username)
        {
            var context = _contextResolver.GetContext ();

            var followingUser = await context.Set<AppUser> ()
                .SingleOrDefaultAsync (au => au.UserName == username);

            var currentUserName = _userAccessor.GetCurrentUsername ();

            if (followingUser == null)
            {
                throw new RestException (HttpStatusCode.NotFound, new { User = "Not found" });
            }

            var currentUser = await context.Set<AppUser> ()
                .Include(x=> x.Photos)
                .Include(x=> x.Followers)
                .Include(x=> x.Followings)
                .SingleOrDefaultAsync (au => au.UserName == currentUserName);

            var profile = _mapper.Map<AppUser, Profile> (followingUser);

            //returns if the currently logged in user is following the particular user 
            //that was passed to the method.
            if(currentUser.Followings.Any(x=> x.TargetId == followingUser.Id)){
                profile.IsFollowed = true;
            }
            return profile;
        }
    }
}