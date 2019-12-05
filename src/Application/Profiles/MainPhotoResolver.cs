using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Profiles
{
    public class MainPhotoResolver : IValueResolver<AppUser, Profile, string>
    {
        public string Resolve (AppUser source, Profile destination, string destMember, ResolutionContext context)
        {
            return source.Photos.FirstOrDefault (x => x.IsMain == true)?.Url;
        }
    }
}