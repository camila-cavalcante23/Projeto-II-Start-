using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Crud_Usuario.DTOs
{
    public class NewsDTO
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Text { get; set; } = string.Empty;
        [FromForm]
        public IFormFile Image { get; set; } = null!;
    }
}
