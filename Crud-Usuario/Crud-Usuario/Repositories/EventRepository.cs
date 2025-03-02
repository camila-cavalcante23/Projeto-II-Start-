using Crud_Usuario.Context;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Crud_Usuario.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly AppDbContext _context;
        private readonly IImageRepository _imageRepository;
        public EventRepository(AppDbContext context, IImageRepository imageRepository)
        {
            _context = context;
            _imageRepository = imageRepository;
        }
        public async Task<bool> Create(Event entity)
        {
            try
            {
                await _context.Events.AddAsync(entity);
             
                await _context.SaveChangesAsync();
                
                return true;
            }
            catch 
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var eventToDolete = await _context.Events.FirstOrDefaultAsync(x => x.Id.Equals(id));

            if(eventToDolete is null) return false;

            _context.Events.Remove(eventToDolete);

            await _imageRepository.Delete(eventToDolete.ImgId);
            
            await _context.SaveChangesAsync();
            
            return true;
        }

        public async Task<List<Event>> GetAll()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event?>? GetById(int id)
        {
            var events = await _context.Events.FirstOrDefaultAsync(e => e.Id.Equals(id));
            return events is null ? null : events;
        }

        public async Task<Event?> Update(Event entity)
        {
            var oldEvent = await _context.Events.FirstOrDefaultAsync();
            
            if (oldEvent is null) return null;
            
            oldEvent.Text = entity.Text;
            oldEvent.Title = entity.Title;
            oldEvent.LinkURL = entity.LinkURL;

            _context.Update(oldEvent);
            
            await _context.SaveChangesAsync();
            
            return oldEvent;
        }
    }
}
