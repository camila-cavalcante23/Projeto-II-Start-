using Crud_Usuario.Entities;
using Microsoft.EntityFrameworkCore;

namespace Crud_Usuario.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions dbContext) : base(dbContext) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Galery> Galery { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
