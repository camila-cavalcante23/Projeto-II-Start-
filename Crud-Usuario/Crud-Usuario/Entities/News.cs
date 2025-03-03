namespace Crud_Usuario.Entities
{
    public class News : EntityBase
    {
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public int ImgId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
