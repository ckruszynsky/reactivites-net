using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<List<UserActivityDto>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<UserActivityDto>>
        {
            private readonly IDbContextResolver _contextResolver;
            public Handler (IDbContextResolver contextResolver)
            {
                _contextResolver = contextResolver;                
            }

            public async Task<List<UserActivityDto>> Handle (Query request,
                CancellationToken cancellationToken)
            {
                var users = _contextResolver.GetContext().Set<AppUser>();
                var user = await users
                    .Include(ua=> ua.UserActivities)
                    .ThenInclude(a=> a.Activity)
                    .SingleOrDefaultAsync (x => x.UserName == request.Username);

                if (user == null)
                    throw new RestException (HttpStatusCode.NotFound, new { User = "Not found" });

                var queryable = user.UserActivities
                    .OrderBy (a => a.Activity.Date)
                    .AsQueryable ();

                switch (request.Predicate)
                {
                    case "past":
                        queryable = queryable.Where (a => a.Activity.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        queryable = queryable.Where (a => a.IsHost);
                        break;
                    case "future":
                        queryable = queryable.Where (a => a.Activity.Date >= DateTime.Now);
                        break;
                    default:
                    break;
                }

                var activities = queryable.ToList ();
                var activitiesToReturn = new List<UserActivityDto> ();

                foreach (var activity in activities)
                {
                    var userActivity = new UserActivityDto
                    {
                        Id = activity.Activity.Id,
                        Title = activity.Activity.Title,
                        Category = activity.Activity.Category,
                        Date = activity.Activity.Date
                    };

                    activitiesToReturn.Add (userActivity);
                }

                return activitiesToReturn;
            }
        }
    }
}