using Application.Activities;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Configuration
{
    public class AutoMapperConfig
    {
        public static void ServiceConfiguration(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(List.Handler).Assembly);
        }
    }
}
