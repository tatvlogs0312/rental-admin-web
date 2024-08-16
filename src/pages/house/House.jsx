import axios from 'axios';
import './House.css';
import React, { useEffect, useState } from 'react'
import { api } from '../../apis/Api';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function House() {

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios.get(api.HOUSE_GET_ALL_URL)
      .then(res => setHouses(res.data))
      .catch(err => console.log(err));
  }, []);

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

  return (
    <div className='app--house'>
      <div className='app--house--banner'>
        <div className='app--house--title'>Danh sách nhà</div>
        <div>
          <Link className='app--house--btn--add' to="/house/add">
            <AddIcon />
            <div>Thêm nhà</div>
          </Link>
        </div>
      </div>
      <div className='app--list-house'>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Số thứ tự</StyledTableCell>
                <StyledTableCell align="left">Mã nhà</StyledTableCell>
                <StyledTableCell align="left">Địa chỉ nhà</StyledTableCell>
                <StyledTableCell align="left">Chức năng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {houses.map((house, index) => (
                <StyledTableRow key={house.code}>
                  <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{house.code}</StyledTableCell>
                  <StyledTableCell align="left">{house.position}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div className='app--house--action'>
                      <div>
                        <Link to="/house/room" state={{ houseCode: house.code }}>Xem chi tiết</Link>
                      </div>
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

export default House