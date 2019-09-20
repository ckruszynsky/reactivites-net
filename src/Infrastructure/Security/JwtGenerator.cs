
using Application.Contracts;
using Domain;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(AppUser user)
        {
            throw new System.NotImplementedException();
        }
    }
}