"use client";
import React, { useState } from "react";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [holderName, setHolderName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv || !holderName) {
      setShowAlert(true);
      return;
    }
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
          <img
            src="assets/images/donation-image.png"
            alt="Donation Image"
            className="w-full rounded-md"
          />
        </div>
      </div>
      <div className="lg:col-span-2 bg-white flex flex-col justify-center items-center lg:rounded-r rounded-b lg:rounded-bl-none p-6 gap-6 ">
        <form>
          <div style={blurredCardStyle}>
            <h2 className="text-2xl font-bold mb-4">Donation Details</h2>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="w-full p-2 border rounded-md bg-gray-100"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="w-full p-2 border rounded-md bg-gray-100"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block font-medium mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full p-2 border rounded-md bg-gray-100"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="holderName" className="block font-medium mb-1">
                Holder Name
              </label>
              <input
                type="text"
                id="holderName"
                className="w-full p-2 border rounded-md bg-gray-100"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            {showAlert && (
              <div className="text-basicRed mb-4">
                Please fill out all the fields.
              </div>
            )}

            <button
              type="submit"
              className="bg-hoverLightGreen text-white px-4 py-2 rounded-md hover:bg-lightGreen"
              onClick={handleSubmit}
            >
              Confirm your donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
