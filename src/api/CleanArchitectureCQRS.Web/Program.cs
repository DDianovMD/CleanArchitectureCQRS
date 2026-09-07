using CleanArchitectureCQRS.Application.UseCases.Employee.Handlers;
using CleanArchitectureCQRS.Domain.Abstractions.Repositories;
using CleanArchitectureCQRS.Infrastructure.Auth;
using CleanArchitectureCQRS.Infrastructure.Persistence;
using CleanArchitectureCQRS.Infrastructure.Persistence.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace CleanArchitectureCQRS.WebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Database configuration
            string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
            #endregion

            #region MediatR configuration
            // Register MediatR - scans the current assembly for handlers
            builder.Services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(typeof(CreateEmployeeHandler).Assembly);
            });
            #endregion

            #region Authentication
            var baseUrl = builder.Configuration["Keycloak:BaseUrl"] ?? throw new NullReferenceException("Keycloak BaseUrl is not set.");
            var realm = builder.Configuration["Keycloak:Realm"] ?? throw new NullReferenceException("Keycloak Realm is not set."); ;
            var clientId = builder.Configuration["Keycloak:CLientId"] ?? throw new NullReferenceException("Keycloak ClientId is not set."); ;
            var clientSecret = builder.Configuration["Keycloak:ClientSecret"] ?? throw new NullReferenceException("Keycloak ClientSecret is not set."); ;

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = $"{baseUrl}/realms/{realm}",
            
                    ValidateAudience = true,
                    ValidAudience = "account",
            
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = false,
            
                    IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
                    {
                        var client = new HttpClient();
                        var keyUri = $"{parameters.ValidIssuer}/protocol/openid-connect/certs";
                        var response = client.GetAsync(keyUri).Result;
                        var keys = new JsonWebKeySet(response.Content.ReadAsStringAsync().Result);
            
                        return keys.GetSigningKeys();
                    }
                };
            
                options.RequireHttpsMetadata = false; // Only in develop environment
                options.SaveToken = true;
            });
            #endregion

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowKeycloak", policy =>
                {
                    policy.WithOrigins("http://localhost:8888") // Keycloak server URL
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddHttpClient();
            builder.Services.AddScoped<KeycloakAuthService>();
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });

                // Define the Keycloak OAuth2 scheme
                c.AddSecurityDefinition("Keycloak", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Password = new OpenApiOAuthFlow
                        {
                            TokenUrl = new Uri($"{baseUrl}/realms/{realm}/protocol/openid-connect/token"),
                            Scopes = new Dictionary<string, string>()
                        }
                    }
                });

                // Apply the security scheme globally to all endpoints
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Keycloak"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            var app = builder.Build();

            // Apply migrations on start.
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await db.Database.MigrateAsync();
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");

                    // Pass default client configuration to the Swagger UI modal
                    c.OAuthClientId(clientId);
                    c.OAuthClientSecret(clientSecret);
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
