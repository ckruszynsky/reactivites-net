using Application.Errors;
using Configuration.Middleware;
using Microsoft.AspNetCore.Builder;
namespace Configuration
{
    public class ErrorHandlingConfig
    {
        public static void ApplicationConfiguration (IApplicationBuilder appBuilder)
        {
            appBuilder.UseMiddleware<ErrorHandlingMiddleware> ();
        }
    }
}