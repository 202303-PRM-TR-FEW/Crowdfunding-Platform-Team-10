"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

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

import { Avatar, Divider } from "@mui/material";

export default function TransactionHistory({ usersProjects }) {
  const [donate, setDonate] = useState([]);
  const { loading, projects } = useAuth();
  const [selectedProject, setSelectedProject] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "donations"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let donationsArr = [];
      QuerySnapshot.forEach((doc) => {
        donationsArr.push({ ...doc.data(), id: doc.id });
      });
      setDonations(donationsArr);
    });
    return () => unsubscribe();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  if (loading) {
    return <LoaderStyle />;
  }

  return (
    <Accordion defaultExpanded className="shadow-lg">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3 className="header-4 p-2">Transaction History</h3>
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
            </div>
          </div>
          <div>
            <List>
              {donate.length > 0 ? (
                donate.map((donation, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <div
                        className="hover:bg-[#f0bd0732] hover:rounded w-full"
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
                              <Typography>{donation.projectName}</Typography>
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
                <div className="text-center">No Donations Found</div>
              )}
            </List>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
