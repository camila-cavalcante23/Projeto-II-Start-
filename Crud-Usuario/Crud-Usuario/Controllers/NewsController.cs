using AutoMapper;
using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Usuario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _repository;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;
        public NewsController(INewsRepository newsRepository, IImageRepository imageRepository, IMapper mapper)
        {
            _repository = newsRepository;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post(NewsDTO newsDTO) 
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var converter = new ConverteImage();

            var imageConverter = await converter.Converte(newsDTO.Image);

            if(imageConverter is null) return BadRequest("Error while converter");

            var image = await _imageRepository.Post(imageConverter);

            var newNews = _mapper.Map<News>(newsDTO);
            newNews.ImgId = imageConverter.Id;

            var result = await _repository.Create(newNews);

            return result ? Ok(result) : BadRequest();
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<News>> GetById(int id)
        {            
            var news = await _repository.GetById(id);

            return news is not null ? Ok(news) : BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult<List<News>>> GetAll()
        {
            var news = await _repository.GetAll();
            
            return news is not null ? Ok(news) : BadRequest("internal error or no news in database");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<News>> Update(NewsDTO newsDTO, int id)
        {
            var converter = new ConverteImage();

            var oldNew = await _repository.GetById(id);

            if(oldNew is null) return BadRequest("News not found");

            var converteImage = await converter.Converte(newsDTO.Image);

            if (converteImage is null) return BadRequest("Erro while converter");
            converteImage.Id = oldNew.ImgId;
            await _imageRepository.Update(converteImage);

            var mapper = _mapper.Map<News>(newsDTO);
            mapper.Id = id;
            mapper.ImgId = converteImage.Id;

            await _repository.Update(mapper);

            return Ok(mapper);
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0) return BadRequest("invalid id");

            var response = await _repository.Delete(id);

            return response ? Ok("news is ben deleted") : BadRequest();
        }
    }
}
