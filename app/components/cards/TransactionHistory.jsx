import { Fragment, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Typography,
  Button,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import LoaderStyle from "../helper/LoaderStyle";


export default function TransactionHistory({ oneProjectInfo, usersProjects }) {
  const [open, setOpen] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const [donate, setDonate] = useState([]);
  const { loading, donations, projects  } = useAuth();
  const [selectedProject, setSelectedProject] = useState("");
 
  useEffect(() => {
    const updateSetDonate = () => {
      const filteredDonations = donations.filter(
        (donation) => donation.projectId === selectedProject
      );
      setDonate(filteredDonations);
    };

    updateSetDonate();
  }, [donations, selectedProject]);
  console.log(donate);
  console.log(donations);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  };
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  if (loading) {
    return <LoaderStyle />;
  }

  console.log(projects);

  return (
    <div>
      <Fragment>
        <Accordion open={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-y-2  border-blue-gray-900 py-4"
          >
            <div className="flex items-center justify-between w-full">
              <Typography variant="h4" className="">
                Transaction history
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open == 1 ? "rotate-90" : ""
                } `}
              />
            </div>
          </AccordionHeader>
          <AccordionBody>
            <table className="w-full min-w-max table-auto text-left ">
              <thead className="p-4">
                <tr className="my-2">
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        Projects
                      </Typography>
                      <Menu open={openMenu} handler={setOpenMenu}>
                        <MenuHandler>
                          <Typography
                            variant="small"
                            className="flex items-center gap-3 text-small tracking-normal bg-transparent shadow-none border-0"
                            {...triggers}
                          >
                            Select Project{" "}
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`h-3.5 w-3.5 transition-transform ${
                                openMenu ? "rotate-180" : ""
                              }`}
                            />
                          </Typography>
                        </MenuHandler>
                        <MenuList {...triggers}>
                          {usersProjects.map((project) => (
                            <MenuItem
                              key={project?.id}
                              onClick={() => handleProjectSelect(project?.id)}
                            >
                              {project?.name}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {donate?.map((donate, index) => {
                  const isLast = index === donate.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      className="hover:bg-blue-gray-50 hover:rounded"
                      key={donate.id}
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={donate.userImg}
                            alt={donate.userName}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {donate.userName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              HERE IS BIO
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="font-bold "
                        >
                          {donate.donaiton}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button
              variant="outlined"
              fullWidth
              color="blue-gray"
              className="font-bold my-2 hover blue-gray-900 border-blue-gray-900"
            >
              View More
            </Button>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="flex justify-between items-center border-y-2  w-full   border-blue-gray-900 py-4"
          >
            <div className="flex items-center justify-between w-full">
              <Typography variant="h4" className="">
                Statistics
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open == 2 ? "rotate-90" : ""
                } `}
              />
            </div>
          </AccordionHeader>
          <AccordionBody>
            We&apos;re not always in the position that we want to be at.
            We&apos;re constantly growing. We&apos;re constantly making
            mistakes. We&apos;re constantly trying to express ourselves and
            actualize our dreams.
          </AccordionBody>
        </Accordion>
      </Fragment>
    </div>
  );
}
