using Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main (string[] args)
        {

            var host = CreateHostBuilder (args).Build ();

            //Apply any pending migrations to the database
            //if the db does not exist it will create the db as well
            using (var scope = host.Services.CreateScope ())
            {
                var services = scope.ServiceProvider;
                try
                {
                    SeedDatabase (services);
                }
                catch (System.Exception ex)
                {

                    var logger = services.GetRequiredService<ILogger<Program>> ();
                    logger.LogError (ex, "An error occurred during migration");
                }
            }

            host.Run ();
        }

        private static void SeedDatabase (System.IServiceProvider services)
        {
            var context = services.GetRequiredService<DataContext> ();
            var userManager = services.GetRequiredService<UserManager<AppUser>> ();
            context.Database.Migrate ();
            Seed.SeedData (context, userManager).Wait ();
        }

        public static IHostBuilder CreateHostBuilder (string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder=> {
                    webBuilder.UseStartup<Startup> ();
                }
            );                        
    }
}