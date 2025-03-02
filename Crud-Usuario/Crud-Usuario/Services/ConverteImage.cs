using Crud_Usuario.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Usuario.Services
{
    public class ConverteImage
    {
        public async Task<Image?> Converte(IFormFile file)
        {
            if (file == null || file.Length == 0) return null;

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var imagem = new Image
                {
                    Name = file.FileName,
                    Content = memoryStream.ToArray(),
                    MimeType = file.ContentType
                };
            return imagem;
            }
        }

        public FormFile Desconverter(Image image)
        {
            var stream = new MemoryStream(image.Content);
            
            return new FormFile(stream, 0, image.Content.Length, "file", image.Name)
            {
                Headers = new HeaderDictionary(),
                ContentType = image.MimeType
            };
        }
    }
}
