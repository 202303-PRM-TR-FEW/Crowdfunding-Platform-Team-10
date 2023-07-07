"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";
import SearchList from "./search/SearchList";
export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-40">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-lg"
      >
        <Link href="/" className="flex items-center text-white">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-lg"
      >
        <Link href="/projects" className="flex items-center text-white">
          Projects
        </Link>
      </Typography>
      {user ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link
            variant="gradient"
            href="/login"
            size="sm"
            className="hidden lg:inline-block bg-orange-500 text-white px-4 py-2 rounded text-lg"
          >
            <span>Login</span>
          </Link>
        </>
      )}
    </ul>
  );
  //
  const [searchProjects, setSearchProjects] = useState();
  const handleSearch = (e) => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      if (e.target.value !== "") {
        setSearchProjects(
          projectsArr.filter((project) =>
            project.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setSearchProjects([]);
      }
    });
  };
  return (
    <Navbar className="max-w-full rounded-none top-0 left-0 right-0  bg-black py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="container mx-auto flex items-center">
          <Typography className="cursor-pointer py-1.5 font-medium text-white text-lg">
            <Link href="/">Givingly</Link>
          </Typography>

          <div className="relative flex w-full md:w-max mr-5 ml-5">
            <Input
              onChange={handleSearch}
              type="search"
              color="white"
              label="Search for projects"
              className="pr-5"
              containerProps={{
                className: "min-w-[360px] ml-50",
              }}
            />
            <Button
              type="submit"
              className="px-3 py-1 focus:outline-none absolute right-0 top-0 bottom-0 flex items-center"
              style={{ backgroundColor: "orange" }}
            >
              <span className="icon">🔍</span>
            </Button>
            <div className="">
              <SearchList searchProjects={searchProjects} />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:items-center gap-20">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-orange-500 hover:bg-transparent focus:bg-transparent active:bg-orange-500 lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto bg-orange py-2">
          {navList}
          {user ? (
            <>
              <Link href="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link
                variant="gradient"
                href="/login"
                size="sm"
                className="w-full bg-orange-500 text-white px-4 py-2 rounded"
              >
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </MobileNav>
    </Navbar>
  );
}
