import React, { useEffect, useState } from "react";
import { api } from "../../../apis/Api";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import "./ContractDetail.css";
import { toast } from "react-toastify";

const identity = {
  FRONT: "Mặt trước",
  BACK: "Mặt sau",
};

const statusOfContract = {
  DRAFT: "Nháp",
  EXPIRE: "Hết hiệu lực",
  EFFECTIVE: "Hiệu lực",
};

function ContractDetail() {
  var location = useLocation();

  const [contractCode, setContractCode] = useState(location.state.contractCode);
  const [contract, setContract] = useState(null);

  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);

  useEffect(() => {
    callApiDetail();
  }, []);

  const callApiDetail = () => {
    axios
      .post(api.CONTRACT_DETAIL_URL, {
        contractCode: contractCode,
      })
      .then((res) => {
        setContract(res.data);
      })
      .catch((err) => console.log(err));
  };

  const uploadIdentity = () => {
    var formData = new FormData();
    formData.append("contractCode", contractCode);
    formData.append("front", front);
    formData.append("back", back);

    axios({
      method: "post",
      url: api.CONTRACT_UPLOAD_URL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  var FileComponent;
  if (contract && contract.files) {
    FileComponent = (
      <div>
        <h3 style={{ fontSize: "30px" }}>CMND/CCCD</h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "20px" }}>
          {contract.files.map((f) => (
            <div key={f.id}>
              <img
                src={"http://localhost:65432/administration-service/contract/download/" + f.id}
                alt={f.type}
                style={{ width: "400px", borderRadius: "20px" }}
              />
              <div style={{ textAlign: "center" }}>{identity[f.type]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (contract && contract.status !== "EXPIRE") {
    FileComponent = (
      <div>
        <h3>Cập nhật giấy tờ</h3>
        <div style={{ display: "flex" }}>
          <MuiFileInput value={front} onChange={(file) => setFront(file)} placeholder="CCND/CCCD mặt trước" />
          <MuiFileInput value={back} onChange={(file) => setBack(file)} placeholder="CCND/CCCD mặt sau" style={{ margin: "0 20px" }} />
          {front && back && (
            <Button variant="outlined" onClick={uploadIdentity} size="large">
              Cập nhật
            </Button>
          )}
        </div>
      </div>
    );
  }

  const effective = () => {
    axios
      .post(api.CONTRACT_EFFECTIVE_URL, {
        contractCode: contractCode,
      })
      .then((res) => {
        toast.success("Cập nhật trạng thái hoạt động thành công");
        callApiDetail();
      })
      .catch((err) => console.log(err));
  };

  const terminate = () => {
    axios
      .put(api.CONTRACT_TEMINATION_URL, {
        contractCode: contractCode,
      })
      .then((res) => {
        toast.success("Cập nhật trạng thái hủy thành công");
        callApiDetail();
      })
      .catch((err) => console.log(err));
  };

  var buttonForContract;
  if (contract && contract.status === "DRAFT") {
    buttonForContract = (
      <Button variant="outlined" onClick={() => effective()} size="medium">
        Active hợp đồng
      </Button>
    );
  }
  if (contract && contract.status === "EFFECTIVE") {
    buttonForContract = (
      <Button variant="outlined" size="medium" onClick={() => terminate()}>
        Kết thúc hợp đồng
      </Button>
    );
  }

  return (
    <div className="app--contract--detail">
      {contract && (
        <div>
          <div>
            <h3 style={{ fontSize: "30px" }}>Thông tin khách thuê</h3>
            <div className="app--contract--create--form">
              <Grid container spacing={0} justifyContent={"space-between"}>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Họ tên"
                    variant="standard"
                    value={contract.fullName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Ngày sinh"
                    variant="standard"
                    value={contract.birthdate}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <FormControl
                    style={{ width: "200px" }}
                    InputProps={{
                      readOnly: true,
                    }}
                  >
                    <FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={contract.genderCode}
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <FormControlLabel value="FEMALE" control={<Radio />} label="Nữ" />
                      <FormControlLabel value="MALE" control={<Radio />} label="Nam" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Số CMND/CCCD"
                    variant="standard"
                    value={contract.identityCardNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Quê quán"
                    variant="standard"
                    value={contract.placeOfOrigin}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Địa chỉ thường trú"
                    variant="standard"
                    value={contract.placeOfResidence}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Số điện thoại"
                    variant="standard"
                    value={contract.phoneNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Số điện thoại khác"
                    variant="standard"
                    value={contract.otherPhoneNumber}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>

            {FileComponent}
          </div>

          <div style={{ marginTop: "50px" }}>
            <h3 style={{ fontSize: "30px" }}>Thông tin hợp đồng</h3>
            <div className="app--contract--create--form">
              <Grid container spacing={0} justifyContent={"space-between"}>
              <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Ngày tạo"
                    variant="standard"
                    value={contract.createDate}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Ngày kết thúc hợp đồng"
                    variant="standard"
                    value={contract.createDate}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Trạng thái"
                    variant="standard"
                    value={statusOfContract[contract.status] || "Không xác định"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "30px" }}>Thông tin phòng</h3>
            <div className="app--contract--create--form">
              <Grid container spacing={0} justifyContent={"space-between"}>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Mã nhà"
                    variant="standard"
                    value={contract.roomInfo.houseCode}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Mã phòng"
                    variant="standard"
                    value={contract.roomInfo.roomCode}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Tên phòng"
                    variant="standard"
                    value={contract.roomInfo.roomName}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Địa chỉ nhà"
                    variant="standard"
                    value={contract.roomInfo.housePosition}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Vị trí phòng"
                    variant="standard"
                    value={contract.roomInfo.roomPosition}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={5} marginBottom={"25px"}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Giá phòng"
                    variant="standard"
                    value={contract.roomInfo.roomPrice}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {buttonForContract}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractDetail;
