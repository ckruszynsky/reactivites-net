using Application.Contracts;
using Application.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace Configuration
{
    public class EFCoreConfig
    {
        public static void ServiceConfiguration (IServiceCollection services,string connectionString)
        {
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(connectionString);
            });

            services.AddScoped<IDbContextResolver,DbContextResolver<DataContext>>();
        }
    }
}