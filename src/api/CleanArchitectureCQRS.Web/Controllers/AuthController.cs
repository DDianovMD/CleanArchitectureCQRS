using CleanArchitectureCQRS.Domain.Auth;
using CleanArchitectureCQRS.Infrastructure.Keycloak;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitectureCQRS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController(KeycloakAuthService keycloakAuthService) : ControllerBase
    {
        private readonly KeycloakAuthService _keycloakAuthService = keycloakAuthService ?? throw new ArgumentNullException(nameof(keycloakAuthService));

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _keycloakAuthService.LoginAsync(request.Username, request.Password);
                return Ok(token);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
