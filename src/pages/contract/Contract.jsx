import React, { useEffect, useState } from "react";
import "./Contract.css";
import axios from "axios";
import { api } from "../../apis/Api";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
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
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Contract() {
  const [houseCode, setHouseCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [contractData, setContractData] = useState({});

  useEffect(() => {
    getContracts();
  }, [page]);

  const getContracts = () => {
    axios
      .post(api.SEARCH_CONTRACT_URL, {
        houseCode: houseCode,
        roomCode: roomCode,
        identityNumber: identityNumber,
        fullName: fullName,
        status: status,
        page: Number(page),
        size: Number(size),
      })
      .then((res) => setContractData(res.data))
      .catch((err) => console.log(err));
  };

  const search = () => {
    setPage(0);
    getContracts();
  };

  const reset = () => {
    setPage(0);
    setHouseCode("");
    setRoomCode("");
    setIdentityNumber("");
    setFullName("");
    setStatus("ALL");
    getContracts();
  };

  return (
    <div className="app--contract--list">
      {contractData && (
        <div>
          <Typography variant="h3" component="h2" marginBottom={"50px"}>
            Danh sách hợp đồng
          </Typography>
          <div>
            <div className="app--control--search--contract">
              <Grid container spacing={3} rowSpacing={3} maxWidth={"1000px"}>
                <Grid item xs={3}>
                  <TextField label="Mã phòng" onChange={(e) => setRoomCode(e.target.value)} value={roomCode} />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Mã nhà" onChange={(e) => setHouseCode(e.target.value)} value={houseCode} />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Số CMND/CCCD" onChange={(e) => setIdentityNumber(e.target.value)} value={identityNumber} />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Họ Tên" onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </Grid>
                <Grid item xs={3}>
                  <FormControl style={{ width: "200px" }}>
                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng thái"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value={"ALL"}>Tất cả</MenuItem>
                      <MenuItem value={"DRAFT"}>Nháp</MenuItem>
                      <MenuItem value={"EXPIRE"}>Hết hiệu lực</MenuItem>
                      <MenuItem value={"EFFECTIVE"}>Có hiệu lực</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <Button variant="outlined" size="large" onClick={() => search()}>
                    Tìm kiếm
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" size="large" onClick={() => reset()}>
                    Làm mới
                  </Button>
                </Grid>
              </Grid>
            </div>

            <div style={{ marginTop: "50px" }}>
              {contractData.contracts && (
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Số thứ tự</StyledTableCell>
                        <StyledTableCell align="left">Mã hợp đồng</StyledTableCell>
                        <StyledTableCell align="left">Mã nhà</StyledTableCell>
                        <StyledTableCell align="left">Mã phòng</StyledTableCell>
                        <StyledTableCell align="left">Họ tên</StyledTableCell>
                        <StyledTableCell align="left">Số CCCD/CMND</StyledTableCell>
                        <StyledTableCell align="left">Trạng thái</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contractData.contracts.map((c, i) => (
                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {i + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left">{c.contractCode}</StyledTableCell>
                          <StyledTableCell align="left">{c.houseCode}</StyledTableCell>
                          <StyledTableCell align="left">{c.roomCode}</StyledTableCell>
                          <StyledTableCell align="left">{c.fullName}</StyledTableCell>
                          <StyledTableCell align="left">{c.identityNumber}</StyledTableCell>
                          <StyledTableCell align="left">{statusOfContract[c.status] || "Không xác định"}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Link to={"/contract/detail"} state={{ contractCode: c.contractCode }}>
                              Xem chi tiết
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {contractData.page && (
                    <Stack spacing={2} alignItems={"center"} margin={"10px"}>
                      <Pagination
                        page={page + 1}
                        count={contractData.page.totalPage}
                        color="primary"
                        onChange={(e) => setPage(Number(e.target.innerText) - 1)}
                      />
                    </Stack>
                  )}
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const statusOfContract = {
  DRAFT: "Nháp",
  EXPIRE: "Hết hiệu lực",
  EFFECTIVE: "Hiệu lực",
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

export default Contract;
