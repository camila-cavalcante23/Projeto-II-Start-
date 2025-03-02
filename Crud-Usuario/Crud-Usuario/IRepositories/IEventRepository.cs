using Crud_Usuario.Entities;

namespace Crud_Usuario.IRepositories
{
    public interface IEventRepository
    {
        public Task<bool> Create(Event entity);
        public Task<Event?> Update(Event entity);
        public Task<bool> Delete(int id);
        public Task<List<Event>> GetAll();
        public Task<Event?>? GetById(int id);
    }
}
