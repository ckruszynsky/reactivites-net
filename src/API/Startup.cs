using Configuration;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
            EFCoreConfig.ServiceConfiguration (
                services,
                Configuration.GetConnectionString ("DefaultConnection")
            );

            CorsConfig.ServiceConfiguration (
                services,
                Configuration["CrossOrigin:Domains"].Split (",")
            );

            MediatRConfig.ServiceConfiguration (services);
            AutoMapperConfig.ServiceConfiguration (services);
            MvcConfig.ServiceConfiguration (services, CompatibilityVersion.Version_2_2);
            IdentityConfig.ServiceConfiguration (services);
            AuthorizationConfig.ServicesConfiguration (services);
            JwtAuthenticationConfig.ServiceConfiguration (services, Configuration["TokenKey"]);
            PhotoAccessorConfig.ServiceConfiguration(services);
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
             
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env)
        {
            ErrorHandlingConfig.ApplicationConfiguration (app);
            JwtAuthenticationConfig.ApplicationConfiguration (app);
            CorsConfig.ApplicationConfiguration (app);
            MvcConfig.ApplicationConfiguration (app);
        }
    }
}