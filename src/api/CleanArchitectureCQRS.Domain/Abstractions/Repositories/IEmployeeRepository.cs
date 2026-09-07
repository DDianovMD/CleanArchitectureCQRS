using CleanArchitectureCQRS.Domain.Entities;

namespace CleanArchitectureCQRS.Domain.Abstractions.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(Guid id);
        Task AddAsync(Employee employee);
        Task UpdateAsync(Employee employee, string user);
        Task DeleteAsync(Guid id, string user);
    }
}
