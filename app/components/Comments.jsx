"use client";
import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

function FancyTestimonialsSlider({ testimonials }) {
  const testimonialsRef = useRef(null);
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive((active) =>
        active + 1 === testimonials.length ? 0 : active + 1
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
  }, []);
  function formatCommintTime(commintTime) {
    const { seconds, nanoseconds } = commintTime;
    const date = new Date(seconds * 1000 + nanoseconds / 1000000);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }
  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      {/* Testimonial image */}
      <h2 className="header-3 text-center my-3 mb-10">Testimonials</h2>
      <div className="relative h-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-teal-500/25 before:via-teal-500/5 before:via-25% before:to-teal-500/0 before:to-75% before:rounded-full before:-z-10">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                key={index}
                show={active === index}
                className="absolute inset-0 h-full -z-10"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
              >
                <img
                  className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                  src={testimonial.userImg}
                  width={56}
                  height={56}
                  alt={testimonial.userName}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={heightFix}
            >
              <div className="text-md mb-10 lg:h-[120px] font-bold text-[#666666] before:content-['\201C'] after:content-['\201D']">
                {testimonial.text}
              </div>
              <span className="color-yellow text-xs">
                {formatCommintTime(testimonial.commintTime)}
              </span>
            </Transition>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap justify-center -m-1.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${
              active === index
                ? "bg-green text-white shadow-indigo-950/10"
                : "bg-white hover:bg-teal-100 text-slate-900"
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span>{testimonial.userName}</span>{" "}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Comments() {
  const { comments, user } = useAuth();
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleAddCommentClick = () => {
    if (user) {
      setShowCommentForm(true);
    } else {
      setShowLoginNotification(true);
    }
  };

  useEffect(() => {
    let notificationTimeout;
    if (showLoginNotification) {
      notificationTimeout = setTimeout(() => {
        setShowLoginNotification(false);
      }, 5000);
    }

    return () => clearTimeout(notificationTimeout);
  }, [showLoginNotification]);

  const handleGoToLoginClick = () => {
    router.push("/login");
    console.log("Go to login");
  };

  return (
    <section className="lg:h-[700px] py-20 p-3 overflow-hidden">
      {showLoginNotification && (
        <div className="fixed inset-1 flex items-center justify-center text-white">
          {/* The outer div no longer has the bg-white class */}
          <div className="p-4 bg-green rounded-lg shadow-lg">
            <p>You should login first to add a comment 👇 </p>
            <button
              className="mt-3 px-4 py-2 bg-hoverLightGreen text-white rounded-md"
              onClick={handleGoToLoginClick}
            >
              Go to login
            </button>
          </div>
        </div>
      )}
      <div className="relative">
        <FancyTestimonialsSlider testimonials={comments} />
        {!user && (
          <button
            className="absolute top-3 right-3 px-4 py-2 bg-hoverLightGreen text-white rounded-md"
            onClick={handleAddCommentClick}
          >
            Add a comment
          </button>
        )}
      </div>
      {showCommentForm && user ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
            />
            <button
              className="mt-3 px-4 py-2 bg-hoverLightGreen text-white rounded-md"
              onClick={() => {
                // Save the comment in the database or perform any other actions here
                setCommentText("");
                setShowCommentForm(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
