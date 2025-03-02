using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Policy;

namespace Crud_Usuario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository _repository;
        public ImagesController (IImageRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> Get(int id)
        {
            if (id <= 0) return BadRequest("invalid id");

            var image = await _repository.GetImageById(id);

            if (image is null) return NotFound("image not found");

            return File(image.Content, image.MimeType);
        }
        [HttpPost("GetImages")]
        public async Task<ActionResult> GetImages(List<int> ids)
        {
            var images = await _repository.GetImagesByIds(ids);

            if (images is null) return BadRequest("No imagens or invalid ids");

            var imageUrls = images.Select(img => Url.Action("Get", new { id = img.Id })).ToList();
            
            return Ok(imageUrls);
        }
        [HttpPost]
        public async Task<ActionResult> Post(IFormFile file)
        {
            var converter = new ConverteImage();

            var newImage = await converter.Converte(file);
            if (newImage is null) return BadRequest("faile while converter image");

            var response = await _repository.Post(newImage);

            return response ? Ok(newImage.Id) : BadRequest();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Update(IFormFile file, int id)
        {
            var converter = new ConverteImage();

            var image = await converter.Converte(file);

            if (image is null) return BadRequest("faile while converter image");

            image.Id = id;

            var response = await _repository.Update(image);

            return response ? Ok("image is ben updated") : BadRequest();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0) return BadRequest("invalid id");

            var response = await _repository.Delete(id);

            return response ? Ok("image is ben deleted") : BadRequest();
        }
    }
}
