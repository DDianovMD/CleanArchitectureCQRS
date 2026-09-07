using CleanArchitectureCQRS.Application.UseCases.Employee.Queries;
using CleanArchitectureCQRS.Application.UseCases.Employee.Queries.DTOs;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class GetEmployeeHandler(IEmployeeRepository employeeRepository) : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto>
    {
        public async Task<EmployeeDto> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {
            Domain.Entities.Employee? employee = await employeeRepository.GetByIdAsync(request.Id) ?? 
                throw new ArgumentOutOfRangeException(nameof(request), $"Employee with Id {request.Id} not found.");

            var result = new EmployeeDto
            {
                Id = employee.Id,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
            };

            return result;
        }
    }
}
