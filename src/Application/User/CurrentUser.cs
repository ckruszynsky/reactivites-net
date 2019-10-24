using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private IJwtGenerator _jwtGenerator;
            private IUserAccessor _userAccessor;
            private readonly IDbContextResolver _contextResolver;

            public Handler (UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator, IUserAccessor userAccessor, IDbContextResolver contextResolver)
            {
                _contextResolver = contextResolver;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _userAccessor = userAccessor;

            }

            public async Task<User> Handle (Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync (_userAccessor.GetCurrentUsername ());
                var appUser = await _contextResolver.GetContext ()
                    .Set<AppUser> ()
                    .Include (x => x.Photos)
                    .FirstOrDefaultAsync (x => x.Id == user.Id);

                return new User
                {
                    DisplayName = user.DisplayName,
                        Username = user.UserName,
                        Token = _jwtGenerator.CreateToken (user),
                        Image = appUser?.Photos?.FirstOrDefault (x => x.IsMain)?.Url
                };
            }
        }
    }

}