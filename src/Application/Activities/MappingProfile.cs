using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile ()
        {
            CreateMap<Activity, ActivityDto> ();
            CreateMap<UserActivity, AttendeeDto> ()
                .ForMember (d => d.Username, opts => opts.MapFrom (src => src.AppUser.UserName))
                .ForMember (d => d.DisplayName, opts => opts.MapFrom (src => src.AppUser.DisplayName))
                .ForMember( d=> d.Image, opts => opts.MapFrom(s=> s.AppUser.Photos.FirstOrDefault(x=> x.IsMain).Url));

        }
    }
}