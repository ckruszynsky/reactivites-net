using System.Collections.Generic;
using System.Linq;
using AutoMapper;
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
                .ForMember (x => x.Bio, opts => opts.MapFrom (src => src.Bio));
        }
    }

    public class MainPhotoResolver : IValueResolver<AppUser, Profile, string>
    {
        public string Resolve (AppUser source, Profile destination, string destMember, ResolutionContext context)
        {
            return source.Photos.FirstOrDefault (x => x.IsMain == true)?.Url;
        }
    }
}