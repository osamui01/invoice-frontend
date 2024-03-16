import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function Sidebar() {
  return (
    <>
      {/* <div className="hidden fixed lg:flex flex-col items-start justify-between h-screen w-64  p-4"> */}

      <div className="fixed flex flex-col justify-between h-screen w-64 p-4">
        <Button variant="secondary">Welcome</Button>

        <ul className="space-y-4">
          <li>
            <Button variant="customOutline">
              <Link className="" to="/">
                Dashboard
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="customOutline">
              <Link className="" to="/invoices">
                Invoices
              </Link>
            </Button>
          </li>
        </ul>

        <p className="text-xs">&copy; Ralphael Obadiaru 2024</p>
      </div>
    </>
  );
}
