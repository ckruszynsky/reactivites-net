using Application.Activities;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class MvcConfig
    {
        public static void ServiceConfiguration (IServiceCollection services, CompatibilityVersion compatabilityVersion)
        {
            services.AddMvc (opt =>
                {
                    //adds so that any requests made will need to be authorized.
                    var policy = new AuthorizationPolicyBuilder ()
                        .RequireAuthenticatedUser ()
                        .Build ();

                    opt.Filters.Add (new AuthorizeFilter (policy));

                })
                .AddFluentValidation (
                    cfg =>
                    cfg.RegisterValidatorsFromAssemblyContaining<Create> ()
                )
                .SetCompatibilityVersion (compatabilityVersion);
        }

        public static void ApplicationConfiguration (IApplicationBuilder appBuilder)
        {
            appBuilder.UseMvc ();
        }
    }
}