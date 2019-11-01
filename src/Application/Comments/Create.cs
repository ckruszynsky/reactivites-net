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

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly IDbContextResolver _contextResolver;
            private readonly IMapper _mapper;
            public Handler (IDbContextResolver contextResolver, IMapper mapper)
            {
                _mapper = mapper;
                _contextResolver = contextResolver;

            }
            public async Task<CommentDto> Handle (Command request, CancellationToken cancellationToken)
            {
                var context = _contextResolver.GetContext ();
                var activity = await context.Set<Activity> ().FindAsync (request.ActivityId);

                if (activity == null)
                {
                    throw new RestException (HttpStatusCode.NotFound, new { Activity = "Not Found" });
                }

                var user = await context.Set<AppUser> ().SingleOrDefaultAsync (x => x.UserName == request.Username);
                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add (comment);

                var success = await context.SaveChangesAsync () > 0;
                if (success)
                {
                    return _mapper.Map<CommentDto> (comment);
                }
                throw new Exception ("Problem saving changes");
            }
        }
    }
}