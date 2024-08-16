import {
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../../apis/Api";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./ListRoom.css";

function ListRoom() {
  const [houseCode, setHouseCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("EMPTY");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    callApiSearch();
  }, [page]);

  const callApiSearch = () => {
    axios
      .post(api.ROOM_SEARCH_URL, {
        houseCode: houseCode,
        roomCode: roomCode,
        status: status,
        page: page,
        size: size,
      })
      .then((res) => setRoomData(res.data))
      .catch((err) => console.log(err));
  };

  const reset = () => {
    setPage(0);
    setHouseCode("");
    setRoomCode("");
  };

  const search = () => {
    setPage(0);
    callApiSearch();
  };

  return (
    <div className="app--room--list">
      <div>
        <Typography variant="h3" component="h2" marginBottom={"50px"}>
          Danh sách phòng
        </Typography>
      </div>
      <div>
        <div>
          <Grid container spacing={3} rowSpacing={3} maxWidth={"1000px"} alignItems={"end"}>
            <Grid item xs={3}>
              <TextField label="Mã phòng" onChange={(e) => setRoomCode(e.target.value)} value={roomCode} />
            </Grid>
            <Grid item xs={3}>
              <TextField label="Mã nhà" onChange={(e) => setHouseCode(e.target.value)} value={houseCode} />
            </Grid>

            <Grid item xs={2}>
              <Button variant="outlined" size="large" onClick={() => search()} fullWidth>
                Tìm kiếm
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" size="large" onClick={() => reset()} fullWidth>
                Làm mới
              </Button>
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: "20px" }}>
          {roomData && (
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Số thứ tự</StyledTableCell>
                    <StyledTableCell align="left">Mã phòng</StyledTableCell>
                    <StyledTableCell align="left">Mã nhà</StyledTableCell>
                    <StyledTableCell align="left">Tên phòng</StyledTableCell>
                    <StyledTableCell align="left">Vị trí</StyledTableCell>
                    <StyledTableCell align="left">Giá phòng</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomData.roomData.map((c, i) => (
                    <StyledTableRow key={c.id}>
                      <StyledTableCell component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>
                      <StyledTableCell align="left">{c.code}</StyledTableCell>
                      <StyledTableCell align="left">{c.houseCode}</StyledTableCell>
                      <StyledTableCell align="left">{c.name}</StyledTableCell>
                      <StyledTableCell align="left">{c.position}</StyledTableCell>
                      <StyledTableCell align="left">{c.price}</StyledTableCell>
                      <StyledTableCell align="left">
                        <Link to={"/contract/create"} state={{ roomCode: c.code }}>
                          Tạo hợp đồng
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>

              <Stack spacing={2} alignItems={"center"} margin={"10px"}>
                <Pagination page={page + 1} count={roomData.page.totalPage} color="primary" onChange={(e) => setPage(Number(e.target.innerText) - 1)} />
              </Stack>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

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

export default ListRoom;
