using CleanArchitectureCQRS.Application.UseCases.Employee.Commands;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class CreateEmployeeHandler(IEmployeeRepository employeeRepository) : IRequestHandler<CreateEmployeeCommand, Guid>
    {
        public async Task<Guid> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = new Domain.Entities.Employee
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                CreatedOn = DateTimeOffset.UtcNow,
                CreatedBy = "TODO",
                LastModifiedOn = DateTimeOffset.UtcNow,
                LastModifedBy = "TODO",
                IsDeleted = false,
                DeletedBy = null,
                DeletedOn = null,
            };

            var id = await employeeRepository.AddAsync(employee);
            return id;
        }
    }
}
