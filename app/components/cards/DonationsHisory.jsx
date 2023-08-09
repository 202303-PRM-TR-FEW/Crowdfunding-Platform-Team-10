"use client";

import { useAuth } from "@/context/AuthContext";

import LoaderStyle from "../helper/LoaderStyle";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTranslations } from "next-intl";
import { Avatar } from "@mui/material";

export default function DonationsHisory({ projectsDonations }) {
  const { loading } = useAuth();
  const t = useTranslations("Cards")
  function formatTimestamp(timestamp) {
    const now = new Date();
    const date = new Date(timestamp.seconds * 1000);
    const diffMilliseconds = now - date;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return `${t("now")}`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? `${t("min")}`: `${t("mins")}`} ${t("ago")}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? `${t("hour")}` : `${t("hours")}`} ${t("ago")}`;
    } else if (diffDays < 3) {
      return `${diffDays} ${diffDays === 1 ?`${t("day")}` : `${t("days")}`} ${t("ago")}`;
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }
  if (loading || projectsDonations == null) {
    return <LoaderStyle />;
  }
  return (
    <Accordion
      defaultExpanded
      className="border-12  bg-[#ffffffc5]   backdrop-blur-lg  "
      sx={{
        boxShadow: 0,
        backgroundColor: "#ffffffc5",
        "@media (max-width: 600px)": {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        bgcolor="rgba(255, 0, 0, 0.5)"
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3 className="header-4 p-2">{t("don-header")}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <div>
            <List>
              {projectsDonations.length > 0 ? (
                projectsDonations.map((donation, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <div
                        className="hover:bg-[#f0bd0732] hover:rounded w-full"
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
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#888",
                                }}
                              >
                                {donation.timeStamp.seconds !== null
                                  ? formatTimestamp(donation.timeStamp)
                                  : null}
                              </Typography>
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
                <Typography
                  sx={{
                    color: "#888",

                    textAlign: "center",
                  }}
                >
                  {t("message")}
                </Typography>
              )}
            </List>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
