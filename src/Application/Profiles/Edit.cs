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
using Microsoft.EntityFrameworkCore;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IUserAccessor _userAccessor;
            public Handler(IDbContextResolver contextResolver, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _contextResolver = contextResolver;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext();
                var user = await context.Set<AppUser>()
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername ());
                
                if(user == null){
                    throw new RestException (HttpStatusCode.NotFound, new { User = "Not Found" });
                }
                user.DisplayName = request.DisplayName;
                user.Bio = request.Bio;
                try
                {
                    await context.SaveChangesAsync();
                    return Unit.Value;
                }
                catch (System.Exception)
                {
                    throw new Exception("Problem saving changes");                    
                }                
            }
        }
    }
}