import { createFileRoute } from "@tanstack/react-router";
import ContentWrapper from "@/components/global/contentWrapper";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <ContentWrapper>
        <h1>Invoice App Dashboard</h1>
      </ContentWrapper>
    </>
  ),
});
