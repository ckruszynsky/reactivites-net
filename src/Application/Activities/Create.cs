using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
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
            private readonly IUserAccessor _userAccessor;
            public Handler (IDbContextResolver contextResolver, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _contextResolver = contextResolver;

            }
            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue,
                    Category = request.Category
                };

                var context = _contextResolver.GetContext();

                context.Set<Activity>().Add (activity);

                var user = await context.Set<AppUser>()
                    .SingleOrDefaultAsync (x => x.UserName == _userAccessor.GetCurrentUsername ());

                var attendee = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                context.Set<UserActivity>().Add (attendee);

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