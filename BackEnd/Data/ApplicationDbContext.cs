using Microsoft.EntityFrameworkCore;
using SkydiveEquipmentStore.Models;

namespace SkydiveEquipmentStore.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<UserOrderHistory> UserOrderHistory { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Color>()
                .HasOne(c => c.Product)
                .WithMany(p => p.Colors)
                .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<Size>()
                .HasOne(s => s.Product)
                .WithMany(p => p.Sizes)
                .HasForeignKey(s => s.ProductId);
        }

    }
}
