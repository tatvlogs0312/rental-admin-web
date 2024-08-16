import React, { useState } from "react";
import { api } from "../../../apis/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./ContractCreate.css";
import AppDialog from "../../../components/dialog/AppDialog";
import axios from "axios";
import { toast } from "react-toastify";

function ContractCreate() {
  var location = useLocation();
  var navigate = useNavigate();

  const [showDialog, setShowDialog] = useState(false);

  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [identityCardNumber, setIdentityCardNumber] = useState("");
  const [gender, setGender] = useState("MALE");
  const [placeOfOrigin, setPlaceOfOrigin] = useState("");
  const [placeOfResidence, setPlaceOfResidence] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otherPhoneNumber, setOtherPhoneNumber] = useState("");
  const [roomCode, setRoomCode] = useState(location.state.roomCode);

  const callApiCreate = () => {
    axios
      .post(api.CONTRACT_CREATE_URL, {
        fullName: fullName,
        birthdate: birthdate,
        identityCardNumber: identityCardNumber,
        gender: gender,
        placeOfOrigin: placeOfOrigin,
        placeOfResidence: placeOfResidence,
        phoneNumber: phoneNumber,
        otherPhoneNumber: otherPhoneNumber,
        roomCode: roomCode,
      })
      .then((res) => navigate("/contract/"))
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const handleBirthdate = (value) => {
    console.log(value);
    var date = value.$D + "/" + Number(value.$M + 1) + "/" + value.$y;
    console.log(date);
    setBirthdate(date);
  };

  return (
    <div className="app--contract--create">
      <AppDialog
        title={"Tạo hợp đồng"}
        message={"Bạn xác nhận tạo hợp đồng?"}
        open={showDialog}
        onConfirm={() => callApiCreate()}
        onCancel={() => setShowDialog(false)}
      />
      <div className="app--contract--create--title">Tạo hợp đồng</div>
      <div>
        <div className="app--contract--create--form">
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Họ tên"
              variant="standard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Ngày sinh" onChange={(value) => handleBirthdate(value)} format="DD/MM/YYYY" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "100px" }}>
              <FormControl style={{ width: "100%" }}>
                <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                  <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Số CMND/CCCD"
              variant="standard"
              value={identityCardNumber}
              onChange={(e) => setIdentityCardNumber(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Quê quán"
              variant="standard"
              value={placeOfOrigin}
              onChange={(e) => setPlaceOfOrigin(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Địa chỉ thường trú"
              variant="standard"
              value={placeOfResidence}
              onChange={(e) => setPlaceOfResidence(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Số điện thoại"
              variant="standard"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Số điện thoại khác"
              variant="standard"
              value={otherPhoneNumber}
              onChange={(e) => setOtherPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Mã phòng"
              variant="standard"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "center", marginTop: "50px" }}>
          <Button variant="contained" size="large" onClick={() => setShowDialog(true)}>
            Tạo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContractCreate;
