"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  IconButton,
} from "@mui/material";
import { countries } from "@/data/countries";
import { FileUpload } from "@mui/icons-material";
import LoaderStyle from "../helper/LoaderStyle";
import { useTranslations } from "next-intl";
import Image from "next/image";

const EditUser = ({
  openEditUserForm,
  setOpenEditUserForm,
  currentUser,
  setCurrentUser,
}) => {
  const handleClose = () => {
    setOpenEditUserForm(false);
  };


  const [err, setErr] = useState("");
  const t = useTranslations("EditUser");
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    userImg: "",
    country: "",
  });

  // Populate the form fields with currentUser data when the component mounts
  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name,
        bio: currentUser.bio,
        userImg: currentUser.userImg,
        country: currentUser.country,
      });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setUserData((prevData) => ({ ...prevData, userImg: imageFile }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = { ...userData };
    const storage = getStorage();
    let imgUrl = data.userImg; // Set the imgUrl to the current userImg in case the user doesn't change the image

    // Check if the user uploaded a new image
    if (data.userImg instanceof File) {
      // Create a non-root reference for the image upload
      const storageRef = ref(
        storage,
        `images/${currentUser.id}/${data.userImg.name}`
      );
      try {
        // Upload the image and get the download URL
        const snapshot = await uploadBytes(storageRef, data.userImg);
        imgUrl = await getDownloadURL(snapshot.ref);
      } catch (e) {
        setErr(e.message);
        return;
      }
    }

    try {
      // Create a new object with the updated data, using the current data if fields are not modified
      const updatedUserData = {
        name: data.name || currentUser.name,
        bio: data.bio || currentUser.bio,
        userImg: imgUrl || currentUser.userImg,
        email: currentUser.email, // Keep the same email
        timeStamp: currentUser.timeStamp, // Keep the same timestamp
        country: data.country || currentUser.country,
      };

      // Save the updated user data back to the database
      await setDoc(doc(db, "users", currentUser.id), updatedUserData);
      setCurrentUser(updatedUserData);
      setErr("");
      setOpenEditUserForm(false);
    } catch (e) {
      setErr(e.message);
    }
  };

  if (currentUser == null || !currentUser) {
    return <LoaderStyle />;
  }

  return (
    <Dialog open={openEditUserForm} size={"lg"} className="">
      <div className="p-6 py-10 ">
        <div className="flex items-center justify-start gap-2">
          <IconButton onClick={handleClose} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <h3 className="header-3"> {t("header")}</h3>
        </div>

        {currentUser ? (
          currentUser.country === "" || currentUser.bio === "" ? (
            <p className="text-center text-red-900 py-2">{t("sub-header")}</p>
          ) : null
        ) : null}

        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="mt-6">
            <TextField
              label={t("label-name")}
              fullWidth
              variant="standard"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
    
          </div>


          <div>
            <TextField
              label={t("bio")}
              fullWidth
              variant="standard"
              type="text"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
   
          </div>
          <div>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("country")}{" "}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="country"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country.label} value={country.label}>
                      <div className="flex gap-2 items-center">
                        <span>
                          <Image
                          unoptimized
                            className="rounded-none "
                            loading="lazy"
                            width={20}
                            height={10}
                            src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                            alt={country.label}
                          />
                        </span>
                        <span>{country.label}</span>
                      </div>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
        
          </div>
          <div>
            <TextField
              fullWidth
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <FileUpload />
                  </InputAdornment>
                ),
              }}
              accept="image/*"
              id="userImg"
              name="userImg"
              type="file"
              label={t("user-picture")}
              onChange={handleImageChange}
              sx={{ input: { cursor: "pointer" } }}
            />
    
          </div>

          <button
            className="mt-8 btn-primary w-full "
            type="submit"
            variant="filled"
            fullWidth
          >
            {t("btn-update")}
          </button>
        </form>
        <Typography
          variant="small"
          className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
        >
          {err}
        </Typography>
      </div>
    </Dialog>
  );
};

export default EditUser;
