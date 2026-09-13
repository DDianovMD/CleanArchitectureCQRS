using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using CleanArchitectureCQRS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitectureCQRS.Infrastructure.Persistence.Repositories
{
    public class EmployeeRepository(AppDbContext dbContext) : IEmployeeRepository
    {
        public async Task<Guid> AddAsync(Employee employee)
        {
            var result = await dbContext.Employees.AddAsync(employee);
            await dbContext.SaveChangesAsync();
            return result.Entity.Id;
        }

        public async Task DeleteAsync(Guid id, string user)
        {
            var employee = await GetByIdAsync(id);

            if (employee is null)
            {
                return;
            }

            employee.IsDeleted = true;
            employee.DeletedBy = user;
            employee.DeletedOn = DateTimeOffset.UtcNow;
            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await dbContext.Employees
                .AsNoTracking()
                .ToArrayAsync();
        }

        public async Task<Employee?> GetByIdAsync(Guid id)
        {
            Employee? employee = await dbContext.Employees
                .FirstOrDefaultAsync(employee => employee.Id == id);
            
            return employee;
        }

        public async Task UpdateAsync(Employee employee, string user)
        {
            var entity = await GetByIdAsync(employee.Id);
            
            if (entity is null)
            {
                throw new ArgumentException("Invalid employee id.", nameof(employee));
            }

            entity.FirstName = employee.FirstName;
            entity.LastName = employee.LastName;
            entity.Address = employee.Address;
            entity.LastModifedBy = user;
            entity.LastModifiedOn = DateTimeOffset.UtcNow;

            await dbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Employee>> GetSoftDeletedEmployeesAsync()
        {
            var employees = await dbContext.Employees
                .AsNoTracking()
                .IgnoreQueryFilters()
                .Where(employee => employee.IsDeleted == true)
                .ToArrayAsync();

            return employees;
        }

        public async Task RestoreEmployeeAsync(Guid id, string user)
        {
            var employee = await GetDeletedEmployeeAsync(id);
            
            if (employee == null)
            {
                return;
            }

            employee.IsDeleted = false;
            employee.DeletedOn = null;
            employee.DeletedBy = null;
            employee.LastModifedBy = user;
            employee.LastModifiedOn = DateTimeOffset.UtcNow;

            await dbContext.SaveChangesAsync();
        }

        private async Task<Employee?> GetDeletedEmployeeAsync(Guid id)
        {
            var employee = await dbContext.Employees
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(employee => employee.Id == id && employee.IsDeleted == true);

            return employee;
        }
    }
}
