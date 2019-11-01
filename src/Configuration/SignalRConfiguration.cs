using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;

namespace Configuration
{
    public class SignalRConfiguration
    {
        public static void ServiceConfiguration (IServiceCollection services)
        {
            services.AddSignalR ();
        }

        public static void ApplicationConfiguration<THub> (IApplicationBuilder appBuilder) where THub : Hub

        {
            appBuilder.UseSignalR (routes => { routes.MapHub<THub> ("/chat"); });
        }
    }
}