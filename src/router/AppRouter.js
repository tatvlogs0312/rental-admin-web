import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import House from "../pages/house/House";
import Room from "../pages/room/Room";
import HouseAdd from "../pages/house/add/HouseAdd";
import Contract from "../pages/contract/Contract";
import Utility from "../pages/utility/Utility";
import UtilityUpdate from "../pages/utility/update/UtilityUpdate";
import UtilityAdd from "../pages/utility/add/UtilityAdd";
import P404 from "../pages/404/P404";
import Login from "../pages/login/Login";
import RoomAdd from "../pages/room/add/RoomAdd";
import RoomUpdate from "../pages/room/update/RoomUpdate";
import ListRoom from "../pages/contract/rooms/ListRoom";
import ContractCreate from "../pages/contract/create/ContractCreate";
import ContractDetail from "../pages/contract/detail/ContractDetail";
import Bill from "../pages/bill/Bill";
import BillCreate from "../pages/bill/create/BillCreate";
import ContractList from "../pages/bill/contract/ContractList";
import { AuthProvider } from "../auth/Auth";
import { RequiredAuth } from "../auth/RequiredAuth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<House />} />
            {/* <Route path="/house" element={<House />} /> */}
            <Route path="/house/add" element={<HouseAdd />} />
            <Route path="/house/room" element={<Room />} />
            <Route path="/house/room/add" element={<RoomAdd />} />
            <Route path="/house/room/update" element={<RoomUpdate />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/contract/room" element={<ListRoom />} />
            <Route path="/contract/create" element={<ContractCreate />} />
            <Route path="/contract/detail" element={<ContractDetail />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/bill/contracts" element={<ContractList />} />
            <Route path="/bill/create" element={<BillCreate />} />
            <Route path="/utility" element={<Utility />} />
            <Route path="/utility/update" element={<UtilityUpdate />} />
            <Route path="/utility/add" element={<UtilityAdd />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<P404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;
