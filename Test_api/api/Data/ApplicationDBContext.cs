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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Configure one-to-many relationship between Categories and Images
      modelBuilder.Entity<Images>()
          .HasOne(i => i.Category)
          .WithMany(c => c.Images)
          .HasForeignKey(i => i.CategoryId)  // Foreign key property name
          .OnDelete(DeleteBehavior.Cascade); // Or another appropriate delete behavior

      // Configure one-to-many relationship between AppUser and Images
      modelBuilder.Entity<Images>()
          .HasOne(i => i.AppUsers)
          .WithMany(c => c.Images)
          .HasForeignKey(i => i.AppUserId)  // Foreign key property name
          .OnDelete(DeleteBehavior.Cascade); // Or another appropriate delete behavior

      // Configure one-to-many relationship between AppUser and Comments
      modelBuilder.Entity<Comments>()
          .HasOne(i => i.AppUsers)
          .WithMany(c => c.Comments)
          .HasForeignKey(i => i.AppUserId)  // Foreign key property name
          .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<Tags>()
          .HasMany(t => t.Images)
          .WithMany(i => i.Tags)
          .UsingEntity<Dictionary<string, object>>(
                "ImageTags", // Name of the join table
                j => j.HasOne<Images>()
                      .WithMany()
                      .HasForeignKey("ImageID") // Custom foreign key name for Images
                      .HasConstraintName("FK_ImageTags_Images"), // Optional custom constraint name
                j => j.HasOne<Tags>()
                      .WithMany()
                      .HasForeignKey("TagID") // Custom foreign key name for Tags
                      .HasConstraintName("FK_ImageTags_Tags") // Optional custom constraint name
            );
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