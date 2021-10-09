import React, { useState } from "react";
import Filter from "../components/Filter/Filter";

export default function ToggleFilters() {
  const [isOpen, setIsOpen] = useState(false);

  // toggle filters
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  return (
    <>
      <Filter toggleFilters={toggleFilters} isOpen={isOpen} />
    </>
  );
}
