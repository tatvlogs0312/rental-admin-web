import React, { useState } from "react";
import "./UtilityAdd.css";
import { useNavigate } from "react-router-dom";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import axios from "axios";
import { api } from "../../../apis/Api";
import AppDialog from "../../../components/dialog/AppDialog";
import CInput from "../../../components/custom/CInput";
import CLabel from "../../../components/custom/CLabel";
import "./UtilityAdd.css";
import { toast } from "react-toastify";

function UtilityAdd() {
  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");

  const handleAdd = () => {
    axios
      .post(api.UTILITY_ADD_URL, {
        code: code,
        name: name,
        price: Number(price),
        unit: unit,
      })
      .then((res) => {
        navigate("/utility");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    setShowDialog(false);
  };

  return (
    <div className="app--utilily--add">
      <AppDialog title={"Thêm dữ liệu"} message={"Bạn xác nhận thêm dữ liệu?"} open={showDialog} onConfirm={handleAdd} onCancel={() => setShowDialog(false)} />

      <div className="app--utilily--add--title">Thêm thông tin dịch vụ</div>
      <div className="app--utility--form--add">
        <FormControl defaultValue={code} required>
          <CLabel title={"Mã dịch vụ"} />
          <CInput placeholder="Mã dịch vụ" onChange={(e) => setCode(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={name} required>
          <CLabel title={"Tên dịch vụ"} />
          <CInput placeholder="Tên dịch vụ" onChange={(e) => setName(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={price} required>
          <CLabel title={"Giá dịch vụ"} />
          <CInput placeholder="Giá dịch vụ" onChange={(e) => setPrice(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={unit} required>
          <CLabel title={"Đơn vị tính"} />
          <CInput placeholder="Đơn vị tính" onChange={(e) => setUnit(e.target.value)} />
          <HelperText />
        </FormControl>
      </div>
      <Button type="button" variant="contained" sx={{ mt: 10, mb: 2 }} onClick={() => setShowDialog(true)}>
        Thêm mới
      </Button>
    </div>
  );
}

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

export default UtilityAdd;
