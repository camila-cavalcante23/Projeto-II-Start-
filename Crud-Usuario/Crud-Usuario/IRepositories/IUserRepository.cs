using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Microsoft.AspNetCore.Identity.Data;

namespace Crud_Usuario.IRepositories;
public interface IUserRepository
{
    public Task<bool> CreateAccount(RegisterDTO register);
    public Task<User> LoginAsync(LoginDTO login);
    public Task<User?> EditAccountAsync(EditDTO edit, int id);
    public Task<bool> DeleteAccountAsync(int id);
    public Task<User?> GetAsync(int id);
    public Task<List<User>> GetAllAsync();
}
