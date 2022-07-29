import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GenerationSelectButton, DialogCancelConfirm } from "./SelectGenerationStyles";

export default function SelectGeneration({
  generation,
  handleGenerationChange,
  setIsLoaded,
  width,
}) {
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = React.useState("");
  const navigate = useNavigate();


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
      setOpen(false);
  };

  const switchLoading = (e) => {
    console.log(e.target.value);
    setOpen(false);
    setIsLoaded(false);
    // setSelection(e.target.value);
    handleGenerationChange(e.target.value);
  };

  const handleSelectChoice = (event) => {
    navigate(`/generation/${event.target.value}`, {replace: true});
    // navigate(0);
    setOpen(false);
    // setIsLoaded(false);
    // handleGenerationChange(event.target.value);
  };

  const handleClickSelect = (event) => {
    console.log("Click Select:", event.target.value);
  }
  return (
    <div>
      <GenerationSelectButton
        onClick={handleClickOpen}
        color="secondary"
        variant="contained"
      >
        {width < 600
          ? generationNames[generation - 1].short
          : generationNames[generation - 1].full}
        <ArrowDropDownIcon />
      </GenerationSelectButton>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle textAlign="center">Select a Generation</DialogTitle>
        <DialogContent style={{minWidth: "250px"}}>
          <Box component="form" textAlign="center" >
            <FormControl style={{width: "80%"}}>
              {/* <InputLabel htmlFor="generation-select">Generation</InputLabel> */}
              <Select
                labelId="select-pokemon-generation"
                id="select-pokemon"
                value={generation}
                // label="Generation I"
                // onChange={switchLoading}
                onChange={handleSelectChoice}
                // onClick={handleClickSelect}
                color="secondary"
              >
                {generationNames.map((item) => (
                  <MenuItem key={item.value} value={item.value} style={{justifyContent: "center"}}>
                    {item.full}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogCancelConfirm>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>
            Ok
          </Button>
        </DialogCancelConfirm>
      </Dialog>
    </div>
  );
}
