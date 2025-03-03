using Crud_Usuario.Context;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Crud_Usuario.Repositories
{
    public class NewsRepository : INewsRepository
    {
        private readonly AppDbContext _context;
        private readonly IImageRepository _imageRepository;

        public NewsRepository(AppDbContext context, IImageRepository imageRepository)
        {
            _context = context;
            _imageRepository = imageRepository;
        }
        public async Task<bool> Create(News news)
        {
            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var news = await GetById(id);

            if (news is null) return false;

            await _imageRepository.Delete(news.ImgId);

            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<News>?> GetAll()
        {
            return await _context.News
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync();
        }

        public async Task<News?> GetById(int id)
        {
            var news = await _context.News.FirstOrDefaultAsync(n => n.Id.Equals(id));
            if (news is null) return null;
            return news;
        }

        public async Task<News?> Update(News news)
        {
            var oldNews = await _context.News.FirstOrDefaultAsync(x => news.Id.Equals(news.Id));
            if (oldNews is null) return null;
            oldNews.Text = news.Text;
            oldNews.Title = news.Title;
            oldNews.ImgId = news.ImgId;
            _context.News.Update(oldNews);
            await _context.SaveChangesAsync();
            return oldNews;
        }
    }
}
