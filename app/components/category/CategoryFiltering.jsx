"use client";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
const styles = {
  main: "flex justify-center md:justify-between items-center gap-2 flex-col md:flex-row ",
  header: "header-2 text-lightGreen py-4 text-center md:text-start",
  categoryContainer:
    " px-6 sm:px-0 flex flex-row flex-wrap justify-center gap-3",
  categoryBlock:
    "flex flex-col w-[70px] justify-center items-center py-2 gap-2",
  filterItem:
    "cursor-pointer border-[1px] bg-[#16a34a1a] border-BasicBasicBlack rounded-[8px] px-2 py-3",
  categoryName: "font-bold text-[18px]",
};

const CategoryFiltering = ({ data, filtrindData }) => {
  const t = useTranslations("Filtering");
  const [gruopCatValue, setGruopCatValue] = useState("");
  const [iconValue, setIconValue] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [all, setAll] = useState(`${t("all")}`);
  const [education, setEducation] = useState(`${t("education")}`);
  const [culture, setCulture] = useState(`${t("culture")}`);
  const [animals, setAnimals] = useState(`${t("animals")}`);
  const [children, setChildren] = useState(`${t("children")}`);
  const [successful, setSuccessful] = useState(`${t("successful")}`);
  const [active, setActive] = useState(`${t("active")}`);
  const [ending, setEnding] = useState(`${t("ending")}`);
  const [closed, setclosed] = useState(`${t("closed")}`);

  const onFilter = (cat, dropValue) => {
    setGruopCatValue(dropValue ? dropValue : gruopCatValue);

    const dropcategory = dropValue ? dropValue : gruopCatValue;
    const category = cat ? cat : iconValue;

    let gruopCat = [];

    if (dropcategory === "All" || dropcategory === "") gruopCat = data;
    else if (dropcategory == "Successful")
      gruopCat = data.filter((project) => project.raised >= project.goal);
    else if (dropcategory === "Active") {
      gruopCat = data.filter((project) => {
        const projectTime = timeStatus(project.endingDate);
        return projectTime > 5 && project.raised < project.goal;
      });
    } else if (dropcategory === "Ending soon") {
      gruopCat = data.filter((project) => {
        const projectTime = timeStatus(project.endingDate);
        return (
          projectTime <= 5 && projectTime > 0 && project.raised < project.goal
        );
      });
    } else if (dropcategory === "Closed") {
      gruopCat = data.filter((project) => {
        const projectTime = timeStatus(project.endingDate);
        return projectTime <= 0 && project.raised < project.goal;
      });
    }
    setActiveCategory(CATEGORY.find((item) => item.id === category).id);

    const filters = gruopCat.filter((item) =>
      category === "All" ? gruopCat : item.category === category
    );
    filtrindData(filters);
  };

  const CATEGORY = [
    {
      id: "All",
      name: all,
      icon: (color = "rgb(250, 250, 250)") => {
        return (
          <svg fill={color} width="28px" height="20px" viewBox="0 0 496 512">
            <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path>{" "}
          </svg>
        );
      },
    },
    {
      id: "education",
      name: education,
      icon: (color = "rgb(250, 250, 250)") => {
        return (
          <svg fill={color} width="28px" height="20px" viewBox="0 0 496 512">
            <path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path>{" "}
          </svg>
        );
      },
    },
    {
      id: "culture",
      name: culture,
      icon: (color = "rgb(250, 250, 250)") => {
        return (
          <svg fill={color} width="28px" height="20px" viewBox="0 0 496 512">
            <path d="M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1 11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65 57.76-32.06 123.12-49.01 189.01-49.01 1.61 0 3.23.17 4.85.19 13.95-13.47 31.73-22.83 51.59-26 18.89-3.02 38.05-4.55 57.18-5.32-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0 176.66 0 101.02 19.42 33.2 57.06 9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08 3.59 0 6.75-.46 10.01-.8-13.52-17.08-28.94-40.48-39.5-67.58-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4-8.25 8.91-20.67 15.75-35.32 18.32-14.65 2.58-28.67.4-39.48-5.17-.52 3.94-.64 7.98.09 12.1 3.84 21.7 24.58 36.19 46.34 32.37 21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35 63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36 21.76 3.83 36.28 24.52 32.45 46.22-.73 4.12-2.23 7.87-4.07 11.4-8.25-8.91-20.67-15.75-35.32-18.32-14.65-2.58-28.67-.4-39.48 5.17-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9 20.6 25.54 56.21 46.17 99.49 53.78 43.28 7.61 83.82.37 111.93-16.6-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32-14.65-2.58-28.67-.4-39.48 5.17-.52-3.94-.64-7.98.09-12.1 3.84-21.7 24.58-36.19 46.34-32.37 21.75 3.83 36.28 24.52 32.45 46.22-.73 4.13-2.23 7.88-4.07 11.4z"></path>
          </svg>
        );
      },
    },
    {
      id: "animals",
      name: animals,
      icon: (color = "rgb(250, 250, 250)") => {
        return (
          <svg fill={color} width="28px" height="20px" viewBox="0 0 496 512">
            <path d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"></path>
          </svg>
        );
      },
    },
    {
      id: "children",
      name: children,
      icon: (color = "rgb(250, 250, 250)") => {
        return (
          <svg fill={color} width="28px" height="20px" viewBox="0 0 496 512">
            <path d="M192 160c44.2 0 80-35.8 80-80S236.2 0 192 0s-80 35.8-80 80 35.8 80 80 80zm-53.4 248.8l25.6-32-61.5-51.2L56.8 383c-11.4 14.2-11.7 34.4-.8 49l48 64c7.9 10.5 19.9 16 32 16 8.3 0 16.8-2.6 24-8 17.7-13.2 21.2-38.3 8-56l-29.4-39.2zm142.7-83.2l-61.5 51.2 25.6 32L216 448c-13.2 17.7-9.7 42.8 8 56 7.2 5.4 15.6 8 24 8 12.2 0 24.2-5.5 32-16l48-64c10.9-14.6 10.6-34.8-.8-49l-45.9-57.4zM376.7 145c-12.7-18.1-37.6-22.4-55.7-9.8l-40.6 28.5c-52.7 37-124.2 37-176.8 0L63 135.3C44.9 122.6 20 127 7.3 145-5.4 163.1-1 188 17 200.7l40.6 28.5c17 11.9 35.4 20.9 54.4 27.9V288h160v-30.8c19-7 37.4-16 54.4-27.9l40.6-28.5c18.1-12.8 22.4-37.7 9.7-55.8z"></path>{" "}
          </svg>
        );
      },
    },
  ];

  const GROUP_CATEGORY = [
    { id: 1, name: all, value: "All" },
    { id: 2, name: successful, value: "Successful" },
    { id: 3, name: active, value: "Active" },
    { id: 4, name: ending, value: "Ending soon" },
    { id: 5, name: closed, value: "Closed" },
  ];
  return (
    <Box className="py-10">
      <h2 className={styles.header}>{t("header")}</h2>
      <div className={styles.main}>
        <Box className={styles.categoryContainer}>
          {CATEGORY.map((cat) => {
            return (
              <Box key={cat.id} className={styles.categoryBlock}>
                <IconButton
                  onClick={() => {
                    setIconValue(cat.id);
                    onFilter(cat.id);
                  }}
                  sx={{
                    background: "#16a34a1a",
                    // border: "1px",
                    // borderColor: "black",
                    height: "44px",
                    borderRadius: "12px",
                  }}
                  // className={styles.filterItem}
                >
                  {cat.icon(activeCategory === cat.id ? "#00c1a2" : "black")}
                </IconButton>
                <p className="sub-header !text-base">{cat.name}</p>
              </Box>
            );
          })}
        </Box>
        <div className="relative ">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{t("filter")}</InputLabel>
            <Select
              value={gruopCatValue}
              onChange={(event) => {
                onFilter(null, event.target.value);
              }}
              label="gruopCat"
            >
              {GROUP_CATEGORY.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </Box>
  );
};

export default CategoryFiltering;

function timeStatus(endingDate) {
  const endDate = new Date(endingDate);
  const today = new Date();
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining;
}
