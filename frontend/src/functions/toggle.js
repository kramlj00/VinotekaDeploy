import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

function ToggleBars({ isOpen, setIsOpen }) {
  // const [isOpen, setIsOpen] = useState(false);

  // toggle sidebar
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </>
  );
}

export default ToggleBars;
