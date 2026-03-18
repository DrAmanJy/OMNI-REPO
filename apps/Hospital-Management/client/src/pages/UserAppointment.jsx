import Search from "../components/Search";
import { useEffect, useState } from "react";
import { deleteAppointments, getAppointments } from "../services/user";
import { useSelector } from "react-redux";
const UserAppointment = () => {
  const [appointments, setAppointments] = useState(null);
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  useEffect(() => {
    getAppointmentsData();
  }, []);
  const getAppointmentsData = async () => {
    const res = await getAppointments(userId);
    setAppointments(res.appointments);
  };
  const handleCancel = async (id) => {
    const res = await deleteAppointments(id);
    alert(res.message);
    getAppointmentsData();
  };
  return (
    <div className="p-6">
      <Search title={"Appointment"} />
      <div className="py-10">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {appointments && appointments.length > 0 ?( appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border border-gray-300 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            >
              <div className="text-gray-700 text-sm space-y-1 mb-2">
                <p>
                  <span className="font-semibold">Booking Date:</span>{" "}
                  {new Date(appointment.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Appointment No:</span>{" "}
                  {appointment.appointment}
                </p>
              </div>

              <h2 className="text-2xl text-blue-600 font-bold mb-2">
                {appointment.tittle}
              </h2>

              <div className="text-gray-700 text-sm space-y-1 mb-4">
                <p>
                  <span className="font-semibold">Doctor:</span>{" "}
                  {appointment.doctor}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {new Date(appointment.date).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleCancel(appointment._id)}
                className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold"
              >
                Cancel Booking
              </button>
            </div>
          ))): <h3 className="mx-auto py-6 text-gray-500 col-span-full text-center">No Appointment found. </h3> }
        </div>
      </div>
    </div>
  );
};

export default UserAppointment;
