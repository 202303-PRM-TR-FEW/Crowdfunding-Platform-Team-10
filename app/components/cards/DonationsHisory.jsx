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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Avatar } from "@mui/material";

export default function DonationsHisory({ usersProjects }) {
  const [donate, setDonate] = useState([]);
  const { loading, donations, projects } = useAuth();
  const [selectedProject, setSelectedProject] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

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

  if (loading) {
    return <LoaderStyle />;
  }

  return (
    <Accordion
      defaultExpanded
      className="border-12  bg-[#00c1a113]   backdrop-blur-lg "
      sx={{ boxShadow: 2, backgroundColor: "#00c1a113" }}
      bgcolor="transparent"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        bgcolor="rgba(255, 0, 0, 0.5)"
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3 className="header-4 p-2">Donaions History</h3>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <div>
            <List>
              {donate.length > 0 ? (
                donate.map((donation, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <div
                        className="hover:bg-white hover:rounded w-full"
                        key={donation.id}
                      >
                        <div className="flex gap-2 p-2 items-center   justify-between">
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
                <div className="text-center">No Donations yet</div>
              )}
            </List>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
