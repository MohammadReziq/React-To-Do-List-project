import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [alert, setAlert] = React.useState(false);

  return (
    <Box
      sx={{ "& > legend": { mt: 2 } }}
      className="flex justify-center flex-col items-center relative"
    >
      <Typography component="legend" className="!font-bold !text-3xl">
        Your Opinion:
      </Typography>
      <Rating
        name="simple-uncontrolled"
        defaultValue={2}
        onClick={() => {
          setAlert(true); // Set alert to true after click
          setTimeout(() => setAlert(false), 2000); // Hide after 2 seconds
        }}
      />
      {alert && (
        <div className="absolute bottom-[-40px] bg-blue-500 text-white py-2 px-4 rounded-md">
          Thank you for your feedback!
        </div>
      )}
    </Box>
  );
}
