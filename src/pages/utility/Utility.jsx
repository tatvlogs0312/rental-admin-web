import React, { useEffect, useState } from 'react';
import './Utility.css'
import axios from 'axios';
import { api } from '../../apis/Api';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Utility() {

    const [utilities, setUtilities] = useState([]);

    const [openDelete, setOpenDelete] = useState(false);

    const [codeForDelete, setCodeForDelete] = useState(null);

    useEffect(() => {
        getUltiliy();
    }, []);

    const getUltiliy = () => {
        axios.get(api.UTILITY_FIND_ALL_URL)
            .then(res => setUtilities(res.data))
            .catch(err => console.log(err));
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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    //xóa dịch 
    const deleteUtility = (code) => {
        setOpenDelete(true);
        setCodeForDelete(code);
    }

    const handleClose = (status) => {
        if (status === "yes") {
            axios.delete(api.UTILITY_DELETE_URL, { data: { code: codeForDelete } })
                .then(() => getUltiliy())
                .catch(err => {
                    if (err.response) {
                        console.error('Server error:', err.response.data.message || 'Unknown server error');
                    } else {
                        console.error('Network error:', err);
                    }
                });
        }
        setOpenDelete(false);
        setCodeForDelete(null);

    };

    return (
        <div className='app--utilily'>
            <Dialog
                open={openDelete}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Bạn có muốn xóa dịch vụ này"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Lưu ý: Sau khi bấm xác nhận thì dịch vụ này sẽ bị xóa và chỉ có tạo lại
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose("no")}>Từ chối</Button>
                    <Button onClick={() => handleClose("yes")}>Xác nhận</Button>
                </DialogActions>
            </Dialog>

            <div className='app--utilily--banner'>
                <div className='app--utilily--title'>Danh sách dịch vụ</div>
                <div>
                    <Link className='app--utilily--btn--add' to="/utility/add">
                        <AddIcon />
                        <div>Thêm dịch vụ</div>
                    </Link>
                </div>
            </div>
            <div className='app--list-utility'>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Số thứ tự</StyledTableCell>
                                <StyledTableCell align="left">Mã dịch vụ</StyledTableCell>
                                <StyledTableCell align="left">Tên dịch vụ</StyledTableCell>
                                <StyledTableCell align="left">Giá dịch vụ</StyledTableCell>
                                <StyledTableCell align="left">Chức năng</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {utilities.map((ultility, index) => (
                                <StyledTableRow key={ultility.code}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="left">{ultility.code}</StyledTableCell>
                                    <StyledTableCell align="left">{ultility.name}</StyledTableCell>
                                    <StyledTableCell align="left">{ultility.price}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <div className='app--ultility--action'>
                                            <div>
                                                <Link to="/utility/update" state={{ utility: ultility }}><UpgradeIcon /></Link>
                                            </div>
                                            <div onClick={() => deleteUtility(ultility.code)}><DeleteIcon /></div>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Utility