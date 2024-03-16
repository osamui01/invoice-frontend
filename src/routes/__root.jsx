import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <h1>Invoice App Dashboard</h1>

      <ul>
        <li>
          <Link to="/invoices">Invoices</Link>
        </li>
      </ul>
      <Outlet />
    </>
  ),
});
