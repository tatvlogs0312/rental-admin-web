import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HouseIcon from "@mui/icons-material/House";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import "./AppMenu.css";

function AppMenu() {
  const auth = useAuth();

  return (
    <div className="app--menu--detail">
      <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem style={{ textAlign: "center" }}>
            <div className="app--name">w4m</div>
          </MenuItem>

          {/* <Link to="/">
            <MenuItem icon={<HomeOutlinedIcon />}>Trang chủ</MenuItem>
          </Link>

          <Link to="/house">
            <MenuItem icon={<HouseIcon />}>Nhà</MenuItem>
          </Link> */}

          <Link to="/">
            <MenuItem icon={<HomeOutlinedIcon />}>Nhà</MenuItem>
          </Link>

          <SubMenu icon={<HistoryEduIcon />} label="Hợp đồng">
            <Link to="/contract">
              <MenuItem>Danh sách hợp đồng</MenuItem>
            </Link>
            <Link to="/contract/room">
              <MenuItem>Tạo hợp đồng</MenuItem>
            </Link>
          </SubMenu>

          <SubMenu icon={<DescriptionIcon />} label="Hóa đơn">
            <Link to="/bill">
              <MenuItem>Danh sách hóa đơn</MenuItem>
            </Link>
            <Link to="/bill/contracts">
              <MenuItem>Tạo hóa đơn</MenuItem>
            </Link>
          </SubMenu>

          {/* <Link to="">
            <MenuItem icon={<NotificationsIcon />}>Thông báo</MenuItem>
          </Link> */}

          <Link to="/utility">
            <MenuItem icon={<RoomServiceIcon />}>Dịch vụ</MenuItem>
          </Link>

          <MenuItem
            icon={<LogoutIcon />}
            onClick={() => {
              auth.logout();
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default AppMenu;
