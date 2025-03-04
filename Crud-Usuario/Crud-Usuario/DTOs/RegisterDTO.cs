using System.ComponentModel.DataAnnotations;

namespace Crud_Usuario.DTOs
{
    public class RegisterDTO
    {

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Cellphone { get; set; } = 0;
        public string Cpf { get; set; } = string.Empty;
        public IFormFile? Image {  get; set; }
    }
}
