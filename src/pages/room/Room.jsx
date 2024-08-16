import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Room.css";
import { api } from "../../apis/Api";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import AppDialog from "../../components/dialog/AppDialog";

const statusOfRoom = {
  EMPTY: "Còn trống",
  RENTED: "Đã cho thuê",
};

function Room() {
  var location = useLocation();

  const [showDialog, setShowDialog] = useState(false);

  const [houseCode, setHouseCode] = useState(location.state.houseCode);
  const [roomCodeDelete, setRoomCodeDelete] = useState(null);
  const [house, setHouse] = useState(null);
  const [roomStatus, setRoomStatus] = useState("EMPTY");
  const [page, setPage] = useState(0);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .post(api.HOUSE_DETAIL_URL, {
        houseCode: houseCode,
        status: roomStatus,
        page: page,
        size: 5,
      })
      .then((res) => {
        setHouse(res.data);
        setRooms(res.data.roomData);
      })
      .catch((err) => console.log(err));
  }, [houseCode, page, roomStatus]);

  const handleDelete = () => {
    axios
      .delete(api.ROOM_DELETE_URL, {
        data: {
          roomCode: roomCodeDelete,
        },
      })
      .then()
      .catch((err) => console.log(err));

    setRooms(rooms.filter((r) => r.code !== roomCodeDelete));
    setShowDialog(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <AppDialog
        title={"Xóa phòng"}
        message={"Bạn xác nhận xóa dữ liệu phòng này?"}
        open={showDialog}
        onConfirm={handleDelete}
        onCancel={() => setShowDialog(false)}
      />
      {house && (
        <div className="app--room--detail">
          <div>
            <div className="app--room--detail--title">Chi tiết nhà</div>
            <div className="app--house--info">
              <div>
                <b>Mã nhà:</b> {house.code}
              </div>
              <div>
                <b>Vị trí:</b> {house.position}
              </div>
              <div>
                <b>Tổng số phòng: </b>
                {house.total}
              </div>
              <div>
                <b>Số phòng còn trống: </b> {house.available}
              </div>
              <div>
                <b>Số phòng đã cho thuê: </b>
                {house.total - house.available}
              </div>
            </div>
          </div>
          <div>
            <div className="app--room-table">
              <div>
                <div className="app--room--banner">
                  <div className="app--room--title">Danh sách phòng</div>
                  <div>
                    <Link className="app--room--btn--add" to="/house/room/add" state={{ houseCode: houseCode }}>
                      <AddIcon />
                      <div>Thêm phòng</div>
                    </Link>
                  </div>
                </div>
              </div>
              <Box sx={{ minWidth: 120, marginTop: "20px", marginBottom: "10px" }}>
                <FormControl sx={{ width: 150 }}>
                  <InputLabel id="demo-simple-select-label">Trạng thái phòng</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roomStatus}
                    label="Trạng thái phòng"
                    onChange={(e) => setRoomStatus(e.target.value)}
                  >
                    <MenuItem value={"EMPTY"}>Còn trống</MenuItem>
                    <MenuItem value={"RENTED"}>Đã cho thuê</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Số thứ tự</StyledTableCell>
                      <StyledTableCell align="left">Mã phòng</StyledTableCell>
                      <StyledTableCell align="left">Tên phòng</StyledTableCell>
                      <StyledTableCell align="left">Vị trí phòng</StyledTableCell>
                      <StyledTableCell align="left">Giá phòng</StyledTableCell>
                      <StyledTableCell align="left">Trạng thái phòng</StyledTableCell>
                      <StyledTableCell align="left">Chức năng</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((room, index) => (
                      <StyledTableRow key={room.code}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">{room.code}</StyledTableCell>
                        <StyledTableCell align="left">{room.name}</StyledTableCell>
                        <StyledTableCell align="left">{room.position}</StyledTableCell>
                        <StyledTableCell align="left">{room.price} VND</StyledTableCell>
                        <StyledTableCell align="left">{statusOfRoom[`${room.status}`]}</StyledTableCell>
                        <StyledTableCell align="left">
                          {room.status === "EMPTY" && (
                            <div className="app--room--action">
                              <div>
                                <Link to="/house/room/update" state={{ room: room, houseCode: houseCode }}>
                                  <UpgradeIcon />
                                </Link>
                              </div>
                              <div
                                onClick={() => {
                                  setRoomCodeDelete(room.code);
                                  setShowDialog(true);
                                }}
                              >
                                <DeleteIcon />
                              </div>
                            </div>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>

                <Stack spacing={2} alignItems={"center"} margin={"10px"}>
                  <Pagination count={house.page.totalPage} color="primary" onChange={(e) => setPage(Number(e.target.innerText) - 1)} />
                </Stack>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
