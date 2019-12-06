using System;
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
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
            public Query (int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                StartDate = startDate ?? DateTime.Now;
                IsHost = isHost;
                IsGoing = isGoing;
                Limit = limit;
                Offset = offset;

            }

        }
        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler (IDbContextResolver contextResolver, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _contextResolver = contextResolver;

            }

            public async Task<ActivitiesEnvelope> Handle (Query request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var currentUserName = _userAccessor.GetCurrentUsername();
                var queryable = context.Set<Activity> ()
                    .Include (ua => ua.UserActivities)
                    .ThenInclude (au => au.AppUser)
                    .ThenInclude (ap => ap.Photos)
                    .Where (x => x.Date >= request.StartDate)
                    .OrderBy (x => x.Date)
                    .AsQueryable ();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where (
                        x => x.UserActivities.Any(
                            a=> a.AppUser.UserName == currentUserName
                        )
                    );
                }

                if(request.IsHost && !request.IsGoing){
                    queryable = queryable.Where (
                        x => x.UserActivities.Any(
                            a=> a.AppUser.UserName == currentUserName && a.IsHost
                        )
                    );
                }

                var activities = await queryable
                    .Skip (request.Offset ?? 0)
                    .Take (request.Limit ?? 3)                   
                    .ToListAsync (cancellationToken);

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>> (activities),
                        Count = queryable.Count ()
                };
            }
        }
    }
}