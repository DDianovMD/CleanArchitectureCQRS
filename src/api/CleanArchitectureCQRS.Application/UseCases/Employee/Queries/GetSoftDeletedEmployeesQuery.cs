using CleanArchitectureCQRS.Application.UseCases.Employee.Queries.DTOs;
using MediatR;

namespace CleanArchitectureCQRS.Application.UseCases.Employee.Queries
{
    public sealed record GetSoftDeletedEmployeesQuery : IRequest<IEnumerable<EmployeeDto>>;
}
