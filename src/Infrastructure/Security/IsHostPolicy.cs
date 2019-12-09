using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Contracts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostPolicy : IAuthorizationRequirement { }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostPolicy>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDbContextResolver _contextResolver;
        public IsHostRequirementHandler (IHttpContextAccessor httpContextAccessor, IDbContextResolver contextResolver)
        {
            _contextResolver = contextResolver;
            _httpContextAccessor = httpContextAccessor;

        }
        protected override Task HandleRequirementAsync (AuthorizationHandlerContext context, IsHostPolicy requirement)
        {
               var dbContext = _contextResolver.GetContext();
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                    .SingleOrDefault (x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var activityId = Guid.Parse(
                    _httpContextAccessor
                        .HttpContext
                        .Request
                        .RouteValues
                        .SingleOrDefault(x=> x.Key == "id")
                        .Value
                        .ToString()
                );

                var activity = dbContext
                    .Set<Activity>()
                    .Include (x => x.UserActivities)
                    .ThenInclude (x => x.AppUser)
                    .FirstOrDefaultAsync (x => x.Id == activityId)
                    .Result;

                var host = activity?.UserActivities?.FirstOrDefault (x => x.IsHost);

                if (host?.AppUser?.UserName == currentUserName)
                {
                    context.Succeed (requirement);
                }
                       
            return Task.CompletedTask;
        }
    }
}