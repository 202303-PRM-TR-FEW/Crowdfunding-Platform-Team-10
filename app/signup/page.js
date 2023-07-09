"use client";


import NewsLetterCard from "@/components/cards/NewsLetterCard";


import SignupForm from "@/components/forms/SignupForm";
const Signup = () => {
  return (

    <div className="flex justify-center items-center">
      <SignupForm />

<NewsLetterCard/>

    </div>
  );
};

export default Signup;