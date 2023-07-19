"use client";
import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/context/AuthContext";
import ProjectForm from "../forms/ProjectForm";

export default function AddProject() {
  const { user } = useAuth();
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };
  return (
    <div>
      {user ? (
        <>
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
              }}
              onClick={handleNewProject}
            >
              <AddIcon />
            </Fab>
          </div>
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
