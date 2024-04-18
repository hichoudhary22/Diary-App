import Calender from "../components/Calender";
import { useState } from "react";
// import calenderImg from "../assets/calender.png";

export default function CalendarComponent({ value, setDate }) {
  const [showCalender, setShowCalender] = useState(false);

  return (
    <div>
      {showCalender && (
        <div className="fixed m-4 bg-slate-100 rounded-3xl p-4 bg-opacity-[0.93]">
          <Calender setDate={setDate} />
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <div className="md:hidden self-end">
  //       <button
  //         className="h-10 w-10"
  //         onClick={() => setShowCalender((val) => !val)}
  //       >
  //         <img src={calenderImg} />
  //       </button>
  //       {showCalender && (
  //         <div className="fixed right-4 m-4 bg-slate-100 rounded-3xl p-4 bg-opacity-[0.93]">
  //           <Calender />
  //         </div>
  //       )}
  //     </div>
  //     <div className="hidden md:block">
  //       <Calender />
  //     </div>
  //   </div>
  // );
}
