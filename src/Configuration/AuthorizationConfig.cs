using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class AuthorizationConfig
    {
        public static void ServicesConfiguration (IServiceCollection services)
        {
            services.AddAuthorization (opts =>
            {
                opts.AddPolicy ("IsActivityHost", policy =>
                {
                    policy.Requirements.Add (new IsHostPolicy ());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler> ();
        }
    }
}