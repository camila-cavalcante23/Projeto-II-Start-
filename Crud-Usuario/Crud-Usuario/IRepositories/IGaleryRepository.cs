using Crud_Usuario.Entities;

namespace Crud_Usuario.IRepositories
{
    public interface IGaleryRepository
    {
        public Task<Galery> GetGaleryAsync();
        public Task<List<int>?> GetAll();
        public Task<bool> Post(int id);
        public Task<bool> Delete(int id);
    }
}
