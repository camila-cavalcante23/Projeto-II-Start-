using Crud_Usuario.Context;
using Crud_Usuario.Entities;
using Crud_Usuario.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Crud_Usuario.Repositories
{
    public class GaleryRepository : IGaleryRepository
    {
        private readonly AppDbContext _context;
        public GaleryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var galery = await GetGaleryAsync();

            galery.ImgsId.Remove(id);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<int>?> GetAll()
        {
            var galery = await GetGaleryAsync();

            return !galery.ImgsId.Any() ? null : galery.ImgsId;
        }

        public async Task<Galery> GetGaleryAsync()
        {
            var galery = await _context.Galery.FirstOrDefaultAsync();

            if(galery is null)
            {
                galery = new Galery();

                _context.Galery.Add(galery);
                
                await _context.SaveChangesAsync();
            }

            return galery;
        }

        public async Task<bool> Post(int id)
        {
            var galery = await GetGaleryAsync();

            galery.ImgsId.Add(id);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
