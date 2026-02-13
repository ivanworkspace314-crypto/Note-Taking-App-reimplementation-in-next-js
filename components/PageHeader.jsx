import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "./Buttons/Button";

const PageHeader = ({
  backLink,
  backText = "Back",
  children,
  haveDeleteButton = false,
  deleteOnclick,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        {backLink && (
          <Link href={backLink} className="btn btn-ghost gap-2">
            <ArrowLeft className="w-5 h-5" />
            {backText}
          </Link>
        )}

        {haveDeleteButton && (
          <Button onClick={deleteOnclick} variant="error">
            Delete Note
          </Button>
        )}
      </div>

      {children && (
        <h2 className="text-3xl font-bold text-base-content">{children}</h2>
      )}
    </div>
  );
};

export default PageHeader;
