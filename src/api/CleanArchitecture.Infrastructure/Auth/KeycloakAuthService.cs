using CleanArchitectureCQRS.Domain.Auth;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace CleanArchitectureCQRS.Infrastructure.Keycloak
{
    public class KeycloakAuthService(HttpClient httpClient, IConfiguration configuration)
    {
        private readonly HttpClient _httpClient = httpClient ?? throw new ArgumentNullException();
        private readonly IConfiguration _configuration = configuration ?? throw new ArgumentNullException();

        public async Task<TokenResponse> LoginAsync(string username, string password)
        {
            var baseUrl = _configuration["Keycloak:BaseUrl"];
            var realm = _configuration["Keycloak:Realm"];

            var tokenEndpoint = $"{baseUrl}/realms/{realm}/protocol/openid-connect/token";
            var clientId = _configuration["Keycloak:ClientId"];
            var clientSecret = _configuration["Keycloak:ClientSecret"];

            var requestBody = new Dictionary<string, string>
            {
                { "grant_type", "password" },
                { "client_id", clientId ?? throw new Exception("Keycloak instance's client id is not set.") },
                { "client_secret", clientSecret ?? throw new Exception("Keycloak instance's client secret is not set.") },
                { "username", username },
                { "password", password }
            };

            var content = new FormUrlEncodedContent(requestBody);

            var response = await _httpClient.PostAsync(tokenEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var tokenResult = JsonSerializer.Deserialize<TokenResponse>(responseContent);

                return tokenResult!;
            }
            else
            {
                var errorJson = await response.Content.ReadAsStringAsync();
                // This will print Keycloak's exact error, e.g. "invalid_grant" or "unauthorized_client"
                throw new Exception($"Keycloak HTTP {(int)response.StatusCode}: {errorJson}");
            }
        }
    }
}
