using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Contracts;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken (AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim (JwtRegisteredClaimNames.NameId, user.UserName) //adds username as the NameId inside our token
            };

            //generate signing credentials
            var key = new SymmetricSecurityKey (Encoding.UTF8.GetBytes ("a very super secret key")); //TODO: store this as secret on project and not hard coded
            var credentials = new SigningCredentials (key, SecurityAlgorithms.HmacSha512Signature);

            //create token Descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.Now.AddDays (7), //TODO: Adjust expiry date after development
                SigningCredentials = credentials
            };

            //generate token
            var tokenHandler = new JwtSecurityTokenHandler ();
            var token = tokenHandler.CreateToken (tokenDescriptor);
            return tokenHandler.WriteToken (token);
        }
    }
}