using System.Linq;
using Application.Contracts;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly IDbContextResolver _contextResolver;
        public FollowingResolver (IDbContextResolver contextResolver, IUserAccessor userAccessor)
        {
            _contextResolver = contextResolver;
            _userAccessor = userAccessor;
        }

        public bool Resolve (UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var users = _contextResolver.GetContext().Set<AppUser>();
            var currentUserName = _userAccessor.GetCurrentUsername();
            var currentUser = users
                .Include(u=> u.Followings)
                .SingleOrDefaultAsync(x=> x.UserName == currentUserName).Result;

            return currentUser.Followings.Any(x=> x.TargetId == source.AppUserId);        
        }
    }
}