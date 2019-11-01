using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile ()
        {
            CreateMap<Comment, CommentDto> ()
                .ForMember (dest => dest.Username, o => o.MapFrom (src => src.Author.UserName))
                .ForMember (dest => dest.DisplayName, o => o.MapFrom (src => src.Author.DisplayName))
                .ForMember (dest => dest.Image, o => o.MapFrom (src => src.Author.Photos.FirstOrDefault (x => x.IsMain).Url));
        }
    }
}