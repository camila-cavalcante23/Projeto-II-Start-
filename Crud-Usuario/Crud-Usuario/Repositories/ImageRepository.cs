using Crud_Usuario.Context;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Crud_Usuario.Services;
using Microsoft.EntityFrameworkCore;

namespace Crud_Usuario.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly AppDbContext _context;
        public ImageRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var image = await GetImageById(id);

                if (image is null) return false;

                _context.Images.Remove(image);
                await _context.SaveChangesAsync();
                return true;

            }
            catch { return false; }
        }

        public async Task<Image?> GetImageById(int id)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.Id.Equals(id));
            if (image is null) return null;

            return image;
        }

        public async Task<List<Image>?> GetImagesByIds(List<int> imgsId)
        {
            var images = new List<Image>();
            foreach (var imgs in imgsId) 
            {
                var image = await GetImageById(imgs);
                if(image is not null) images.Add(image);
            }
            return images.Count <= 0 ? null : images;
        }

        public async Task<bool> Post(Image image)
        {
            try
            {
                await _context.Images.AddAsync(image);
                await _context.SaveChangesAsync();
                return true;
            }
            catch { return false; }
        }

        public async Task<bool> Update(Image image)
        {
            var oldImage = await GetImageById(image.Id);

            if (oldImage is null) return false;

            oldImage.Name = image.Name;
            oldImage.Content = image.Content;
            oldImage.MimeType = image.MimeType;

            _context.Images.Update(oldImage);

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
