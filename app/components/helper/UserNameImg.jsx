import React from "react";
import { Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import LoaderStyle from "./LoaderStyle";

function UserNameImg({ userImg, userName, userId }) {
  const t = useTranslations("Helper");
  return (
    <div className="flex items-center justify-start gap-3 ">
      <Link href={`/users/${userId}`}>
        <div className="w-[45px]">
          {userImg ? (
            <Avatar alt={userName} src={userImg} />
          ) : (
            <AccountCircle fontSize="large" />
          )}
        </div>
      </Link>

      <div>
        <p className="text-md color-yellow">{userName} </p>
        <p className="text-blue-gray-400 text-xs">{t("organize")}</p>
      </div>
    </div>
  );
}

export default UserNameImg;
