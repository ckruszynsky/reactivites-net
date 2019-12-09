using API.SignalR;
using Application.Activities;
using Application.Contracts;
using Configuration;
using Configuration.Middleware;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup (IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureDevelopmentServices(IServiceCollection services){
            EFCoreConfig.DevelopmentServiceConfiguration(
                services,
                Configuration.GetConnectionString("DefaultConnection")
            );

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services){
              EFCoreConfig.ServiceConfiguration (
                services,
                Configuration.GetConnectionString ("DefaultConnection")
            );
            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)
        {
          
            CorsConfig.ServiceConfiguration (
                services,
                Configuration["CrossOrigin:Domains"].Split (",")
            );

            MediatRConfig.ServiceConfiguration (services);
            AutoMapperConfig.ServiceConfiguration (services);

            services.AddSignalR();
            
            services.AddControllers(opt =>
            {
                //adds so that any requests made will need to be authorized.
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();

                opt.Filters.Add(new AuthorizeFilter(policy));

            }).AddFluentValidation(cfg =>
            cfg.RegisterValidatorsFromAssemblyContaining<Create>());


            IdentityConfig.ServiceConfiguration (services);

            services.AddAuthorization(opts =>
            {
                opts.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostPolicy());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    //instruct our api what need to be validated when a token is received
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(0)
                    };

                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = HandleMessageReceived()
                    };
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();


            PhotoAccessorConfig.ServiceConfiguration (services);
            ProfileReaderConfiguration.ServiceConfiguration(services);
            services.Configure<CloudinarySettings> (Configuration.GetSection ("Cloudinary"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });

            JwtAuthenticationConfig.ApplicationConfiguration (app);
            CorsConfig.ApplicationConfiguration (app);            
            
        }

        private static Func<MessageReceivedContext, Task> HandleMessageReceived()
        {
            return context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            };
        }
    }
}