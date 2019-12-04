using Application.Profiles;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class ProfileReaderConfiguration
    {
        public static void ServiceConfiguration(IServiceCollection services){
            services.AddScoped<IProfileReader,ProfileReader>();
        }
    }
}