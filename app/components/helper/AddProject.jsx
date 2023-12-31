"use client";
import React, { useState } from "react";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/context/AuthContext";
import ProjectForm from "../forms/ProjectForm";
import { useTranslations } from "next-intl";

export default function AddProject() {
  const { user } = useAuth();
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const t = useTranslations("AddProject");
  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };
  return (
    <div>
      {user ? (
        <>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <div className="fixed  bottom-10 right-8 z-50 ">
              <Fab
                color="primary"
                aria-label="add"
                size="medium"
                variant="extended"
                sx={{
                  backgroundColor: "#00c1a2",
                  "&:hover": {
                    backgroundColor: "#0d816e",
                  },
                  color: "white",
                }}
                onClick={handleNewProject}
              >
                <AddIcon sx={{ mr: 1, color: "white" }} />
                {t("button")}
              </Fab>
            </div>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <div className="fixed  bottom-5 right-5 z-50 ">
              <Fab
                color="primary"
                aria-label="add"
                size="medium"
                sx={{
                  backgroundColor: "#00c1a2",
                  "&:hover": {
                    backgroundColor: "#0d816e",
                  },
                  color: "white",
                }}
                onClick={handleNewProject}
              >
                <AddIcon />
              </Fab>
            </div>
          </Box>
          <ProjectForm
            authUser={user}
            openProjectForm={openProjectForm}
            setOpenProjectForm={setOpenProjectForm}
          />
        </>
      ) : null}
    </div>
  );
}
