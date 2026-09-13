using CleanArchitectureCQRS.Application.UseCases.Employee.Commands;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class RestoremployeeHandler(IEmployeeRepository employeeRepository) : IRequestHandler<RestoreEmployeeCommand>
    {
        public async Task Handle(RestoreEmployeeCommand request, CancellationToken cancellationToken)
        {
            await employeeRepository.RestoreEmployeeAsync(request.Id, "TODO");
        }
    }
}
