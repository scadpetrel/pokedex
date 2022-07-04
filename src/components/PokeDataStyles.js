import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const DataContainer = styled(Box)(({ theme }) => ({
  border: "1.5px solid #4eba94",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",  
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxSizing: "border-box",
  "& h4": {
    marginBottom: theme.spacing(4),
  },
  "& .dataItem": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  "& span": {
    paddingBottom: ".3rem",
  },
  "& .MuiChip-labelMedium": {
    fontSize: "16px",
    padding: "14px",
  },
  "& .heightWeight": {
    marginBottom: theme.spacing(3),
    "& .dataItem": {
      paddingTop: theme.spacing(3),
      "&:first-of-type": {
        marginLeft: "auto",
      },
      "&:last-of-type": {
        marginRight: "auto",
      },
    },
  },
  "& .typeBlock": {
    "& span:first-of-type": {
      marginRight: ".4rem",
    },
    "& span:last-of-type": {
      marginLeft: ".4rem",
    },
    "& .MuiChip-root": {
      padding: ".5rem",
    },
    "& h6": {
      marginBottom: theme.spacing(1),
    },
  },
  "& .abilitiesBlock": {
    "& h6": {
      marginBottom: theme.spacing(1),
    },
  },
  "&.dataItem": {
    "& h6": { color: "#ac0031" },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },
}));
