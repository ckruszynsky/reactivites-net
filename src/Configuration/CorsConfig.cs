using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class CorsConfig
    {
        public static void ServiceConfiguration (IServiceCollection services, string[] origins)
        {
            services.AddCors (Options =>
            {
                Options.AddPolicy (Constants.CorsPolicies.CORSPOLICY, policy =>
                {
                    policy
                        .WithExposedHeaders("WWW-Authenticate")
                        .AllowAnyHeader ()
                        .AllowAnyMethod ()
                        .WithOrigins (origins)
                        .AllowCredentials ();
                });
            });
        }
        public static void ApplicationConfiguration (IApplicationBuilder appBuilder)
        {
            appBuilder.UseCors (Constants.CorsPolicies.CORSPOLICY);
        }
    }
}