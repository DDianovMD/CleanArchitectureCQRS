using CleanArchitectureCQRS.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitectureCQRS.Infrastructure.Persistence.Configurations
{
    internal class EmployeeConfiguration : IEntityTypeConfiguration<Employee>

    {
        private const string _creator = "System";
        private DateTimeOffset _createdOn = DateTimeOffset.UtcNow;

        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(employee => employee.Id);

            builder.Property(employee => employee.Id)
                .HasColumnType("binary(16)") // Recommended type for UUID values. Learn more https://dev.mysql.com/blog-archive/mysql-8-0-uuid-support/
                .ValueGeneratedOnAdd();

            builder.Property(employee => employee.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(employee => employee.LastName)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(employee => employee.Address)
                .HasMaxLength(250)
                .IsRequired();

            // Audit columns
            builder.Property(employee => employee.CreatedOn)
                .IsRequired()
                .HasDefaultValue(DateTimeOffset.UtcNow);

            builder.Property(employee => employee.CreatedBy)
               .IsRequired();

            builder.Property(employee => employee.LastModifiedOn)
                .IsRequired()
                .HasDefaultValue(DateTimeOffset.UtcNow);

            builder.Property(employee => employee.LastModifedBy)
               .IsRequired();

            builder.Property(employee => employee.IsDeleted)
               .IsRequired()
               .HasDefaultValue(false);

            builder.Property(employee => employee.DeletedOn)
               .HasDefaultValue(null);
            
            builder.Property(employee => employee.DeletedBy)
               .HasDefaultValue(null);

            // Seed demo data
            builder.HasData(new HashSet<Employee>
            {
                new()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "John",
                    LastName = "Doe",
                    Address = "123 Main St, Anytown, USA",
                    LastModifedBy = _creator,
                    CreatedBy = _creator,
                },
                new()
                {
                    Id = Guid.NewGuid(),
                    FirstName = "Jane",
                    LastName = "Doe",
                    Address = "1234 Market St, Philadelphia, USA",
                    LastModifedBy = _creator,
                    CreatedBy = _creator,
                },
            });
        }
    }
}
