using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
  public class ApplicationDBContext : IdentityDbContext<AppUser>
  {
    public ApplicationDBContext(DbContextOptions dbContextOptions)
    : base(dbContextOptions)
    {

    }
    public DbSet<Images> Images { get; set; }
    public DbSet<Categories> Categories { get; set; }
    public DbSet<Comments> Comments { get; set; }
    public DbSet<Tags> Tags { get; set; }
    public DbSet<ImageTags> ImageTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<ImageTags>(x => x.HasKey(p => new { p.TagID, p.ImageID }));

      // Configure many-to-many relationship between AppUser and Images
      modelBuilder.Entity<ImageTags>()
       .HasOne(u => u.Tags)
       .WithMany(u => u.ImageTags)
       .HasForeignKey(p => p.TagID);

      modelBuilder.Entity<ImageTags>()
       .HasOne(u => u.Images)
       .WithMany(u => u.ImageTags)
       .HasForeignKey(p => p.ImageID);


      // Configure one-to-many relationship between Categories and Images
      modelBuilder.Entity<Images>()
          .HasOne(i => i.Category)
          .WithMany(c => c.Images)
          .HasForeignKey(i => i.CategoryId)  // Foreign key property name
          .OnDelete(DeleteBehavior.Cascade); // Or another appropriate delete behavior

      // Other configurations...

      List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole
                {
                    Name="User",
                    NormalizedName="USER",
                }
            };

      modelBuilder.Entity<IdentityRole>().HasData(roles);
    }

  }
}