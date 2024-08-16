import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../../apis/Api";
import AppDialog from "../../../components/dialog/AppDialog";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import CLabel from "../../../components/custom/CLabel";
import CInput from "../../../components/custom/CInput";
import CTextarea from "../../../components/custom/CTextarea";
import { useNavigate } from "react-router-dom";
import "./HouseAdd.css";
import { toast } from "react-toastify";

function HouseAdd() {
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [province, setProvince] = useState({});
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});

  const [code, setCode] = useState("");
  const [roomNumber, setRoomNumber] = useState(0);
  const [addressDetail, setAddressDetail] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    axios
      .get(api.GET_PROVINCE_URL)
      .then((res1) => {
        setProvinces(res1.data);
        setProvince(res1.data[0]);

        var provinceId = res1.data[0].province_id;
        axios
          .get(api.GET_DISTRICT_URL + "?provinceId=" + provinceId)
          .then((res2) => {
            setDistricts(res2.data);
            setDistrict(res2.data[0]);

            var districtId = res2.data[0].district_id;
            axios
              .get(api.GET_WARD_URL + "?districtId=" + districtId)
              .then((res3) => {
                setWards(res3.data);
                setWard(res3.data[0]);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProvince = (e) => {
    var id = e.target.value;
    var provinceById = provinces.filter((p) => p.province_id === id)[0];
    setProvince(provinceById);

    axios
      .get(api.GET_DISTRICT_URL + "?provinceId=" + id)
      .then((res) => {
        setDistricts(res.data);
        setDistrict(res.data[0]);

        var districtId = res.data[0].district_id;
        axios
          .get(api.GET_WARD_URL + "?districtId=" + districtId)
          .then((res2) => {
            setWards(res2.data);
            setWard(res2.data[0]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    console.log(district);
  };

  const handleDistrict = (e) => {
    var id = e.target.value;
    var districtById = districts.filter((d) => d.district_id === id)[0];
    setDistrict(districtById);

    axios
      .get(api.GET_WARD_URL + "?districtId=" + id)
      .then((res) => {
        setWards(res.data);
        setWard(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleWard = (e) => {
    var id = e.target.value;
    var wardById = wards.filter((w) => w.ward_id === id)[0];
    setWard(wardById);
  };

  //Call thêm nhà
  const handleAdd = () => {
    axios
      .post(api.HOUSE_ADD_URL, {
        code: code,
        position: addressDetail + " - " + ward.ward_name + " - " + district.district_name + " - " + province.province_name,
        roomNumber: Number(roomNumber),
        roomCreateReqDTOS: [],
      })
      .then((res) => {
        setShowDialog(false);
        navigate("/house");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="app--house--add">
      <AppDialog title={"Thêm dữ liệu"} message={"Bạn xác nhận thêm dữ liệu?"} open={showDialog} onConfirm={handleAdd} onCancel={() => setShowDialog(false)} />

      <div className="app--house--add--title">Thêm thông tin nhà</div>
      <div className="app--house--form--add">
        <FormControl defaultValue={code} required>
          <CLabel title="Mã nhà" />
          <CInput placeholder="Mã nhà" onChange={(e) => setCode(e.target.value)} />
          <HelperText />
        </FormControl>

        {provinces.length > 0 && (
          <div className="app--select--address">
            <Box sx={{ width: "32%", marginTop: "20px", marginBottom: "10px" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Tỉnh thành</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tỉnh thành"
                  value={province.province_id}
                  onChange={(e) => handleProvince(e)}
                  required
                  style={{ width: "100%" }}
                >
                  {provinces.map((p) => (
                    <MenuItem key={p.province_id} value={p.province_id}>
                      {p.province_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {districts.length > 0 && (
              <Box sx={{ width: "32%", marginTop: "20px", marginBottom: "10px" }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Quận huyện</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quận huyện"
                    value={district.district_id}
                    onChange={(e) => handleDistrict(e)}
                    required
                    style={{ width: "100%" }}
                  >
                    {districts.map((d) => (
                      <MenuItem key={d.district_id} value={d.district_id}>
                        {d.district_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {wards.length > 0 && (
              <Box sx={{ width: "32%", marginTop: "20px", marginBottom: "10px" }}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Xã phường</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Xã phường"
                    value={ward.ward_id}
                    onChange={(e) => handleWard(e)}
                    required
                    style={{ width: "100%" }}
                  >
                    {wards.map((w) => (
                      <MenuItem key={w.ward_id} value={w.ward_id}>
                        {w.ward_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </div>
        )}

        <FormControl defaultValue={addressDetail} required>
          <CLabel title="Địa chỉ cụ thể" />
          <CTextarea placeholder="Địa chỉ cụ thể" onChange={(e) => setAddressDetail(e.target.value)} />
          <HelperText />
        </FormControl>

        <FormControl defaultValue={roomNumber} required>
          <CLabel title="Số lượng phòng" />
          <CInput placeholder="Số lượng phòng" onChange={(e) => setRoomNumber(e.target.value)} />
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

  return showRequiredError ? <p {...props}>Trường này là bắt buộc</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  color: red;
`;

export default HouseAdd;
