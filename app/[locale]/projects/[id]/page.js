"use client";

import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";

import { toast } from "react-toastify";

import DonationForm from "@/components/forms/DonationForm";
import DonationsHisory from "@/components/cards/DonationsHisory";
import Chart from "@/components/cards/Chart";
import CommentForm from "@/components/commentsCom/CommentForm";
import ConfirmDialog from "@/components/helper/ConfirmDialog";
import CommentRows from "@/components/commentsCom/CommentRows";

import { useRouter } from "next-intl/client";
import Share from "./Share";
import SingleProjectPage from "./SingleProjectPage";
import { Fade } from "react-awesome-reveal";

function Project({ params }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [projectsDonations, setProjectsDonations] = useState([]);
  const [openDonationForm, setOpenDonationForm] = useState(false);

  const router = useRouter();
  const [donations, setDonations] = useState([]);
  //fetching all users
  useEffect(() => {
    const q = query(collection(db, "donations"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let donationsArr = [];
      QuerySnapshot.forEach((doc) => {
        donationsArr.push({ ...doc.data(), id: doc.id });
      });
      setDonations(donationsArr);
    });
    return () => unsubscribe();
  }, []);

  //closing project dailog
  const handleClose = async (word) => {
    if (word === "Confirm") {
      await deleteDoc(doc(db, "projects", params.id));
      toast.success(" Project deleted Succesfully !");
      router.push("/profile");
    }
    setOpen(false);
  };
  const handleDeleteProject = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "projects", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = docSnap.data();
          const updatedData = {
            ...projectData,
            viewCount: projectData.viewCount + 1,
          };
          await updateDoc(docRef, updatedData);
          setData(updatedData);
          setLoading(false);
        } else {
          console.log("No such document!");
          setNotExists(true);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
    const donArray = Object.values(donations);

    const projectDon = donArray.filter(
      (donation) => donation.projectId === params.id
    );
    setProjectsDonations(projectDon);
  }, [params.id, donations]);

  //donatio form
  const handleDonationForm = () => {
    openDonationForm === false
      ? setOpenDonationForm(true)
      : setOpenDonationForm(false);
  };

  return (
    <div className=" relative overflow-hidden">
      <Fade>
        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          title={"Are you sure to delete this project?"}
          message={""}
          handleClose={handleClose}
        />
        <section className=" static py-28 p-3 bg-gradient-to-t from-transparent to-teal-50">
          <div className="container mx-auto">
            {loading || data.length <= 0 ? (
              <LoaderStyle />
            ) : (
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pt-0 mt-0 overflow-hidden rounded-lg  relative">
                <SingleProjectPage
                  data={data}
                  user={user}
                  handleDonationForm={handleDonationForm}
                  handleDeleteProject={handleDeleteProject}
                  params={params}
                />

                <div className="lg:sticky lg:top-0 lg:w-5/12 w-full mt-3 flex flex-col gap-3 ">
                  <DonationsHisory projectsDonations={projectsDonations} />
                  <Chart projectsDonations={projectsDonations} />
                </div>
              </div>
            )}
          </div>
          <Share />
          <div className="w-full flex flex-col items-start  p-2">
            <DonationForm
              id={params}
              title={data.name}
              openDonationForm={openDonationForm}
              setOpenDonationForm={setOpenDonationForm}
            />
            <div className=" block lg:hidden py-3 w-full ">
              <CommentRows id={params.id} />
              {user ? <CommentForm params={params} /> : null}
            </div>
          </div>
        </section>

        <div style={circleBackgroundStyle}></div>
      </Fade>
    </div>
  );
}

export default Project;

const circleBackgroundStyle = {
  position: "absolute",
  top: "-50px",
  right: "50px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "#00c1a1a5",
  transform: "rotate(45deg)",
  zIndex: -1,
  animation: `moveCircle2 10s linear infinite`,
  overFlow: "hidden",
};
