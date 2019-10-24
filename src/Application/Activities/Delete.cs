using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            public Handler(IDbContextResolver contextResolver)
            {
                _contextResolver = contextResolver;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext();
                var activity = await context.Set<Activity>().FindAsync(request.Id);
                if (activity == null)
                {
                    var errors = new
                    {
                        activity = $"Activity with id: ${request.Id} could not be found."
                    };
                    throw new RestException(HttpStatusCode.NotFound,errors);

                }
                
                context.Set<Activity>().Remove(activity);
                var success = await context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception("Problem saving changes");
            }
        }
    }
}