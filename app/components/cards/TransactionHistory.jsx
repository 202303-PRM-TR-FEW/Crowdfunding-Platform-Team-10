import { Fragment, useState } from "react";
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

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    bio: "pe poo pee pi",
    job: "40",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    bio: "Move for it",
    job: "403",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    bio: "Life Sucks",
    job: "500",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    bio: "I support cats",
    job: "30",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    bio: "I think of coding",
    job: "50",
  },
];

export default function TransactionHistory() {
  const [open, setOpen] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
  };
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
 
      <div >
        <Fragment>
          <Accordion open={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="flex justify-between items-center border-y-2 border-y border-blue-gray-900 py-4"
            >
              <Typography variant="h4" className="">
                Transaction history
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open == 1 ? "rotate-90" : ""
                } `}
              />
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
                          All Projects
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Menu open={openMenu} handler={setOpenMenu}>
                          <MenuHandler>
                            <Typography
                              variant="small"
                              className="flex items-center gap-3 text-small tracking-normal bg-transparent shadow-none border-0"
                              {...triggers}
                            >
                              Sort{" "}
                              <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3.5 w-3.5 transition-transform ${
                                  openMenu ? "rotate-180" : ""
                                }`}
                              />
                            </Typography>
                          </MenuHandler>
                          <MenuList {...triggers}>
                            <MenuItem>Menu Item 1</MenuItem>
                            <MenuItem>Menu Item 2</MenuItem>
                            <MenuItem>Menu Item 3</MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                  <tr className="my-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      Today
                    </Typography>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ img, name, bio, job }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr
                        key={name}
                        className="hover:bg-blue-gray-50 hover:rounded"
                      >
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <div className="flex flex-col">
                              <Typography
                                variant="h5"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {bio}
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
                            $ {job}
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
              className="flex justify-between items-center border-y-2 border-y border-blue-gray-900 py-4"
            >
              <Typography variant="h4" className="">
                Statistics
              </Typography>

              <ChevronRightIcon
                strokeWidth={2.5}
                className={`h-5 w-5 transition-transform ${
                  open == 2 ? "rotate-90" : ""
                } `}
              />
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
