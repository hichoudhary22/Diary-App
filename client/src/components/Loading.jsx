export default function Loading() {
  return (
    <div className="bg-[rgba(0,0,0,0.75)]  w-screen h-screen flex items-center fixed top-0 left-0 z-10">
      <div className="text-5xl font-bold text-white flex flex-grow justify-center">
        <p>loading...</p>
      </div>
    </div>
  );
}
