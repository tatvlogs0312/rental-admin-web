import React, { useEffect, useState } from "react";
import "./ContractList.css";
import { api } from "../../../apis/Api";
import axios from "axios";
import {
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  styled,
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
import { Link } from "react-router-dom";

function ContractList() {
  const [houseCode, setHouseCode] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [contractCode, setContractCode] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [constacts, setContracts] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    callApiSearch();
  }, []);

  const callApiSearch = () => {
    axios
      .post(api.SEARCH_CONTRACT_URL, {
        houseCode: houseCode,
        roomCode: roomCode,
        contractCode: contractCode,
        identityNumber: "",
        fullName: "",
        status: "EFFECTIVE",
        page: page,
        size: size,
      })
      .then((res) => {
        setContracts(res.data.contracts);
        setPageInfo(res.data.page);
      })
      .catch();
  };

  return (
    <div className="app--bill--contracts">
      <div>
        <Typography variant="h3" component="h2" marginBottom={"50px"}>
          Danh sách phòng
        </Typography>
      </div>
      <div>
        <div>
          <Grid
            container
            spacing={3}
            rowSpacing={3}
            maxWidth={"1000px"}
            alignItems={"flex-end"}
          >
            <Grid item xs={3}>
              <TextField
                label="Mã nhà"
                onChange={(e) => setHouseCode(e.target.value)}
                value={houseCode}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Mã phòng"
                onChange={(e) => setRoomCode(e.target.value)}
                value={roomCode}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Mã hợp đồng"
                onChange={(e) => setContractCode(e.target.value)}
                value={contractCode}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => callApiSearch()}
                style={{ float: "right" }}
              >
                Tìm kiếm
              </Button>
            </Grid>
          </Grid>
        </div>
        <div>
          <div style={{ marginTop: "50px" }}>
            {
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Số thứ tự</StyledTableCell>
                      <StyledTableCell align="left">Nhà</StyledTableCell>
                      <StyledTableCell align="left">Phòng</StyledTableCell>
                      <StyledTableCell align="left">Hợp đồng</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {constacts.length > 0 &&
                      constacts.map((c, i) => (
                        <StyledTableRow key={c.id}>
                          <StyledTableCell component="th" scope="row">
                            {i + 1}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {c.houseCode}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {c.roomCode}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {c.contractCode}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Link
                              to={"/bill/create"}
                              state={{
                                contractCode: c.contractCode,
                              }}
                            >
                              Tạo hóa đơn
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>

                {pageInfo && (
                  <Stack spacing={2} alignItems={"center"} margin={"20px"}>
                    <Pagination
                      page={page + 1}
                      count={pageInfo.totalPage}
                      color="primary"
                      onChange={(e) => setPage(Number(e.target.innerText) - 1)}
                    />
                  </Stack>
                )}
              </TableContainer>
            }
          </div>
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

export default ContractList;
