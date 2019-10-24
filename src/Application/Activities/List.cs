using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }
        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;
            public Handler (IDbContextResolver contextResolver, IMapper mapper)
            {
                _mapper = mapper;
                _contextResolver = contextResolver;

            }

            public async Task<List<ActivityDto>> Handle (Query request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var activities = await context.Set<Activity> ()
                    .Include (ua => ua.UserActivities)
                    .ThenInclude (au => au.AppUser)
                    .ToListAsync (cancellationToken);
                return _mapper.Map<List<Activity>, List<ActivityDto>> (activities);
            }
        }
    }
}