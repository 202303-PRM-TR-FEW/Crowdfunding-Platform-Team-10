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

const EditUser = ({
  openEditUserForm,
  setOpenEditUserForm,
  setCurrentUser,
  currentUser,
}) => {
  const handleClose = () => {
    setOpenEditUserForm(false);
  };

  const [err, setErr] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    userImg: "",
    country: "",
  });

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
    let imgUrl = data.userImg;

    if (data.userImg instanceof File) {
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
      const updatedUserData = {
        name: data.name || currentUser.name,
        bio: data.bio || currentUser.bio,
        userImg: imgUrl || currentUser.userImg,
        email: currentUser.email, // Keep the same email
        timeStamp: currentUser.timeStamp, // Keep the same timestamp
        country: data.country || currentUser.country,
      };

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
          <h3 className="header-3">Personal Detail:</h3>
        </div>

        {currentUser ? (
          currentUser.country === "" || currentUser.bio === "" ? (
            <p className="text-center text-red-900 py-2">
              Please complete your personal information
            </p>
          ) : null
        ) : null}

        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="mt-6">
            <TextField
              label="Full Name"
              className="w-full"
              variant="standard"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {/* Error messages */}
            </Typography>
          </div>

          <div>
            <TextField
              label="Bio"
              className="w-full"
              variant="standard"
              type="text"
              name="bio"
              value={userData.bio}
              onChange={handleInputChange}
            />
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {/* Error messages */}
            </Typography>
          </div>
          <div>
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
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
                          <img
                            className="rounded-none "
                            loading="lazy"
                            width="20"
                            height="10"
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
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {/* Error messages */}
            </Typography>
          </div>
          <div>
            <TextField
              className="w-full"
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
              label="User Picture"
              onChange={handleImageChange}
              sx={{ input: { cursor: "pointer" } }}
            />
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {/* {err} */}
            </Typography>
          </div>

          <button
            className="mt-8 btn-primary w-full "
            type="submit"
            variant="filled"
          >
            Update
          </button>
        </form>
        <p>{err}</p>
      </div>
    </Dialog>
  );
};

export default EditUser;
