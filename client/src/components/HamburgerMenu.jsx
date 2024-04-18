import { useState } from "react";
import Button from "./Button";
import SearchComponent from "./SearchComponent";
import { useNavigate } from "react-router-dom";
import hamburgerImg from "../assets/hamburger.png";

export default function HamburgerMenu({ handelLogOut }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="sm:hidden">
      <button onClick={() => setShowMenu(true)}>
        <img className="w-8 h-8" src={hamburgerImg} />
      </button>
      {showMenu && (
        <div className="flex flex-col justify-between w-5/6 bg-black h-full px-4 pb-6 fixed right-0 top-0 gap-3">
          <div className="flex flex-col gap-3">
            <button
              className="text-white text-5xl font-light self-start"
              onClick={() => setShowMenu(false)}
            >
              &times;
            </button>
            <SearchComponent />
            <Button
              type={"ham"}
              onClick={() => {
                setShowMenu(false);
                navigate("/diary");
              }}
            >
              Home Page
            </Button>
            <Button
              type={"ham"}
              onClick={() => {
                setShowMenu(false);
                navigate("/diary/newEntry");
              }}
            >
              New Entry
            </Button>
          </div>
          <Button
            type={"ham"}
            onClick={() => {
              setShowMenu(false);
              handelLogOut();
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
