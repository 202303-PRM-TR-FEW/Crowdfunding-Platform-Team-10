"use client";
import {
  List,
  Card,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import SearchListItem from "./SearchListItem";
const SearchList = ({ searchProjects }) => {
  return (
    <div>
      {" "}
      <Card className="w-96">
        {searchProjects &&
          searchProjects.map((project, i) => {
            return (
              <ListItem key={i}>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt="project.name"
                    src={project.url}
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
        <List>{/* <SearchListItem /> */}</List>
      </Card>
    </div>
  );
};

export default SearchList;
