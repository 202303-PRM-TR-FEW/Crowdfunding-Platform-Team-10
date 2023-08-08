"use client";
import React from "react";
import {
  Card,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

const SearchList = ({ searchProjects }) => {
  const t = useTranslations("SearchList");
  return (
    <div className="absolute w-full lg:w-[350px] rounded bg-white bg-opacity-90 backdrop-filter backdrop-blur-[20px]">
      {searchProjects && searchProjects.length !== 0 ? (
        searchProjects.map((project, index) => (
          <React.Fragment key={project.id}>
            {index > 0}
            <Link href={`/${project.id}`}>
              <ListItem className="z-50 ">
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    alt={project.name}
                    src={project.url}
                    className="w-12 h-12 object-contain"
                  />
                </ListItemAvatar>
                <div>{project.name}</div>
              </ListItem>
            </Link>
          </React.Fragment>
        ))
      ) : (
        <ListItem className="z-50 ">
          <div>{t("no-matching-result")}</div>
        </ListItem>
      )}
    </div>
  );
};

export default SearchList;
