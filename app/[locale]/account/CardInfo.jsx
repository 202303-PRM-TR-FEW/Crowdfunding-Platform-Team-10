import React from "react";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { Avatar, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { ListItemIcon } from "@mui/material";
export default function CardInfo({
  currentUser,
  handleEditUser,
  formatTimestamp,
}) {
  return (
    <div className="lg:py-60 py-32">
      <div
        className="container mx-auto lg:max-w-6xl flex items-center lg:justify-start  justify-center lg:text-left text-center
  flex-col lg:flex-row bg-[#ffffff52]  p-10 rounded-lg backdrop-blur-lg  shadow-sm"
      >
        {currentUser ? (
          <>
            <div className="">
              <Avatar
                alt={currentUser.name}
                src={currentUser.userImg}
                sx={{ width: 250, height: 250 }}
              />
            </div>
            <div className="p-5 ">
              <div className="top-5 right-5 z-50 fixed">
                <Fab
                  onClick={handleEditUser}
                  color="secondary"
                  aria-label="edit"
                  size="medium"
                  sx={{
                    backgroundColor: "#fff",
                    "&:hover": {
                      backgroundColor: "#0d816e",
                    },
                  }}
                >
                  <EditIcon
                    sx={{
                      color: "#0d816e",
                      "&:hover": {
                        color: "#fff",
                      },
                    }}
                  />
                </Fab>
              </div>
              <h2 className="header-2 color-green mb-10 ml-0" colSpan={2}>
                {currentUser.name}
              </h2>

              <div className="grid lg:grid-cols-2 gap-4">
                <li className="color-grey flex items-center">
                  <ListItemIcon>
                    <MailOutlineRoundedIcon fontSize="large" />
                  </ListItemIcon>
                  {currentUser.email}
                </li>
                <li className="color-grey flex items-center">
                  <ListItemIcon>
                    <FmdGoodOutlinedIcon fontSize="large" />
                  </ListItemIcon>
                  {currentUser.country}
                </li>
                <li className="color-grey flex items-center">
                  <ListItemIcon>
                    <AutoAwesomeOutlinedIcon fontSize="large" />
                  </ListItemIcon>
                  {currentUser.bio}
                </li>
                <li className="color-grey flex items-center">
                  <ListItemIcon>
                    <AccessTimeRoundedIcon fontSize="large" />
                  </ListItemIcon>
                  {currentUser.timeStamp ? (
                    `Joined since: ${formatTimestamp(currentUser.timeStamp)}`
                  ) : (
                    <LoaderStyle />
                  )}
                </li>
              </div>
            </div>
          </>
        ) : (
          <LoaderStyle />
        )}
      </div>
    </div>
  );
}
