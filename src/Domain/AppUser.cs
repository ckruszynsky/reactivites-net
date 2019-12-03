using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<UserActivity> UserActivities { get; set; }
        public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();

        public ICollection<UserFollowing> Followings {get;set;} = new List<UserFollowing>();
        public ICollection<UserFollowing> Followers { get; set; } = new List<UserFollowing>();

    }
}