using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Contracts;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _securityKey;
        public JwtGenerator (IConfiguration configuration)
        {
            //TODO: create abstraction for Security key
            _securityKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (configuration["TokenKey"]));
        }

        public string CreateToken (AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim (JwtRegisteredClaimNames.NameId, user.UserName) //adds username as the NameId inside our token
            };

            //generate signing credentials            
            var credentials = new SigningCredentials (_securityKey, SecurityAlgorithms.HmacSha512Signature);

            //create token Descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.UtcNow.AddDays(1), //TODO: Adjust expiry date after development
                SigningCredentials = credentials
            };

            //generate token
            var tokenHandler = new JwtSecurityTokenHandler ();
            var token = tokenHandler.CreateToken (tokenDescriptor);
            return tokenHandler.WriteToken (token);
        }
    }
}