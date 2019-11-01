using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;
            public Handler (IDbContextResolver contextResolver, IMapper mapper)
            {
                _mapper = mapper;
                _contextResolver = contextResolver;

            }
            public async Task<ActivityDto> Handle (Query request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var activity = await context.Set<Activity> ()
                    .Include (a => a.Comments)
                    .Include (ua => ua.UserActivities)
                    .ThenInclude (au => au.AppUser)
                    .ThenInclude (ap => ap.Photos)
                    .SingleOrDefaultAsync (x => x.Id == request.Id);

                if (activity == null)
                {
                    var errors = new
                    {
                    activity = $"Activity with id: ${request.Id} could not be found."
                    };
                    throw new RestException (HttpStatusCode.NotFound, errors);

                }
                var activityToReturn = _mapper.Map<Activity, ActivityDto> (activity);

                return activityToReturn;
            }
        }
    }
}