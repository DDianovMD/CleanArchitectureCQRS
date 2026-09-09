import "./homepage.css";
import type { JSX } from "react";
import useAuth from "../../hooks/useAuth";

export default function Homepage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const username: string | undefined = isAuthenticated
    ? user?.preferred_username
    : 'Guest';

  return <div className="homepage-container">
    <h1>Welcome, {username}!</h1>
    <p>This is simple web application for demo purposes. It's source code is open and free for use under MIT license.</p>
    <p>Used technologies:</p>
    <ul>
      <li key={1}>Database: <i>MariaDB v11.4</i>;</li>
      <li key={2}>Back end: <i>.NET API (.NET Core 8)</i>;</li>
      <li key={3}>Front end: <i>React (TypeScript)</i>;</li>
    </ul>
    <p>Demonstrated skills:</p>
    <ul>
      <li key={4}>Writing maintainable code using <i>Clean Architecture</i>;</li>
      <li key={5}>Usage of CQRS pattern utilizing <i>MediatR</i> NuGet package;</li>
      <li key={6}>Asynchronous programming;</li>
      <li key={7}>Design and implementation of API endpoints.</li>
      <li key={8}>Database design using code-first approach and <i>Entity Framework Core</i> as ORM and it's FluentAPI;</li>
      <li key={9}>Database modeling - full CRUD;</li>
      <li key={10}>Implemented authentication and authorization using <i>OpenID Connect</i>;</li>
      <li key={11}>Usage of third party API - used <b><i>Keycloak</i></b> as identity server;</li>
      <li key={12}>Experience with <i>Docker</i> - usage of containers, volumes, port mappings, environment variables. Implementation and usage of <b>docker-compose.yml</b>;</li>
      <li key={13}>Integration between front end and back end;</li>
      <li key={14}>Implementation of functional <i>React</i> components and usage of third party UI library (<i>Prime React</i>)</li>
      <li key={15}>Usage of <i>Context API</i>, <i>useState</i>, <i>useEffect</i> hooks;</li>
      <li key={16}>Implementation of protected routes and sending authorized requests to back end API;</li>
      <li key={17}>Experience with <i>TypeScript</i>;</li>
    </ul>
  </div>
}
