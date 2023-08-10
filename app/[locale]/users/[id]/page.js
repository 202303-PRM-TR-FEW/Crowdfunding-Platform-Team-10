"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { db } from "@/config/firebase";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import SummaryCard from "@/components/cards/SummaryCard";
import { Box } from "@mui/system";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { Fade } from "react-awesome-reveal";
function Page({ params }) {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    user: null,
    projects: [],
    donationsCount: 0,
    totalDonatedAmount: 0,
  });
  const locale = useLocale();
  const t = useTranslations("UserPage");

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        // Fetch user projects
        const projectsQuery = query(
          collection(db, "projects"),
          where("creator.userId", "==", params.id)
        );

        const projectsSnapshot = await getDocs(projectsQuery);
        // Fetch user donations
        const donationsQuery = query(
          collection(db, "donations"),
          where("userId", "==", params.id)
        );

        const donationsSnapshot = await getDocs(donationsQuery);

        if (!projectsSnapshot.empty) {
          const userProjects = projectsSnapshot.docs.map((doc) => {
            const projectData = doc.data();
            const projectId = doc.id;
            return { id: projectId, ...projectData }; // Include the ID in the data
          });

          if (!donationsSnapshot.empty) {
            const userDonations = donationsSnapshot.docs.map((doc) =>
              doc.data()
            );
            console.log(userDonations);

            const totalDonatedAmount = userDonations.reduce(
              (total, donation) => total + donation.donaiton,
              0
            );

            setUserData({
              user: userProjects.length > 0 ? userProjects[0].creator : null,
              projects: userProjects,
              donationsCount: userDonations.length,
              totalDonatedAmount: totalDonatedAmount,
            });
          } else {
            setUserData({
              user: userProjects.length > 0 ? userProjects[0].creator : null,
              projects: userProjects,
              donationsCount: 0,
              totalDonatedAmount: 0,
            });
            console.log("somthing went wrong");
          }

          setLoading(false);
        } else {
          // No user projects found
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const { user, projects, donationsCount, totalDonatedAmount } = userData;
  console.log(projects);

  const allProjects =
    projects.length > 0 ? (
      projects.map((card) => (
        <SummaryCard
          key={card.id}
          projectId={card.id}
          img={card.url}
          title={card.name}
          goal={card.goal}
          raised={card.raised}
          category={card.category}
          creator={card.creator}
          viewCount={card.viewCount}
          endingDate={card.endingDate}
        />
      ))
    ) : (
      <Box className="header-4 px-10 py-28">{t("message")}</Box>
    );

  if (loading) {
    return (
      <Box className="scale-[0.6]">
        <LoaderStyle />
      </Box>
    );
  }

  return (
    <div className="bg-gradient-to-t from-transparent to-teal-50 relative overflow-hidden">
      <Fade>
        <div className="container mx-auto py-28 text-center">
          {user && (
            <div className="mb-6">
              <div className="relative inline-block">
                <Image
                  src={user.userImg}
                  alt={`${user.name}'s Profile`}
                  className="w-32 h-32 rounded-full mx-auto mb-2"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4">
                <h1 className="font-semibold text-lg  text-gray-500">
                  <span className=" color-green">{user.userName}</span>
                  {locale === "en" ? <span>&apos;</span> : ""}
                  {t("s")}
                  {t("contributions")}
                </h1>
              </div>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 items-start justify-center mx-auto my-2">
            <div className="text-center">
              <p className="font-semibold text-gray-500">{t("project")}</p>
              <p className="text-lg font-bold color-green">{projects.length}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-500">{t("donations")}</p>
              <p className="text-lg font-bold color-green">{donationsCount}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-500">{t("amount")}</p>
              <p className="text-lg font-bold color-green">
                ${formatNumber(totalDonatedAmount)}
              </p>
            </div>
          </div>
          <div className="items-start justify-around mx-auto flex flex-wrap gap-3 lg:mt-20 mt-10">
            {allProjects}
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Page;

export function formatNumber(number) {
  const suffixes = ["", "K", "M", "B", "T"];
  const numString = number.toString();
  const numDigits = numString.length;
  const suffixNum = Math.floor((numDigits - 1) / 3);

  if (suffixNum === 0 || numDigits <= 4) {
    return number.toString();
  } else {
    let shortNumber = parseFloat(
      (number / Math.pow(1000, suffixNum)).toPrecision(3)
    );
    if (shortNumber % 1 !== 0) {
      shortNumber = shortNumber.toFixed(1);
    }
    return shortNumber + suffixes[suffixNum];
  }
}
