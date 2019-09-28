using System.Text;
using Application.Contracts;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Configuration
{
    public class JwtAuthenticationConfig
    {
        public static void ServiceConfiguration (IServiceCollection services, string tokenKey)
        {
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (tokenKey));

            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (opt =>
                {
                    //instruct our api what need to be validated when a token is received
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateAudience = false,
                    ValidateIssuer = false
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator> ();
            services.AddScoped<IUserAccessor, UserAccessor> ();
        }

        public static void ApplicationConfiguration (IApplicationBuilder appBuilder)
        {
            appBuilder.UseAuthentication ();
        }
    }
}