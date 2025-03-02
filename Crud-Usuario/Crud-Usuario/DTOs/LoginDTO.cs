using System.ComponentModel.DataAnnotations;

namespace Crud_Usuario.DTOs
{
    public class LoginDTO
    {
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(100)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
