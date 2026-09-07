import type { JSX } from "react";
import { useRouteError } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
    const error: { statusText?: string; message?: string } = useRouteError() as { statusText?: string; message?: string };
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>The page that you are looking for does not exist.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}