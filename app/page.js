"use client";

import React, { useState } from "react";


import CategoryFiltering from "@/components/category/CategoryFiltering";
import SummaryCard from "./components/cards/SummaryCard";



const Home = () => {



  return (
    <div>
      Home

     
      <CategoryFiltering />
      <SummaryCard />

      

    </div>
  );
};

export default Home;
