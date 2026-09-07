# Summary
Skeleton project following clean architecture and CQRS pattern.

## How to start the project

### Prerequisites
- [x] Installed and running **Docker** instance.
- [x] Ports **3307** (mapped to 3306 inside MariaDB's container), **8888** (mapped to 8080 inside Keycloak's container), **7148** (runs the application on this port) on your machine shouldn't be in use.

### Instructions
1. Clone repository locally.
2. Open terminal and navigate to `src` directory of the repository. When you run `ls` command (*Bash*) or `dir` command (*PowerShell*) you should see `docker-compose.yml` file and `api` folder if you are in the correct directory.
3. Run `docker-compose up -d` command and wait until all services are up and running. This is going to start MariaDB container and Keycloak container.
4. Navigate to `http://localhost:8888` (Keycloak) and login using `admin` for username and password. If you edit `docker-compose.yml` file and credentials are changed, you should use new credentials when container is initially started.
5. Follow the steps in [this tutorial](https://medium.com/@faulycoelho/net-web-api-with-keycloak-11e0286240b9) to create Realm, Client, Users and Roles.

**NOTE: You should use `DemoRealm` and `DemoClientId` for Realm's name and Client Id. If you use another values, make sure you don't forget to update `appsettings.Development.json` inside `CleanArchitectureCQRS.WebAPI` project.**

6. Update ClientSecret of Keycloak section inside `appsettings.Development.json` file. Correct value should be copied from **Credentials** of created Client from previous step.
7. Start the project from `Visual Studio` or using `dotnet run CleanArchitectureCQRS.WebAPI` (if you prefer using *dotnet CLI* first you should navigate inside `repo/src/api/CleanArchitectureCQRS.Web/` directory where `CleanArchitectureCQRS.WebAPI.csproj` is located.
8. Open `https://localhost:7148/swagger/index.html`.
