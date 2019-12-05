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
        public async Task<Profile> ReadProfile (string profileUserName)
        {
            var context = _contextResolver.GetContext ();

            var profileUser = await context.Set<AppUser> ()
                .Include(x=> x.Followers)
                .Include(x => x.Followings)
                .Include(x=> x.Photos)
                .SingleOrDefaultAsync (au => au.UserName == profileUserName);

            var currentUserName = _userAccessor.GetCurrentUsername ();

            if (profileUser == null)
            {
                throw new RestException (HttpStatusCode.NotFound, new { User = "Not found" });
            }

            var currentUser = await context.Set<AppUser> ()                                
                .Include(x=> x.Followings)
                .SingleOrDefaultAsync (au => au.UserName == currentUserName);

            var profile = _mapper.Map<AppUser, Profile> (profileUser);

            //returns if the currently logged in user is following the particular user 
            //that was passed to the method.
            if(currentUser.Followings.Any(x=> x.TargetId == profileUser.Id)){
                profile.IsFollowed = true;
            }
            return profile;
        }
    }
}