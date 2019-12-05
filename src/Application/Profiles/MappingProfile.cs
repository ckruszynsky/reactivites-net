using System.Collections.Generic;
using Domain;

namespace Application.Profiles
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile ()
        {
            CreateMap<AppUser, Profile> ()
                .ForMember (x => x.Username, opts => opts.MapFrom (src => src.UserName))
                .ForMember (x => x.DisplayName, opts => opts.MapFrom (src => src.DisplayName))
                .ForMember (x => x.Image, opts => opts.MapFrom<MainPhotoResolver> ())
                .ForMember (x => x.Photos, opts => opts.MapFrom (src => src.Photos))
                .ForMember (x => x.Bio, opts => opts.MapFrom (src => src.Bio))
                .ForMember (x => x.FollowersCount, opts => opts.MapFrom(src => src.Followers.Count))
                .ForMember( x=> x.FollowingCount, opts => opts.MapFrom(src => src.Followings.Count));
        }
    }
}