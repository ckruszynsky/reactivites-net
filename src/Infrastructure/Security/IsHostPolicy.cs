using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
        private readonly DataContext _dataContext;
        public IsHostRequirementHandler (IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;

        }
        protected override Task HandleRequirementAsync (AuthorizationHandlerContext context, IsHostPolicy requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?
                    .SingleOrDefault (x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var activityId = Guid.Parse (authContext.RouteData.Values["id"].ToString ());

                var activity = _dataContext
                    .Activities
                    .Include (x => x.UserActivities)
                    .ThenInclude (x => x.AppUser)
                    .FirstOrDefaultAsync (x => x.Id == activityId)
                    .Result;

                var host = activity?.UserActivities?.FirstOrDefault (x => x.IsHost);

                if (host?.AppUser?.UserName == currentUserName)
                {
                    context.Succeed (requirement);
                }
            }
            if (!context.HasSucceeded)
            {
                context.Fail ();
            }
            return Task.CompletedTask;
        }
    }
}