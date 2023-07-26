"use client";

import { Fragment, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
// import {
//   Typography,
//   Button,
//   Avatar,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";
// import { ChevronRightIcon } from "@heroicons/react/24/outline";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LoaderStyle from "../helper/LoaderStyle";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Divider } from "@mui/material";

export default function TransactionHistory({ usersProjects }) {
  // const [open, setOpen] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const [donate, setDonate] = useState([]);
  const { loading, donations, projects } = useAuth();
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    if (!loading) {
      let filteredDonations = donations.filter((donation) =>
        usersProjects.some((project) => project.id === donation.projectId)
      );
      if (selectedProject) {
        filteredDonations = filteredDonations.filter(
          (donation) => donation.projectId === selectedProject
        );
      }
      setDonate(filteredDonations);
    }
  }, [donations, selectedProject, loading, usersProjects]);
  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };
  console.log(donate);

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  };

  const handleOpen = (value) => {
    setOpen((prevOpen) => (prevOpen === value ? 0 : value));
  };

  if (loading) {
    return <LoaderStyle />;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Transaction History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Select Project
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => handleProjectSelect("")}>
                    All Projects
                  </MenuItem>
                  <Divider />
                  {usersProjects.map((project) => (
                    <MenuItem
                      key={project?.id}
                      onClick={() => handleProjectSelect(project?.id)}
                    >
                      {project?.name}
                    </MenuItem>
                  ))}
                </Menu>
                {/* <MenuItem onClick={() => handleProjectSelect("")}>
                            All projects
                          </MenuItem>
                          {usersProjects.map((project) => (
                            <MenuItem
                              key={project?.id}
                              onClick={() => handleProjectSelect(project?.id)}
                            >
                              {project?.name}
                            </MenuItem>
                          ))} */}
              </div>
            </div>
            <div>
              <List>
                {donate.length > 0 ? (
                  donate.map((donation, index) => {
                    // const isLast = index === donate.length - 1;
                    // const classes = isLast
                    //   ? "p-4"
                    //   : "p-4 border-b border-blue-gray-50";

                    return (
                      <ListItem disablePadding>
                        <div
                          className="hover:bg-blue-gray-50 hover:rounded w-full"
                          key={donation.id}
                        >
                          <div className="flex gap-2 items-center p-2 justify-between">
                            <div className="flex gap-2  items-center ">
                              <Avatar
                                src={donation.userImg}
                                alt={donation.userName}
                              />
                              <div className="flex flex-col">
                                <Typography variant="h6">
                                  {donation.userName}
                                </Typography>
                                <Typography>Bio</Typography>
                              </div>
                            </div>
                            <div className="">
                              <Typography>{donation.donaiton} $</Typography>
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    );
                  })
                ) : (
                  <div className="text-center">
                    No Donations Found For This Project
                  </div>
                )}

                {/* <Avatar
                    variant="rounded"
                    className="w-12 h-12 object-contain"
                    src={donate[0].userImg}
                    alt={donate[0].userName}
                  />
                  <div>asdasdasd</div> */}
              </List>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <Fragment>
        <Accordion open={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-y-2  border-blue-gray-900 py-4"
          >
            <div className="flex items-center justify-between w-full">
              <Typography variant="h4" className="">
                Transaction history
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open === 1 ? "rotate-90" : ""
                } `}
              />
            </div>
          </AccordionHeader>
          <AccordionBody>
            <table className="w-full min-w-max table-auto text-left ">
              <thead className="p-4">
                <tr className="my-2">
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        Projects
                      </Typography>
                      <Menu open={openMenu} handler={setOpenMenu}>
                        <MenuHandler>
                          <Typography
                            variant="small"
                            className="flex items-center gap-3 text-small tracking-normal bg-transparent shadow-none border-0"
                            {...triggers}
                          >
                            Select Project{" "}
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`h-3.5 w-3.5 transition-transform ${
                                openMenu ? "rotate-180" : ""
                              }`}
                            />
                          </Typography>
                        </MenuHandler>
                        <MenuList {...triggers}>
                          <MenuItem onClick={() => handleProjectSelect("")}>
                            All projects
                          </MenuItem>
                          {usersProjects.map((project) => (
                            <MenuItem
                              key={project?.id}
                              onClick={() => handleProjectSelect(project?.id)}
                            >
                              {project?.name}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {donate.map((donation, index) => {
                  const isLast = index === donate.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      className="hover:bg-blue-gray-50 hover:rounded"
                      key={donation.id}
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={donation.userImg}
                            alt={donation.userName}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {donation.userName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              HERE IS BIO
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-bold "
                        >
                          {donation.donaiton}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button
              variant="outlined"
              fullWidth
              color="blue-gray"
              className="font-bold my-2 hover blue-gray-900 border-blue-gray-900"
            >
              View More
            </Button>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="flex justify-between items-center border-y-2  w-full   border-blue-gray-900 py-4"
          >
            <div className="flex items-center justify-between w-full">
              <Typography variant="h4" className="">
                Statistics
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open === 2 ? "rotate-90" : ""
                } `}
              />
            </div>
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </Fragment> */}
    </div>
  );
}
