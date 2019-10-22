using Application.Contracts;
using Infrastructure.Photos;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class PhotoAccessorConfig
    {
         public static void ServiceConfiguration(IServiceCollection services) {
            services.AddScoped<IPhotoAccessor,CloudinaryPhotoAccessor>();
         }
    }
}