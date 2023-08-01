import React from "react";
import { CATEGORY } from "@/data/countries";

function CategoryIcon({ category ,color="#00c1a2"}) {
  const selectedCategory = CATEGORY.find((x) => x.id === category);

  return (
    <div>{selectedCategory ? selectedCategory.icon(color) : null}</div>
  );
}

export default CategoryIcon;
