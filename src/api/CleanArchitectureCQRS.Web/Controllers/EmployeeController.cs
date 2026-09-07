using CleanArchitectureCQRS.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitectureCQRS.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/")]
        public IActionResult GetEmployees()
        {
            return Ok();
        }
    }
}
