using System.Collections.Generic;
using System.Linq;
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
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int Count { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public Query (int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;

            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }
        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;
            public Handler (IDbContextResolver contextResolver, IMapper mapper)
            {
                _mapper = mapper;
                _contextResolver = contextResolver;

            }

            public async Task<ActivitiesEnvelope> Handle (Query request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var queryable = context.Set<Activity> ().AsQueryable ();

                var activities = await queryable
                    .Skip (request.Offset ?? 0)
                    .Take (request.Limit ?? 3)
                    .Include (ua => ua.UserActivities)
                    .ThenInclude (au => au.AppUser)
                    .ThenInclude (ap => ap.Photos)
                    .ToListAsync (cancellationToken);

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>> (activities),
                    Count = queryable.Count()
                };
            }
        }
    }
}