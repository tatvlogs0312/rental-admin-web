import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Slide, TextField } from "@mui/material";
import React, { useState } from "react";

function UtilityDialog(props) {
  const [utility, setUtility] = useState(props.utility);
  const [utilities, setUtilities] = useState(props.utilities);
  const [number, setNumber] = useState(0);

  const handleSelected = (e) => {
    const code = e.target.value;
    var utilitySelected = props.utilities.filter((u) => u.code === code)[0];
    setUtility(utilitySelected);
  };

  return (
    <div>
      {utility && (
        <Dialog
          open={props.open}
          // TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle marginBottom={"10px"}>Thêm dịch vụ</DialogTitle>
          <DialogContent>
            <div
              style={{
                margin: "20px",
                display: "flex",
                width: "400px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={utility.code} label="Dịch vụ" onChange={(e) => handleSelected(e)}>
                  {utilities.map((u) => (
                    <MenuItem key={u.id} value={u.code}>
                      {u.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Số lượng sử dụng" onChange={(e) => setNumber(e.target.value)} value={number} style={{ marginLeft: "20px" }} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose()}>Đóng</Button>
            <Button onClick={() => props.handleAdd({ utilityCode: utility.code, numberUse: number, price: utility.price })}>Thêm</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default UtilityDialog;
