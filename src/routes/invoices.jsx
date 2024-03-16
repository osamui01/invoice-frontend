import { createFileRoute } from "@tanstack/react-router";
import ContentWrapper from "@/components/global/contentWrapper";

export const Route = createFileRoute("/invoices")({
  component: () => (
    <>
      <ContentWrapper>
        <h1>Invoice Page</h1>
      </ContentWrapper>
    </>
  ),
});
