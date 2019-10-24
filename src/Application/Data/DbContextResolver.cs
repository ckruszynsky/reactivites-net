using Application.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Application.Data
{
    public class DbContextResolver<TContext>:IDbContextResolver
        where TContext:DbContext
    {
        private readonly TContext _context;

        public DbContextResolver(TContext context)
        {
            _context = context;
        }

        public DbContext GetContext() => _context;
    }
}