using AutoMapper;
using Crud_Usuario.Context;
using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.Enums;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

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
            var encripty = new PasswordHashEncripty();
            var user = _mapper.Map<User>(register);

            user.Role = register.Email == "admin@admin.com" ? Role.Admin : Role.User;

            // Criptografia da senha
            user.Password = encripty.EncriptyPassword(user);

            // Adiciona o usuário ao banco de dados
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync(); // Salva o usuário primeiro, sem a imagem

            // Verifique se uma imagem foi fornecida
            if (register.Image != null)
            {
                var converter = new ConverteImage();
                var imageConverted = await converter.Converte(register.Image);

                // Se a conversão falhar, retorna false
                if (imageConverted == null)
                    return false;

                // Salve a imagem no repositório
                await _imageRepository.Post(imageConverted);

                // Atribui o Id da imagem ao usuário após salvar a imagem
                user.ImgId = imageConverted.Id;

                // Atualiza o usuário com a referência à imagem
                _context.Users.Update(user);
                await _context.SaveChangesAsync(); // Salva as alterações no usuário
            }

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
