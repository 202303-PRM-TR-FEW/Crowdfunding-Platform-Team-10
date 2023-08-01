import { useAuth } from "@/context/AuthContext";

const SuccessBadge = ({ endingDate, raised, goal }) => {
  const { isSuccessful } = useAuth();
  const successState = isSuccessful(endingDate, raised, goal);

  return (
    <div>
      <span
        className={`text-xs  px-5 py-1 pt-2 rounded ${
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
