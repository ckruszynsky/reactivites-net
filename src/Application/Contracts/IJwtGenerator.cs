using Domain;

namespace Application.Contracts {

    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);   
    }
}