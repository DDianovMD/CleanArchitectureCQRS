using CleanArchitectureCQRS.Application.UseCases.Employee.Queries;
using CleanArchitectureCQRS.Application.UseCases.Employee.Queries.DTOs;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class GetSoftDeletedEmployeesHandler(IEmployeeRepository employeeRepository) : IRequestHandler<GetSoftDeletedEmployeesQuery, IEnumerable<EmployeeDto>>
    {
        public async Task<IEnumerable<EmployeeDto>> Handle(GetSoftDeletedEmployeesQuery request, CancellationToken cancellationToken)
        {
            var employees = await employeeRepository.GetSoftDeletedEmployeesAsync();

            var result = new HashSet<EmployeeDto>();

            foreach (var employee in employees)
            {
                var dto = new EmployeeDto
                {
                    Id = employee.Id,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    Address = employee.Address,
                };

                result.Add(dto);
            }

            return result;
        }
    }
}
