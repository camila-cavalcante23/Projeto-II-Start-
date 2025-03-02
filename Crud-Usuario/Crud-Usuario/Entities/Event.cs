namespace Crud_Usuario.Entities
{
    public class Event : EntityBase
    {
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public int ImgId { get; set; }
        public string LinkURL { get; set; } = string.Empty;
    }
}
