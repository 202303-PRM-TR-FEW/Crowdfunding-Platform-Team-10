"use client";
import { useState } from "react";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SearchList from "./search/SearchList";
import { Avatar } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import logo from "../../public/logo.svg";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Container,
} from "@mui/material";
import {
  AccountCircle,
  Dashboard,
  Login,
  Logout,
  Person,
  PersonAdd,
  Settings,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const { user, logout, currentUser } = useAuth();
  const Router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    logout();
    Router.push("/login");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      color="#00c1a2"
    >
      {user ? (
        <div>
          <Link href="/profile">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Projects
            </MenuItem>
          </Link>

          <Link href="/account">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      ) : (
        <Link href="/login">
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      color="#00c1a2"
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href="/projects">
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          All Projects
        </MenuItem>
      </Link>
      {user ? (
        <div>
          <Link href="/profile">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Projects
            </MenuItem>
          </Link>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add New Project
          </MenuItem>
          <Link href="/account">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      ) : (
        <Link href="/login">
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Login fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  return (
    <Container maxWidth="sm">
      <AppBar style={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <Link href="/" sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              noWrap
              component="div"
              sx={{ color: "#00c1a2", display: "flex", alignItems: "center" }}
            >
              <Image src={logo} alt="Logo" width={70} />
              <span className="hidden lg:block">OpenHanded</span>
            </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }} />
          <Box>
            <SearchComponent />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link href="/projects">
              <ListItemIcon>
                <HomeRoundedIcon fontSize="large" sx={{ color: "#00c1a2" }} />
              </ListItemIcon>
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: "#00c1a2" }}
            >
              {currentUser ? (
                <Avatar alt={currentUser.name} src={currentUser.userImg} />
              ) : (
                <AccountCircle fontSize="large" />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{ color: "#00c1a2" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Container>
  );
}

function SearchComponent() {
  const [searchProjects, setSearchProjects] = useState();

  const handleSearch = (e) => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      if (e.target.value !== "") {
        setSearchProjects(
          projectsArr.filter((project) =>
            project.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setSearchProjects();
      }
    });
  };

  const [values, setValues] = useState();
  const handleClick = () => {
    setSearchProjects();
    setValues("");
  };
  return (
    <div className="relative flex w-max mx-2">
      <input
        onChange={handleSearch}
        onClick={() => setValues()}
        type="search"
        label="Search for projects"
        value={values}
        placeholder="Search..."
        className="min-w-[100px] lg:w-[350px] border  rounded-full pr-16 pl-4 py-2 bg-gray-100 text-[#00c1a2] focus:outline-none focus:ring-1 focus:ring-[#00c1a2] shadow-sm"
      />
      <div
        onClick={handleClick}
        className={`${
          !searchProjects ? "hidden" : "flex"
        } absolute top-12 w-full`}
      >
        <SearchList searchProjects={searchProjects} />
      </div>
      {/* Search Icon */}
      <div className="flex items-center">
        <div className="absolute right-2">
          <div className="bg-[#00c1a2] py-1 px-4 rounded-full">
            <svg
              className="h-5 w-5 text-white pointer-events-none"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* White Icon Lines */}
              <path d="M22 22l-6-6" />
              <circle cx="10" cy="10" r="7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
