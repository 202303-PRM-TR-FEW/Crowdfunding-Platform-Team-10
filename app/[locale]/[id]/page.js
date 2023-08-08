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
import Image from "next/image";

import { toast } from "react-toastify";
import Target from "@/components/helper/Target";
import ViewCount from "@/components/helper/ViewCount";
import UserNameImg from "@/components/helper/UserNameImg";
import CategoryIcon from "@/components/helper/CategoryIcon";
import SuccessBadge from "@/components/SuccessBadge";
import DonationForm from "@/components/forms/DonationForm";
import DonationsHisory from "@/components/cards/DonationsHisory";
import Chart from "@/components/cards/Chart";
import CommentForm from "@/components/commentsCom/CommentForm";
import ConfirmDialog from "@/components/helper/ConfirmDialog";
import CommentRows from "@/components/commentsCom/CommentRows";
import Link from "next/link";
import { useRouter } from "next-intl/client";
import Share from "./Share";

function Project({ params }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Projects");
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

  const today = new Date();
  const endDate = new Date(data.endingDate);

  return (
    <div className=" relative overflow-hidden">
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
              <div className="px-3 flex flex-col items-center gap-4 lg:w-7/12 w-full overflow-hidden  rounded-lg">
                <div className="overflow-hidden rounded-lg relative w-[326px] h-[222px] sm:w-[660px] sm:h-[390px] md:h-[554px] lg:h-[366px] xl:h-[554px] md:w-full">
                  <Image
                    src={data.url}
                    alt=""
                    fill={true}
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                    sizes="(max-width: 768px) 100vw"
                  />
                </div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex  justify-center gap-2 items-center">
                    <h1 className="header-3 text-center my-2 lg:text-start text-lightGreen ">
                      {data.name}
                    </h1>
                    <div className="mt-3">
                      <CategoryIcon category={data.category} />
                    </div>
                  </div>

                  <SuccessBadge
                    endingDate={data.endingDate}
                    raised={data.raised}
                    goal={data.goal}
                  />
                </div>
                <div className="w-full">
                  <Target raised={data.raised} goal={data.goal} />
                </div>
                <div className=" lg:hidden block w-full">
                  {user ? (
                    today < endDate ? (
                      data.raised === data.goal || data.raised > data.goal ? (
                        <button disabled={true} className="btn-primary w-full">
                          {t("projects-completed")}
                        </button>
                      ) : (
                        <button
                          className="btn-primary w-full"
                          onClick={handleDonationForm}
                        >
                          {t("donate-btn")}
                        </button>
                      )
                    ) : (
                      <div></div>
                    )
                  ) : today < endDate ? (
                    <Link href="/login">
                      <div className="btn-primary w-full">{t("login-btn")}</div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="w-full">
                  <p className="color-grey">{data.about}</p>
                  <hr className="border-t-2 border-white my-2"></hr>

                  <div className="flex items-center justify-between">
                    <UserNameImg
                      userName={data.creator.userName}
                      userImg={data.creator.userImg}
                    />
                    <ViewCount />
                  </div>
                </div>

                <div className=" lg:block hidden my-2 w-full">
                  {user ? (
                    today < endDate ? (
                      data.raised === data.goal || data.raised > data.goal ? (
                        <button disabled={true} className="btn-primary w-full">
                          {t("projects-completed")}
                        </button>
                      ) : (
                        <button
                          className="btn-primary w-full"
                          onClick={handleDonationForm}
                        >
                          {t("donate-btn")}
                        </button>
                      )
                    ) : (
                      <div></div>
                    )
                  ) : today < endDate ? (
                    <Link href="/login">
                      <div className="btn-primary w-full">{t("login-btn")}</div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
                {user?.uid == data.creator.userId ? (
                  <button
                    className="btn-red  w-full my-2"
                    onClick={handleDeleteProject}
                  >
                    Delete Project
                  </button>
                ) : null}
                <div className=" hidden lg:block w-full py-3">
                  <CommentRows id={params.id} />
                  {user ? <CommentForm params={params} /> : null}
                </div>
              </div>
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
