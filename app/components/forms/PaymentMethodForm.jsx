"use client";
import React, { useState } from "react";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PaymentMethodForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const t = useTranslations("PaymentMethodForm");

  const handleSubmit = (e) => {

    e.preventDefault();
    if (!cardNumber || !expiryDate || !cvv || !holderName) {
      setShowAlert(true);
      return;
    }
    // Clear the input fields after successful submission
    setShowAlert(false);

    toast.success(`${t("success-msg")}`);
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setHolderName("");
  };
  const blurredCardStyle = {
    position: "absolute",
    width: "100%",
    position: "button",
    height: "100%",
    backdropFilter: "blur(14px)",
    borderRadius: "30px",
    padding: "20px",
    color: "#20272c",
  };
  return (
    <div className="grid lg:grid-cols-5 h-max drop-shadow-2xl max-w-4xl">
      <div className="lg:col-span-3 bg-gradient-to-br from-lightGreen to-teal-700 flex flex-col justify-center gap-2 text-center bg-white p-6 sm:p-12 md:p-16 lg:rounded-l rounded-t lg:rounded-tr-none">
        <div className="mb-4">
          <Image
          unoptimized
            src="/assets/images/donation-image.png"
            alt="Donation Image"
            className="w-full rounded-md"
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="lg:col-span-2 bg-white flex flex-col justify-center items-center lg:rounded-r rounded-b lg:rounded-bl-none p-6 gap-6 ">
        <form>
          <div style={blurredCardStyle}>
            <h2 className="text-2xl font-bold mb-4">{t("header")} </h2>
            <div className="mb-4">
              <TextField
                label={t("cardNumber")}
                fullWidth
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                variant="standard"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label={t("expiryDate")}
                fullWidth
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
                variant="standard"
              />
              <TextField
                label={t("cvc")}
                fullWidth
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
                variant="standard"
              />
            </div>

            <div className="mb-4">
              <TextField
                label={t("holderName")}
                fullWidth
                type="text"
                id="holderName"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="John Doe"
                required
                variant="standard"
              />
            </div>
            {showAlert && (
              <div className="text-basicRed mb-4">{t("alert-text")}</div>
            )}

            <button
              className="mt-8 btn-primary self-center "
              type="submit"
              variant="filled"
              onClick={handleSubmit}
              fullWidth
            >
              {t("confirm-btn")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PaymentMethodForm;
