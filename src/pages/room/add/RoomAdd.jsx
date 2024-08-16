import { Button } from "@mui/material";
import React, { useState } from "react";
import { api } from "../../../apis/Api";
import { useLocation, useNavigate } from "react-router-dom";
import AppDialog from "../../../components/dialog/AppDialog";
import CLabel from "../../../components/custom/CLabel";
import CInput from "../../../components/custom/CInput";
import { styled } from "@mui/system";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import axios from "axios";
import "./RoomAdd.css";
import { toast, ToastContainer } from "react-toastify";

function RoomAdd() {
  var location = useLocation();
  const navigate = useNavigate();

  const [houseCode, setHouseCode] = useState(location.state.houseCode);

  const [showDialog, setShowDialog] = useState(false);

  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomPosition, setRoomPosition] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);

  const handleAdd = () => {
    axios
      .post(api.ROOM_ADD_URL, {
        houseCode: houseCode,
        roomCode: roomCode,
        name: roomName,
        position: roomPosition,
        price: Number(roomPrice),
      })
      .then((res) => navigate(-1))
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    setShowDialog(false);
  };

  return (
    <div className="app--room--add">
      
      <AppDialog title={"Thêm dữ liệu"} message={"Bạn xác nhận thêm dữ liệu?"} open={showDialog} onConfirm={handleAdd} onCancel={() => setShowDialog(false)} />

      <div className="app--room--add--title">Thêm thông tin phòng</div>
      <div className="app--room--form--add">
        <FormControl defaultValue={roomCode} required>
          <CLabel title="Mã phòng">Mã phòng</CLabel>
          <CInput placeholder="Mã phòng" onChange={(e) => setRoomCode(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={roomName} required>
          <CLabel title="Tên phòng">Tên phòng</CLabel>
          <CInput placeholder="Tên phòng" onChange={(e) => setRoomName(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={roomPosition} required>
          <CLabel title="Vị trí phòng">Vị trí phòng</CLabel>
          <CInput placeholder="Vị trí phòng" onChange={(e) => setRoomPosition(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={roomPrice} required>
          <CLabel title="Giá phòng">Giá phòng</CLabel>
          <CInput placeholder="Giá phòng" onChange={(e) => setRoomPrice(e.target.value)} />
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
  color: red;
`;

export default RoomAdd;
