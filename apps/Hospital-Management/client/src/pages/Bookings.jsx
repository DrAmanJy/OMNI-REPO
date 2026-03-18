import Search from "../components/Search";

const Bookings = () => {
  return (
    <div className=" p-10">
      <Search title={"My Bookings"} />
      <div className=" flex flex-col gap-10 py-10 ">
        <div className=" border-1 border-gray-400 rounded p-5">
          <div>
            <h3>Booking Date: </h3>

            <h3>Appointment no: 001 </h3>
          </div>
          <h2 className=" text-2xl text-blue-600 py-2 font-bold">
            Aman Session
          </h2>
          <div className=" py-3">
            <h3>Docotr: Aman</h3>
            <h3>Date: 21 07 2025</h3>
            <h3>Starts: 01:15 AM</h3>
          </div>
          <button className=" w-full py-2 bg-blue-300 text-blue-600 rounded font-bold">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
