import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled, alpha } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const GenerationSelectButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: "black",
  // width: "calc(100% + 24px)",
  width: "100%",
  whiteSpace: "nowrap",
}));

export default function SelectGeneration({
  generation,
  handleGenerationChange,
  setIsLoaded,
  width,
}) {
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = React.useState("");

  // const generationNames = {
  //   1: "Generation I",
  //   2: "Generation II",
  //   3: "Generation III",
  //   4: "Generation IV",
  //   5: "Generation V",
  //   6: "Generation VI",
  //   7: "Generation VII",
  //   8: "Generation VIII",
  //   9: "All Generations",
  // };

  const generationNames = [
    { value: 1, full: "Generation I", short: "Gen I" },
    { value: 2, full: "Generation II", short: "Gen II" },
    { value: 3, full: "Generation III", short: "Gen III" },
    { value: 4, full: "Generation IV", short: "Gen IV" },
    { value: 5, full: "Generation V", short: "Gen V" },
    { value: 6, full: "Generation VI", short: "Gen VI" },
    { value: 7, full: "Generation VII", short: "Gen VII" },
    { value: 8, full: "Generation VIII", short: "Gen VIII" },
    { value: 9, full: "All Gen", short: "All" },
  ];

  // const handleChange = (event) => {
  //   setSelection(Number(event.target.value) || '');
  // };

  // useEffect(() => {
  //   handleGenerationChange(selection);
  // }, [selection])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const switchLoading = (e) => {
    console.log(e.target.value);
    setOpen(false);
    setIsLoaded(false);
    // setSelection(e.target.value);
    handleGenerationChange(e.target.value);
  };

  const handleSelectChoice = (event) => {
    handleGenerationChange(event.target.value);
  };
  return (
    <div>
      <GenerationSelectButton
        style={{}}
        onClick={handleClickOpen}
        color="secondary"
        variant="contained"
      >
        {width < 600
          ? generationNames[generation - 1].short
          : generationNames[generation - 1].full}
        <ArrowDropDownIcon />
      </GenerationSelectButton>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select a Generation</DialogTitle>
        <DialogContent>
          <Box component="form">
            <FormControl>
              {/* <InputLabel htmlFor="generation-select">Generation</InputLabel> */}
              <Select
                labelId="select-pokemon-generation"
                id="select-pokemon"
                value={generation}
                // label="Generation I"
                onChange={switchLoading}
                color="secondary"
              >
                {generationNames.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.full}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "black" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button style={{ color: "black" }} onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
