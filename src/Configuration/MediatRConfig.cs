using Application.Activities;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Configuration
{
    public class MediatRConfig
    {
        public static void ServiceConfiguration(IServiceCollection services)
        {
            services.AddMediatR(typeof(List.Handler).Assembly);
        }
    }
}
