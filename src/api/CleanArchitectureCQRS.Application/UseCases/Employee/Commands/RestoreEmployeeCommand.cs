using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Commands
{
    public sealed record RestoreEmployeeCommand(Guid Id) : IRequest;
}
