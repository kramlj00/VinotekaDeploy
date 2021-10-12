import React, { useState } from "react";
import Filter from "../components/Filter/Filter";

export default function ToggleFilters() {
  const [isOpen, setIsOpen] = useState(false);

  // toggle filter items (vrsta, sorta, raspon cijena)
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Filter toggleFilters={toggleFilters} isOpen={isOpen} />
    </>
  );
}
