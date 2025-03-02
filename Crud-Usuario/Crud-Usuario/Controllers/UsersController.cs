using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection.Metadata.Ecma335;

namespace Crud_Usuario.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _;

        public UsersController(IUserRepository userRepository)
        {
            _ = userRepository;
        }
        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterDTO register)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _.CreateAccount(register);
            return user ? Ok() : BadRequest();
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login(LoginDTO login)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var result = await _.LoginAsync(login);
            return result is null ? BadRequest("password or email invalid!.") : Ok(result);
        }

        [HttpPut("{id:int}")] 
        public async Task<ActionResult<User>> EditAccount(EditDTO edit, int id)
        {
            var user = await _.EditAccountAsync(edit, id);
            return user is not null ? Ok(user) : BadRequest("user cannot be edit");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _.DeleteAccountAsync(id);
            return result  ? Ok(result) : NotFound("id not found");
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            
            var response = await _.GetAllAsync();
            return response is not null ? Ok(response) : BadRequest(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetById(int id)
        {
            var user = await _.GetAsync(id);
            return user is not null ? Ok(user) : BadRequest("User not found or internal error");
        }

    }
}
