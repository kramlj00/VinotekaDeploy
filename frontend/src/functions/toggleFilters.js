import React, { useState, useEffect } from "react";
import Filter from "../components/Filter/Filter";
import { getFilterArgs } from "../api/api";

export default function ToggleFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterSort, setFilterSort] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    getFilterArgs(setFilterSort, setFilterCategory);
  }, []);

  // toggle filter items (vrsta, sorta, raspon cijena)
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Filter toggleFilters={toggleFilters} isOpen={isOpen} sort={filterSort} category={filterCategory}/>
    </>
  );
}
