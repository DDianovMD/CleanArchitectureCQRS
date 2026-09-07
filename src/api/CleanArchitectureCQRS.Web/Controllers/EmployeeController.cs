using CleanArchitectureCQRS.Application.UseCases.Employee.Commands;
using CleanArchitectureCQRS.Application.UseCases.Employee.Queries;
using CleanArchitectureCQRS.Application.UseCases.Employee.Queries.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitectureCQRS.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class EmployeeController(IMediator mediator, ILogger<EmployeeController> logger) : ControllerBase
    {
        private readonly IMediator _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        private readonly ILogger<EmployeeController> _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmployees(CancellationToken ct)
        {
            var response = await _mediator.Send(new GetAllEmployeesQuery(), ct);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmployee(Guid id, CancellationToken ct)
        {
            var query = new GetEmployeeByIdQuery(id);
            EmployeeDto response = await _mediator.Send(query, ct);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(CreateEmployeeCommand request, CancellationToken ct)
        {
            var employeeId = await _mediator.Send(request, ct);
            return CreatedAtAction(nameof(GetEmployee), new { id = employeeId }, null);
        }

        [HttpPut]
        public async Task<IActionResult> CreateEmployee(UpdateEmployeeCommand request, CancellationToken ct)
        {
            await _mediator.Send(request, ct);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id, CancellationToken ct)
        {
            var command = new DeleteEmployeeCommand(id);
            await _mediator.Send(command, ct);
            return NoContent();
        }
    }
}
