import React, { useState } from "react";
import "./UtilityUpdate.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { Button } from "@mui/material";
import axios from "axios";
import { api } from "../../../apis/Api";
import AppDialog from "../../../components/dialog/AppDialog";
import "./UtilityUpdate.css";
import CLabel from "../../../components/custom/CLabel";
import CInput from "../../../components/custom/CInput";
import { toast } from "react-toastify";

function UtilityUpdate() {
  const location = useLocation();

  const navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  const [utilily, setUtility] = useState(location.state.utility);
  const [code, setCode] = useState(utilily.code);
  const [name, setName] = useState(utilily.name);

  const priceUnit = utilily.price.split("/");
  const [price, setPrice] = useState(priceUnit[0]);
  const [unit, setUnit] = useState(priceUnit[1]);

  const handleUpdate = () => {
    axios
      .put(api.UTILITY_UPDATE_URL, {
        code: code,
        name: name,
        price: Number(price),
        unit: unit,
      })
      .then((res) => {
        setShowDialog(false);
        navigate("/utility");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="app--utilily--update">
      <AppDialog
        title={"Cập nhật dữ liệu"}
        message={"Bạn xác nhận cập nhật dữ liệu?"}
        open={showDialog}
        onConfirm={handleUpdate}
        onCancel={() => setShowDialog(false)}
      />

      <div className="app--utilily--update--title">Chỉnh sửa thông tin dịch vụ</div>
      <div className="app--utility--form--update">
        <FormControl defaultValue={code} required>
          <CLabel title={"Mã dịch vụ"} />
          <CInput placeholder="Mã dịch vụ" readOnly={true} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={name} required>
          <CLabel title={"Tên dịch vụ"} />
          <CInput placeholder="Tên dịch vụ" onChange={(e) => setName(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={price} required>
          <CLabel title={"Tên dịch vụ"} />
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
        Cập nhật
      </Button>
    </div>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `
  
    .${inputClasses.input} {
      width: 500px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 8px 12px;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  
      &:hover {
        border-color: ${blue[400]};
      }
  
      &:focus {
        outline: 0;
        border-color: ${blue[400]};
        box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
      }
    }
  `,
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

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

export default UtilityUpdate;
