using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.Enums;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Repositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;

namespace Crud_Usuario.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UsersController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;

        }
        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromForm] RegisterDTO register)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userRepository.CreateAccount(register);
            return user ? Ok() : BadRequest();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(LoginDTO login)
        {
            var user = await _userRepository.LoginAsync(login);
            if (user == null)
                return Unauthorized("Email ou senha inválidos");

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.ToString(),
                Token = tokenString
            });

        }

        [HttpPut("{id:int}")] 
        public async Task<ActionResult<User>> EditAccount(EditDTO edit, int id)
        {
            var user = await _userRepository.EditAccountAsync(edit, id);
            return user is not null ? Ok(user) : BadRequest("user cannot be edit");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _userRepository.DeleteAccountAsync(id);
            return result  ? Ok(result) : NotFound("id not found");
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            
            var response = await _userRepository.GetAllAsync();
            return response is not null ? Ok(response) : BadRequest(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
   
            var user = await _userRepository.GetAsync(id);
            if (user == null)
                return NotFound("Usuário não encontrado");

            return Ok(user);
        }

    }
}
