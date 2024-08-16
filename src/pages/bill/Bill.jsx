import React, { useEffect, useState } from "react";
import "./Bill.css";
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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BillDetail from "./detail/BillDetail";
import "./Bill.css";
import { toast } from "react-toastify";

function Bill() {
  const d = new Date();

  const [status, setStatus] = useState("PENDING");
  const [month, setMonth] = useState(d.getMonth());
  const [year, setYear] = useState(d.getFullYear());
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [data, setData] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    callApiGetBill();
  }, []);

  const callApiGetBill = () => {
    axios
      .post(api.BILL_SEARCH_URL, {
        status: status,
        month: month,
        year: year,
        page: page,
        size: size,
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const callApiPayment = (billId) => {
    axios
      .post(api.BILL_PAYMENT_URL, {
        billId: billId,
      })
      .then(
        res => {
          toast.success("Thanh toán hóa đơn thành công");
          callApiGetBill();
        }
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="app--bill--search">
      {data && (
        <div>
          <div>
            <Typography variant="h3" component="h2" marginBottom={"50px"}>
              Danh sách hợp đồng
            </Typography>
            <div>
              <div className="app--control--search--contract">
                <Grid container spacing={3} rowSpacing={3} maxWidth={"1000px"} alignItems={"center"}>
                  <Grid item xs={3}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Trạng thái"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value={"PENDING"}>Chờ thanh toán</MenuItem>
                        <MenuItem value={"PAID"}>Đã thanh toán</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        label="Trạng thái"
                        onChange={(e) => setMonth(e.target.value)}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        label="Trạng thái"
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <MenuItem value={year - 2}>{year - 2}</MenuItem>
                        <MenuItem value={year - 1}>{year - 1}</MenuItem>
                        <MenuItem value={year}>{year}</MenuItem>
                        <MenuItem value={year + 1}>{year + 1}</MenuItem>
                        <MenuItem value={year + 2}>{year + 2}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <Button variant="outlined" size="large" onClick={() => callApiGetBill()}>
                      Tìm kiếm
                    </Button>
                  </Grid>
                </Grid>
              </div>

              <div style={{ marginTop: "50px" }}>
                {
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Số thứ tự</StyledTableCell>
                          <StyledTableCell align="left">Phòng</StyledTableCell>
                          <StyledTableCell align="left">Tháng</StyledTableCell>
                          <StyledTableCell align="left">Số tiền</StyledTableCell>
                          <StyledTableCell align="left">Trạng thái</StyledTableCell>
                          <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.bills &&
                          data.bills.map((b, i) => (
                            <StyledTableRow key={b.id}>
                              <StyledTableCell component="th" scope="row">
                                {i + 1}
                              </StyledTableCell>
                              <StyledTableCell align="left">{b.roomName}</StyledTableCell>
                              <StyledTableCell align="left">{b.month + "/" + b.year}</StyledTableCell>
                              <StyledTableCell align="left">{b.total}</StyledTableCell>
                              <StyledTableCell align="left">{b.status}</StyledTableCell>
                              <StyledTableCell align="left">
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    setItemSelected(b);
                                    setOpen(true);
                                  }}
                                >
                                  <VisibilityIcon />
                                </div>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>

                    {data.page && (
                      <Stack spacing={2} alignItems={"center"} margin={"10px"}>
                        <Pagination page={page + 1} count={data.page.totalPage} color="primary" onChange={(e) => setPage(Number(e.target.innerText) - 1)} />
                      </Stack>
                    )}
                  </TableContainer>
                }
              </div>

              <div>
                {itemSelected && (
                  <BillDetail
                    open={open}
                    handleClose={() => {
                      setOpen(false);
                      setItemSelected(null);
                    }}
                    handlePayment={() => {
                      callApiPayment(itemSelected.id);
                      setItemSelected(null);
                    }}
                    item={itemSelected}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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

export default Bill;
