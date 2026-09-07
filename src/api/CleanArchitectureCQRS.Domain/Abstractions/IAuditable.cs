namespace CleanArchitectureCQRS.Domain.Abstractions
{
    public interface IAuditable
    {
        public DateTimeOffset CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset LastModifiedOn { get; set; }
        public string LastModifedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTimeOffset? DeletedOn { get; set; }
        public string? DeletedBy { get; set; }
    }
}
