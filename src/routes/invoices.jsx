import { createFileRoute } from "@tanstack/react-router";
import InvoicePage from "@/components/invoices/InvoicePage";

export const Route = createFileRoute("/invoices")({
  component: InvoicePage,
});
