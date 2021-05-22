using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace szamhalGY.Models
{
    public partial class szamhal_autokContext : DbContext
    {
        public szamhal_autokContext()
        {
        }

        public szamhal_autokContext(DbContextOptions<szamhal_autokContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Auto> Autos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=.\\g7t8l5sql;Data Source=.\\g7t8l5sql;Initial Catalog=szamhal_autok;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Hungarian_CI_AS");

            modelBuilder.Entity<Auto>(entity =>
            {
                entity.HasKey(e => e.AutoSk);

                entity.ToTable("Auto");

                entity.Property(e => e.AutoSk).HasColumnName("AutoSK");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
