using System.Threading;
using System.Threading.Tasks;
using Application.Contracts;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;

            public Handler (IDbContextResolver contextResolver, IMapper mapper)
            {
                _contextResolver = contextResolver;
                _mapper = mapper;
            }

            public async Task<Profile> Handle (Query request, CancellationToken cancellationToken)
            {
                
                var context =  _contextResolver.GetContext();
                var user = await context.Set<AppUser>()
                    .Include (x => x.Photos)
                    .SingleOrDefaultAsync (x => x.UserName == request.Username);
                    
                return _mapper.Map<AppUser, Profile> (user);
            }
        }
    }
}