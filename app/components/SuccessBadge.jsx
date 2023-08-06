const SuccessBadge = ({ endingDate, raised, goal }) => {
  const successState = isSuccessful(endingDate, raised, goal);

  return (
    <div>
      <span
        data-cy="badge-title"
        className={`text-xs  px-5 py-1  rounded ${
          successState === "Active"
            ? "text-lightGreen bg-yellow-light"
            : successState === "Successful"
            ? "text-white bg-lightGreen"
            : successState === "Successful"
            ? "text-white bg-gray-500"
            : successState === "Closed"
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

function isSuccessful(endingDate, raised, goal) {
  const endDate = new Date(endingDate);
  const today = new Date();
  const timeDiff = endDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (raised >= goal) {
    return "Successful";
  } else if (daysRemaining <= 0) {
    return "Closed";
  } else if (daysRemaining < 5) {
    return `${daysRemaining} Days Left`;
  } else {
    return "Active";
  }
}
