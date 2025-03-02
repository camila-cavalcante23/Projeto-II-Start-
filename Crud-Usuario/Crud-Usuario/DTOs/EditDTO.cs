using System.ComponentModel.DataAnnotations;

namespace Crud_Usuario.DTOs
{
    public class EditDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public int Cellphone { get; set; } = 0;
        public string Password { get; set; } = string.Empty;
        public string Cpf { get; set; } = string.Empty;
        [Required]
        public IFormFile image { get; set; }
    }
}
