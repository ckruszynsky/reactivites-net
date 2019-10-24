using Microsoft.EntityFrameworkCore;

namespace Application.Contracts
{
    public interface IDbContextResolver
    {
         DbContext GetContext();
    }
}