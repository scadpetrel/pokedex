import { styled, i } from "@mui/material/styles";

// export const LoadingRoot = styled(":root")(({ theme }) => ({
//   "--primary": "#4eba94",
//   "--secondary": "#b6fff7",
// }));

export const LoadingContainer = styled("div")(({ theme }) => ({
  "--primary": "#4eba94",
  "--secondary": "#b6fff7",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .pokeball": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "150px",
    width: "150px",
    border: "10px solid var(--primary)",
    borderRadius: "5px",
    "&::before": {
      content: "''",
      position: "absolute",
      bottom: "0",
      height: "150px",
      width: "150px",
      /*animation: fill 2s ease 1 infinite;*/
      animation: "fill 2.4s ease 0s infinite"
    },
  },
  "& .pokeball-center": {
    boxSizing: "border-box",
    height: "50px",
    width: "50px",
    border: "10px solid var(--primary)",
    borderRadius: "5px",
    zIndex: "1",
    "&::before": {
      left: "0",
      position: "absolute",
      content: "''",
      height: "10px",
      width: "50px",
      backgroundColor: "var(--primary)",
      top: "46%",
    },
    "&::after": {
      right: "0",
        position: "absolute",
        content: "''",
        height: "10px",
        width: "50px",
        backgroundColor: "var(--primary)",
        top: "46%",
    },
  },
  "@keyframes fill": {
    from: {
        height: "0px",
    },
    to: {
        height: "150px",
        backgroundColor: "var(--secondary)",
    },
  },
  
  "& .loadingText": {
    padding: "1rem 0px",
  },
  "& .container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      },
  "& .pokeball-404": {  
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "150px",
    width: "150px",
    border: "10px solid var(--primary)",
    borderRadius: "5px",
    "&::before": {
      content: "''",
      position: "absolute",
      bottom: "0",
      height: "150px !important",
      width: "150px",
      backgroundColor: "var(--secondary)",
      animation: "fill 3s ease 1s infinite"
    },
  },
 
}));