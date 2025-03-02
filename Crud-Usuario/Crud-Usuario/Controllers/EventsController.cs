using AutoMapper;
using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Crud_Usuario.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _repository;
        private readonly IImageRepository _imageRepository;
        private readonly IMapper _mapper;

        public EventsController(IEventRepository repository, IMapper mapper, IImageRepository imageRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _imageRepository = imageRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetAllEvents()
        {
            var events = await _repository.GetAll();

            return events.Count == 0 ? BadRequest("no events in database or internal error") : events; 
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Event>> GetById(int id)
        {
            if (id < 0) return BadRequest("Invalid id");

            var events = await _repository.GetById(id);

            return events is not null ? Ok(events) : BadRequest("events not found");
        }
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(EventDTO newEvent)
        {
            var converter = new ConverteImage();

            var imageConverted = await converter.Converte(newEvent.Img);

            if (imageConverted is null) return BadRequest("Error while converter");

            await _imageRepository.Post(imageConverted);

            var events = _mapper.Map<Event>(newEvent);

            events.ImgId = imageConverted.Id;

            var response = await _repository.Create(events);

            return response is not false ? Ok("events is ben posted") : BadRequest("internal error");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Event>> Update(EventDTO newEvent, int id)
        {
            var converter = new ConverteImage();

            var imageConverted = await converter.Converte(newEvent.Img);

            if (imageConverted is null) return BadRequest("error while converte image");

            var mapper = _mapper.Map<Event>(newEvent);

            mapper.Id = id;

            var response = await _repository.Update(mapper);

            imageConverted.Id = response!.ImgId;

            var imageUpdate = await _imageRepository.Update(imageConverted);

            if (!imageUpdate) return BadRequest("error while update image");

            return response is not null ? Ok(response) : BadRequest("internal error");
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0) return BadRequest("invalid id");

            var response = await _repository.Delete(id);

            return response ? Ok("news is ben deleted") : BadRequest("internal error");
        }
    }
}
