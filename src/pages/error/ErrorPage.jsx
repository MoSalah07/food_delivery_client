import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="h-[65vh] w-full flex flex-col justify-center items-center  bg-primary-orange text-white text-center bg-sk">
      <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold">
        404 Page Not Found
      </h1>
      <p className="my-4 xl:my-8 text-2xl md:text-2xl xl:text-4xl">
        The Page You&apos;re Looking For Deosen&apos;t exist.
      </p>
      <Button
        onClick={() => navigate(`/`)}
        sx={{
          bgcolor: "#0284c7",
          color: "white",
          padding: ".66rem 3rem",
        }}
      >
        Back Home
      </Button>
    </div>
  );
}

export default ErrorPage;
