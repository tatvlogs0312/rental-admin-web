import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppDialog from "../../../components/dialog/AppDialog";
import { styled } from "@mui/system";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import axios from "axios";
import CLabel from "../../../components/custom/CLabel";
import CInput from "../../../components/custom/CInput";
import { Button } from "@mui/material";
import { api } from "../../../apis/Api";
import "./RoomUpdate.css";
import { toast } from "react-toastify";

function RoomUpdate() {
  const navigate = useNavigate();

  const location = useLocation();

  const [houseCode, setHouseCode] = useState(location.state.houseCode);

  const room = location.state.room;

  const [showDialog, setShowDialog] = useState(false);

  const [roomCode, setRoomCode] = useState(room.code);
  const [roomName, setRoomName] = useState(room.name);
  const [roomPosition, setRoomPosition] = useState(room.position);
  const [roomPrice, setRoomPrice] = useState(room.price);

  const handleUpdate = () => {
    axios
      .put(api.ROOM_UPDATE_URL, {
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
    <div className="app--room--update">
      <AppDialog
        title={"Cập nhật dữ liệu phòng"}
        message={"Bạn xác nhận cập nhật dữ liệu phòng này?"}
        open={showDialog}
        onConfirm={handleUpdate}
        onCancel={() => setShowDialog(false)}
      />

      <div className="app--room--update--title">Cập nhật thông tin phòng</div>
      <div className="app--room--form--update">
        <FormControl defaultValue={roomCode} required>
          <CLabel title="Mã phòng">Mã phòng</CLabel>
          <CInput placeholder="Mã phòng" onChange={(e) => setRoomCode(e.target.value)} readOnly={true} />
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
        Cập nhật
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

export default RoomUpdate;
