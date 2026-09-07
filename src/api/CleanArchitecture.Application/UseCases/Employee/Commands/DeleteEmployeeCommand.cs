using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Commands
{
    public sealed record DeleteEmployeeCommand(Guid Id) : IRequest;
}
