using System;
using Application.Contracts;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class CloudinaryPhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryPhotoAccessor (IOptions<CloudinarySettings> config)
        {
            var acc = new Account (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary (acc);
        }
        public PhotoUploadResult Add (IFormFile file)
        {
            var uploadResult = new ImageUploadResult ();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream ())
                {
                    var uploadParams = new ImageUploadParams
                    {
                    File = new FileDescription (file.FileName, stream)
                    };
                    uploadResult = _cloudinary.Upload (uploadParams);
                }
            }

            if (uploadResult.Error != null)
            {
                throw new Exception (uploadResult.Error.Message);
            }
            
            return new PhotoUploadResult
            {
                Id = uploadResult.PublicId,
                    Url = uploadResult.SecureUri.AbsoluteUri
            };
        }

        public string Delete (string id)
        {
            return string.Empty;
        }
    }
}