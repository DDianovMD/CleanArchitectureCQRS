using CleanArchitectureCQRS.Application.UseCases.Employee.Commands;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class UpdateEmployeeHandler(IEmployeeRepository employeeRepository) : IRequestHandler<UpdateEmployeeCommand>
    {
        public async Task Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.FirstName))
            {
                throw new ArgumentException("First name cannot be empty.", nameof(request.FirstName));
            } 
            
            if (string.IsNullOrWhiteSpace(request.LastName))
            {
                throw new ArgumentException("Last name cannot be empty.", nameof(request.LastName));
            }

            if (string.IsNullOrWhiteSpace(request.Address))
            {
                throw new ArgumentException("Address cannot be empty.", nameof(request.Address));
            }

            var employee = new Domain.Entities.Employee
            {
                Id = request.id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
            };

            await employeeRepository.UpdateAsync(employee, "TODO");
        }
    }
}
