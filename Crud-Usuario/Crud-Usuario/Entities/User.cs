namespace Crud_Usuario.Entities
{
    public class User : EntityBase
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Cellphone { get; set; } = 0;
        public string Cpf { get; set; } = string.Empty;
        public int ImgId {  get; set; }
    }
}
