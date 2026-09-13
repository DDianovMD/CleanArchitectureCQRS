using CleanArchitectureCQRS.Domain.Entities;

namespace CleanArchitectureCQRS.Domain.Abstractions.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(Guid id);
        Task<IEnumerable<Employee>> GetSoftDeletedEmployeesAsync();
        Task<Guid> AddAsync(Employee employee);
        Task UpdateAsync(Employee employee, string user);
        Task DeleteAsync(Guid id, string user);
        Task RestoreEmployeeAsync(Guid id, string user);
    }
}
