import { styled } from "@mui/material/styles";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const GenerationSelectButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: "black",
  // width: "calc(100% + 24px)",
  width: "100%",
  whiteSpace: "nowrap",
}));

export const DialogCancelConfirm = styled(DialogActions)(({ theme }) => ({
  "& button": {
    color: "black",
  },
}));