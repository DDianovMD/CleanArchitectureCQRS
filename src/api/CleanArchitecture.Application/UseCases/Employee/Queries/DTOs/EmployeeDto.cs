namespace CleanArchitectureCQRS.Application.UseCases.Employee.Queries.DTOs
{
    public class EmployeeDto
    {
        public Guid Id{ get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Address { get; set; } = null!;
    }
}
