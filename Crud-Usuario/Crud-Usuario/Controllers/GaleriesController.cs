using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Usuario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GaleriesController : ControllerBase
    {
        private readonly IGaleryRepository _repository;
        private readonly IImageRepository _imageRepository;
        public GaleriesController(IGaleryRepository repository, IImageRepository imageRepository)
        {
            _repository = repository;
            _imageRepository = imageRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<int>>> GetAll()
        {
            var images = await _repository.GetAll();
            return images is not null ? images : BadRequest("No images in galery");
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile image)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var converte = new ConverteImage();

            var converterImage = await converte.Converte(image);
            
            if(converterImage is null) return BadRequest(ModelState);

            var img = await _imageRepository.Post(converterImage);

            await _repository.Post(converterImage.Id);

            return img ? Ok(img) : BadRequest("Internal Error");
        }
    }
}
