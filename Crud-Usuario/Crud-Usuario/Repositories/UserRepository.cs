using AutoMapper;
using Crud_Usuario.Context;
using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Crud_Usuario.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IImageRepository _imageRepository;
        public UserRepository(AppDbContext context, IMapper mapper, IImageRepository imageRepository)
        {
            _mapper = mapper;
            _context = context;
            _imageRepository = imageRepository;
        }
        public async Task<bool> CreateAccount(RegisterDTO register)
        {
            var converter = new ConverteImage();

            var imageConverted = await converter.Converte(register.image);

            if (imageConverted is null) return false;

            var encripty = new PasswordHashEncripty();
            var user = _mapper.Map<User>(register);
            

            user.Password = encripty.EncriptyPassword(user);
            user.ImgId = imageConverted.Id;

            await _imageRepository.Post(imageConverted);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAccountAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is not null) { 
                var img = await _imageRepository.GetImageById(user.ImgId);

                if(img is not null)
                {
                    _context.Images.Remove(img);
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<User?> EditAccountAsync(EditDTO edit, int id)
        {
            var converter = new ConverteImage();

            var imageConveted = await converter.Converte(edit.image);

            if (imageConveted is null) return null;

            var user = await _context.Users.FirstOrDefaultAsync(use => use.Id.Equals(id));

            if (user is null) return null;

            imageConveted.Id = user.ImgId;


            var encripty = new PasswordHashEncripty();
            user.Password = edit.Password;
            user.Email = edit.Email;
            user.Name = edit.Name;
            user.Cellphone = edit.Cellphone;
            user.Cpf = edit.Cpf;
            user.Password = encripty.EncriptyPassword(user);
            await _imageRepository.Update(imageConveted);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<List<User>> GetAllAsync()
        {
            var users = await _context.Users.ToListAsync();
            if (users.Count > 0) return users;
            
            return null;
        }

        public async Task<User?> GetAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.Equals(id));
            if (user is not null) return user;
            
            return null;
        }

        public async Task<User?> LoginAsync(LoginDTO login)
        {
            var encripty = new PasswordHashEncripty();

            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Email.Equals(login.Email));

            if (user is null) return null;

            var passDescripty =  encripty.VerifyPassword(user.Password, login.Password);

            if(passDescripty) return user;
                return null;
        }
    }
}
