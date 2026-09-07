using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Commands
{
    public sealed record UpdateEmployeeCommand(Guid id, string FirstName, string LastName, string Address) : IRequest;
}
