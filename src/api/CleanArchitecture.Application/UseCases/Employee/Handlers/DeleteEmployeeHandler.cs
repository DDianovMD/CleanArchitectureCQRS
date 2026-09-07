using CleanArchitectureCQRS.Application.UseCases.Employee.Commands;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Handlers
{
    public sealed class DeleteEmployeeHandler(IEmployeeRepository employeeRepository) : IRequestHandler<DeleteEmployeeCommand>
    {
        public async Task Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
        {
            await employeeRepository.DeleteAsync(request.Id, "TODO");
        }
    }
}
