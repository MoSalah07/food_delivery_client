import { Button } from "@mui/material";
import "./landing.css";

function Landing() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2 className="text-sm font-bold sm:text-xl md:text-3xl lg:text-5xl xl:text-7xl mb-4 sm:m-0">
          Order your favourite food here
        </h2>
        <p className="hidden sm:block sm:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          obcaecati magni iste ratione cupiditate quasi quibusdam a facere. Ut
          aut laboriosam quas aperiam nostrum harum repellendus natus delectus
          quos tenetur.
        </p>
        <Button
          sx={{
            border: "none",
            color: "#747474",
            fontWeight: 500,
            padding: "1vw 2.3vw",
            backgroundColor: "white",
            fontSize: "max(1vw,13px)",
            borderRadius: "50px",
          }}
        >
          View Menu
        </Button>
      </div>
    </div>
  );
}

export default Landing;
