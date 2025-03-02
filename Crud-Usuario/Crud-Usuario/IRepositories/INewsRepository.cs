using Crud_Usuario.Entities;

namespace Crud_Usuario.IRepositories
{
    public interface INewsRepository
    {
        public Task<bool> Create(News news);
        public Task<News> Update(News news);
        public Task<bool> Delete(int id);
        public Task<List<News>?> GetAll();
        public Task<News?> GetById(int id);
    }
}
