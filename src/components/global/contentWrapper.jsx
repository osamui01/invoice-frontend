import { cn } from "@/lib/utils";

const ContentWrapper = ({ children, className }) => {
  return (
    <div
      className={cn("ml-64 p-4 max-w-screen bg-primary/25 h-screen", className)}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
