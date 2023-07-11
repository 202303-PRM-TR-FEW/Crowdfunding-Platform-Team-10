"use client";
import React from "react";
import {
  Card,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

const SearchList = ({ searchProjects }) => {
  return (
    <div>
      <Card className="absolute w-full lg:w-[350px] rounded">
        {` `}
        {searchProjects &&
          searchProjects.map((project) => {
            return (
              <Link key={project.id} href={`/${project.id}`}>
                <ListItem className="z-50 ">
                  <ListItemPrefix>
                    <Avatar
                      variant="rounded"
                      alt={project.name}
                      src={project.url}
                      className=" w-12 h-12 object-contain "
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {project.name}
                    </Typography>
                  </div>
                </ListItem>
              </Link>
            );
          })}
      </Card>
    </div>
  );
};

export default SearchList;
