namespace Crud_Usuario.Entities
{
    public class Image : EntityBase
    {
        public string Name { get; set; } = string.Empty;
        public byte[] Content { get; set; } = [];
        public string MimeType { get; set; } = string.Empty;
    }
}
