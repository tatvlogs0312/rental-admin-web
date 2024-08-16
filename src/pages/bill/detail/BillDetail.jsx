import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { Table } from "reactstrap";

function BillDetail(props) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Dialog open={props.open} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Chi tiết hóa đơn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">STT</StyledTableCell>
                    <StyledTableCell align="left">Dịch vụ</StyledTableCell>
                    <StyledTableCell align="left">Số lượng sử dụng</StyledTableCell>
                    <StyledTableCell align="left">Số tiền phải trả</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.item &&
                    props.item.billDetails.map((b, i) => (
                      <StyledTableRow key={b.id}>
                        <StyledTableCell component="th" scope="row">
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell align="left">{b.code}</StyledTableCell>
                        <StyledTableCell align="left">{b.numberUse}</StyledTableCell>
                        <StyledTableCell align="left">{b.totalPrice}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()}>Đóng</Button>
          {props.item.status === "PENDING" && <Button onClick={() => props.handlePayment()}>Thanh toán</Button>}
        </DialogActions>
      </Dialog>
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

export default BillDetail;
