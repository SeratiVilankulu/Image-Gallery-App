using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<Categories> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Configure one-to-many relationship between Categories and Images
    modelBuilder.Entity<Images>()
        .HasOne(i => i.Category)
        .WithMany(c => c.Images)
        .HasForeignKey(i => i.CategoryId)  // Foreign key property name
        .OnDelete(DeleteBehavior.Cascade); // Or another appropriate delete behavior

    // Configure one-to-many relationship between Users and Images
    modelBuilder.Entity<Images>()
        .HasOne(i => i.User)
        .WithMany(u => u.Images)
        .HasForeignKey(i => i.UserId)  // Foreign key property name
        .OnDelete(DeleteBehavior.SetNull); // Or another appropriate delete behavior

    // Other configurations...
}

    }
}