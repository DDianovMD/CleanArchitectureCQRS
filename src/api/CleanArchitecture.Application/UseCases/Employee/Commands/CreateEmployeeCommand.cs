using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Commands
{
    public sealed record CreateEmployeeCommand(string FirstName, string LastName, string Address) : IRequest<Guid>;
}
