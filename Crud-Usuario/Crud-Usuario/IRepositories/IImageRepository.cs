using Crud_Usuario.Entities;

namespace Crud_Usuario.IRepositories
{
    public interface IImageRepository
    {
        public Task<List<Image>?> GetImagesByIds(List<int> imgsId);
        public Task<Image?> GetImageById(int id);
        public Task<bool> Post(Image image);
        public Task<bool> Update(Image image);
        public Task<bool> Delete(int id);
    }
}
