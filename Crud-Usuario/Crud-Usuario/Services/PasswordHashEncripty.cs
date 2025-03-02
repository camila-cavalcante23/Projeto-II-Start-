using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Microsoft.AspNetCore.Identity;

namespace Crud_Usuario.Services
{
    public class PasswordHashEncripty
    {
        private readonly PasswordHasher<User> _passwordHasher;
        
        public PasswordHashEncripty()
        {
            _passwordHasher = new PasswordHasher<User>();
        }

        public string EncriptyPassword(User user)
        {
            var passHash = _passwordHasher.HashPassword(user, user.Password);
            return passHash;
        }

        public bool VerifyPassword(string passHash, string pass) 
        {
            var result = _passwordHasher.VerifyHashedPassword(new User(), passHash, pass);
            return result == PasswordVerificationResult.Success;
        }
    }
}
