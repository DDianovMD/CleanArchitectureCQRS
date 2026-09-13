import "./homepage.css";
import 'primeicons/primeicons.css';
import dotnet from '../../assets/dotnet.png';
import csharp from '../../assets/csharp.png';
import efcore from '../../assets/entity_framework.png';
import mariadb from '../../assets/mariadb.png';
import typescript from '../../assets/typescript.png';
import react from '../../assets/react.png';
import primereact from '../../assets/primereact.webp';
import docker from '../../assets/docker.png';
import keycloak from '../../assets/key-cloak.jpg';
import type { JSX } from "react";
import useAuth from "../../hooks/useAuth";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";

export default function Homepage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const username: string | undefined = isAuthenticated
    ? user?.preferred_username
    : 'Guest';

  return <div className="homepage-container">
    <h1>Welcome, {username}!</h1>
    <p>This is simple web application for demo purposes. It's source code is open and free for use under MIT license.</p>
    <section className="technologies">
      <div className="animated-box">
        <Avatar image={dotnet} imageAlt=".NET" size="large" />
        <Avatar image={csharp} imageAlt="C#" size="large" />
        <Avatar image={efcore} imageAlt="Entity Framework Core" size="large" />
        <Avatar image={mariadb} imageAlt="MariaDB" size="large" />
        <Avatar image={typescript} imageAlt="TypeScript" size="large" />
        <Avatar image={react} imageAlt="React" size="large" />
        <Avatar image={primereact} imageAlt="PrimeReact" size="large" />
        <Avatar image={docker} imageAlt="Docker" size="large" />
        <Avatar image={keycloak} imageAlt="Docker" size="large" />
      </div>
      <p><b>Used technologies:</b></p>
      <ul>
        <li key={1}>Database: <i>MariaDB v11.4</i>;</li>
        <li key={2}>Back end: <i>.NET API (.NET Core 8)</i>;</li>
        <li key={3}>Front end: <i>React (TypeScript)</i>;</li>
      </ul>
    </section>
    <section className="skills">
      <p><b>Demonstrated skills:</b></p>
      <ul>
        <li key={4}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Writing maintainable code using <i>Clean Architecture</i>;</li>
        <li key={5}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Usage of CQRS pattern utilizing <i>MediatR</i> NuGet package;</li>
        <li key={6}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Asynchronous programming;</li>
        <li key={7}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Design and implementation of API endpoints.</li>
        <li key={8}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Database design using code-first approach and <i>Entity Framework Core</i> as ORM and it's FluentAPI;</li>
        <li key={9}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Database modeling - full CRUD;</li>
        <li key={10}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Implemented authentication and authorization using <i>OpenID Connect</i>;</li>
        <li key={11}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Usage of third party API - used <b><i>Keycloak</i></b> as identity server;</li>
        <li key={12}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Experience with <i>Docker</i> - usage of containers, volumes, port mappings, environment variables. Implementation and usage of <b>docker-compose.yml</b>;</li>
        <li key={13}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Integration between front end and back end;</li>
        <li key={14}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Implementation of functional <i>React</i> components and usage of third party UI library (<i>Prime React</i>)</li>
        <li key={15}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Usage of <i>Context API</i>, <i>useState</i>, <i>useEffect</i>, <i>useRef</i> hooks;</li>
        <li key={16}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Implementation of protected routes and sending authorized requests to back end API;</li>
        <li key={17}><i className={`${PrimeIcons.CHECK_SQUARE} icon`}></i>Experience with <i>TypeScript</i>;</li>
      </ul>
    </section>
  </div>
}
