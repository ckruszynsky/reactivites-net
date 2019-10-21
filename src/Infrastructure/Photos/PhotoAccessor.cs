using Application.Contracts;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        public PhotoUploadResult Add(IFormFile file)
        {
            throw new System.NotImplementedException();
        }

        public string Delete(string id)
        {
            throw new System.NotImplementedException();
        }
    }
}