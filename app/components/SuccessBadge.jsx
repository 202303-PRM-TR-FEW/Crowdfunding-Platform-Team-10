import { useTranslations } from "next-intl";

const SuccessBadge = ({ endingDate, raised, goal }) => {
  const successState = IsSuccessful(endingDate, raised, goal);

  return (
    <div>
      <span
        data-cy="badge-title"
        className={`text-xs  px-5 py-1  rounded ${
          successState === "Active" || "Aktif"
          ? "text-lightGreen bg-yellow-light"
          : successState === "Successful" || "Tamamlandı"
          ? "text-white bg-lightGreen"
          : successState === "Successful" || "Tamamlandı"
          ? "text-white bg-gray-500"
          : successState === "Closed" || "Kapatıldı"
          ? "text-white bg-gray-700"
          : "text-white bg-red-800 "
        }`}
      >
        {successState}
      </span>
    </div>
  );
};

export default SuccessBadge;

function IsSuccessful(endingDate, raised, goal) {
  const endDate = new Date(endingDate);
  const today = new Date();
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const t = useTranslations("SuccessBadge")

  if (raised >= goal) {
    return `${t("sccs")}`;
  } else if (daysRemaining <= 0) {
    return `${t("clsd")}`;
  } else if (daysRemaining < 5) {
    return `${daysRemaining} ${t("left")}`;
  } else {
    return `${t("actv")}`;
  }
}