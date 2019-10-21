using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Contracts
{
    public interface IPhotoAccessor
    {
         PhotoUploadResult Add(IFormFile file);
         string Delete(string id);
    }
}