using Crud_Usuario.Entities;

namespace Crud_Usuario.DTOs
{
    public class EventDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public IFormFile Img { get; set; }
        public string LinkURL { get; set; } = string.Empty;
    }
}
