import { useMediaQuery, useTheme } from "@mui/material";

function useMediaMui(query = "md") {
  const theme = useTheme();
  const isQueryScreen = useMediaQuery(theme.breakpoints.down(query));
  return { isQueryScreen };
}

export default useMediaMui;
