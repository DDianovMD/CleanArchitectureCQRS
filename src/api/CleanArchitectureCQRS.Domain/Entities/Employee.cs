using CleanArchitectureCQRS.Domain.Abstractions;

namespace CleanArchitectureCQRS.Domain.Entities
{
    public class Employee : IAuditable
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateTimeOffset CreatedOn { get; set; }
        public string CreatedBy { get; set; } = null!;
        public DateTimeOffset LastModifiedOn { get; set; }
        public string LastModifedBy { get; set; } = null!;
        public bool IsDeleted { get; set; }
        public DateTimeOffset? DeletedOn { get; set; }
        public string? DeletedBy { get; set; }
    }
}
