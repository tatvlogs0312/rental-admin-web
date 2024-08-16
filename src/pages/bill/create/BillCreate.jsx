import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../apis/Api";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UtilityDialog from "./utilityDialog/UtilityDialog";
import "./BillCreate.css";
import { toast } from "react-toastify";

function BillCreate() {
  const d = new Date();

  const location = useLocation();

  const navigate = useNavigate();

  const [contractCode, setContractCode] = useState(location.state.contractCode);
  const [month, setMonth] = useState(d.getMonth());
  const [year, setYear] = useState(d.getFullYear());
  const [isContinueRent, setIsContinueRent] = useState(true);
  const [details, setDetails] = useState([]);

  const [utilities, setUtilities] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(api.UTILITY_FIND_ALL_URL)
      .then((res) => setUtilities(res.data))
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, []);

  const addUtility = (utility) => {
    details.push(utility);
    setDetails(details);
    setOpen(false);
  };

  const handleDelete = (code) => {
    var newList = details.filter((d) => d.utilityCode !== code);
    setDetails(newList);
  };

  const apiCreateBill = () => {
    axios
      .post(api.BILL_CREATE_URL, {
        contractCode: contractCode,
        month: month,
        year: year,
        isContinueRent: isContinueRent,
        details: details,
      })
      .then((res) => {
        navigate("/bill");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="app--create--bill">
      <div>
        <div>
          <Typography variant="h3" component="h2" marginBottom={"50px"}>
            Tạo hóa đơn
          </Typography>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <div>
              <FormControl style={{ width: "100px", marginRight: "20px" }}>
                <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={month} label="Trạng thái" onChange={(e) => setMonth(e.target.value)}>
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
              <FormControl style={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={year} label="Trạng thái" onChange={(e) => setYear(e.target.value)}>
                  <MenuItem value={year - 2}>{year - 2}</MenuItem>
                  <MenuItem value={year - 1}>{year - 1}</MenuItem>
                  <MenuItem value={year}>{year}</MenuItem>
                  <MenuItem value={year + 1}>{year + 1}</MenuItem>
                  <MenuItem value={year + 2}>{year + 2}</MenuItem>
                </Select>
              </FormControl>
              <div>
                <Checkbox checked={isContinueRent} onChange={() => setIsContinueRent(!isContinueRent)} />
                Tiếp tục hợp đồng
              </div>
            </div>
            <div>
              <Button variant="outlined" size="medium" onClick={() => setOpen(true)}>
                Thêm dịch vụ
              </Button>
            </div>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow key={1}>
                    <StyledTableCell>Số thứ tự</StyledTableCell>
                    <StyledTableCell align="left">Dịch vụ</StyledTableCell>
                    <StyledTableCell align="left">Số lượng</StyledTableCell>
                    <StyledTableCell align="left">Số tiền</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.length > 0 &&
                    details.map((d, i) => (
                      <StyledTableRow key={d.id}>
                        <StyledTableCell component="th" scope="row">
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">{d.utilityCode}</StyledTableCell>
                        <StyledTableCell align="left">{d.numberUse}</StyledTableCell>
                        <StyledTableCell align="left">{Number(d.numberUse) * Number(d.price.split("/")[0])}</StyledTableCell>
                        <StyledTableCell align="left">
                          <Button onClick={() => handleDelete(d.utilityCode)}>Xóa</Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outlined" size="large" onClick={() => apiCreateBill()}>
              Tạo hóa đơn
            </Button>
          </div>
        </div>
      </div>

      <div>
        {utilities.length > 0 && (
          <UtilityDialog
            open={open}
            handleClose={() => {
              setOpen(false);
            }}
            handleAdd={addUtility}
            utilities={utilities}
            utility={utilities[0]}
          />
        )}
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

export default BillCreate;
