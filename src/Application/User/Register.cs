using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Application.Errors;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator ()
            {
                RuleFor (x => x.DisplayName).NotEmpty ();
                RuleFor (x => x.Username).NotEmpty ();
                RuleFor (x => x.Email).NotEmpty ().EmailAddress ();
                RuleFor (x => x.Password).Password ();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler (IDbContextResolver contextResolver, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _contextResolver = contextResolver;

            }
            public async Task<User> Handle (Command request, CancellationToken cancellationToken)
            {
                try
                {
                    await CheckIfEmailAlreadyExists (request);
                    await CheckIfUserNameAlreadyExists (request);
                }
                catch (RestException ex)
                {
                    throw ex;
                }

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };

                var result = await _userManager.CreateAsync (user, request.Password);
                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                            Token = _jwtGenerator.CreateToken (user),
                            Username = user.UserName,
                            Image = user.Photos.FirstOrDefault(x=> x.IsMain)?.Url
                    };
                }
                throw new Exception ("Problem creating user");
            }

            private async Task CheckIfUserNameAlreadyExists (Command request)
            {
                var context = _contextResolver.GetContext();
                if (await context.Set<AppUser>().Where (x => x.UserName == request.Username).AnyAsync ())
                {
                    throw new RestException (HttpStatusCode.BadRequest, new
                    {
                        Username = "Username already exists"
                    });
                }
            }

            private async Task CheckIfEmailAlreadyExists (Command request)
            {   
                var context = _contextResolver.GetContext();
                if (await context.Set<AppUser>().Where (x => x.Email == request.Email).AnyAsync ())
                {
                    throw new RestException (HttpStatusCode.BadRequest, new
                    {
                        Email = "Email already exists"
                    });
                }
            }
        }
    }
}