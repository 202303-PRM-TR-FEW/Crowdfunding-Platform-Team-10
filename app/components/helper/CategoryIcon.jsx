import React from "react";
import { CATEGORY } from "@/data/countries";

function CategoryIcon({ category }) {
  const selectedCategory = CATEGORY.find((x) => x.id === category);

  return (
    <div>{selectedCategory ? selectedCategory.icon("#00c1a2") : null}</div>
  );
}

export default CategoryIcon;
