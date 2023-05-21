import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { MenuItem, Select, FormControl, InputLabel } from "@material-ui/core";
import { companyOptions } from "../utils/companyOptions";

export default function FormModal({ handleClose, open, setFormDataFinal }) {
  const [formData, setFormData] = React.useState([{ symbol: "", amount: "" }]);

  const handleFormChange = (index, field, value) => {
    const updatedData = [...formData];
    updatedData[index][field] = value;
    setFormData(updatedData);
  };

  const handleAddLine = () => {
    setFormData([...formData, { symbol: "", amount: "" }]);
  };

  const handleFormSubmit = () => {
    setFormDataFinal(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload your Assets</DialogTitle>
      <DialogContent>
        {formData.map((data, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="standard">
                <InputLabel id={`symbol${index}-label`}>Symbol</InputLabel>
                <Select
                  autoFocus={index === 0}
                  margin="dense"
                  id={`symbol${index}`}
                  labelId={`symbol${index}-label`}
                  value={data.symbol}
                  onChange={(e) =>
                    handleFormChange(index, "symbol", e.target.value)
                  }
                >
                  {companyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id={`amount${index}`}
                label="Amount"
                value={data.amount}
                onChange={(e) =>
                  handleFormChange(index, "amount", e.target.value)
                }
                type="number"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        ))}
        <Button onClick={handleAddLine} startIcon={<AddIcon />} color="primary">
          Add Line
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
