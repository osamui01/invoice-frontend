// import Sidebar from "@/components/global/sidebar";
import Sidebar from "@/components/global/sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <h1>Invoice App Dashboard</h1> */}
      <Sidebar />
      <Outlet />
    </>
  ),
});
