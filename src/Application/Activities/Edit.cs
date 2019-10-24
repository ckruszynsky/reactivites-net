using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator ()
            {
                RuleFor (x => x.Title).NotEmpty ();
                RuleFor (x => x.Description).NotEmpty ();
                RuleFor (x => x.Category).NotEmpty ();
                RuleFor (x => x.Date).NotEmpty ();
                RuleFor (x => x.City).NotEmpty ();
                RuleFor (x => x.Venue).NotEmpty ();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            public Handler (IDbContextResolver contextResolver)
            {
                _contextResolver = contextResolver;
            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var activity = await context.Set<Activity> ().FindAsync (request.Id);

                if (activity == null)
                {
                    var errors = new
                    {
                    activity = $"Activity with id: ${request.Id} could not be found."
                    };
                    throw new RestException (HttpStatusCode.NotFound, errors);

                }
                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;

                var success = await context.SaveChangesAsync () > 0;
                if (success)
                {
                    return Unit.Value;
                }
                throw new Exception ("Problem saving changes");
            }
        }
    }
}