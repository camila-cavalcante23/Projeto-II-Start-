using AutoMapper;
using Crud_Usuario.DTOs;
using Crud_Usuario.Entities;

namespace Crud_Usuario.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<RegisterDTO, User>().ReverseMap();
            CreateMap<LoginDTO, User>().ReverseMap();
            CreateMap<News, NewsDTO>().ReverseMap();
            CreateMap<Event, EventDTO>().ReverseMap();
        }
    }
}
