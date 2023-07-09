"use client";
import React from "react";
import { List, Card, ListItem, ListItemPrefix, Avatar, Typography } from "@material-tailwind/react";

const SearchList = ({ searchProjects }) => {
  return (
    <div>
      <Card className="w-96">
        {searchProjects &&
          searchProjects.map((project, i) => {
            return (
              <ListItem key={i}>
                <ListItemPrefix >
                  <Avatar
                    variant="circular"
                    alt={project.name}
                    src={project.url}
                    className="rounded w-12 h-12"
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {project.name}
                  </Typography>
                </div>
              </ListItem>
            );
          })}
      </Card>
    </div>
  );
};

export default SearchList;
