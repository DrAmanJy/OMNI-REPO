import { useEffect, useState } from "react";
import Search from "../components/Search";
import { getDoctorAppointments } from "../services/user";
import { useSelector } from "react-redux";

const Appointment = () => {
  const [appointments, setAppointments] = useState(null);
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  useEffect(() => {
    getAppointmentsData();
  }, []);
  const getAppointmentsData = async () => {
    const res = await getDoctorAppointments(userId);
    setAppointments(res.appointment);
  };

  return (
    <div className=" p-10">
      <Search title={"Appointment"} />
      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">
                Patient Name
              </th>
              <th className="px-4 py-3 border-b border-gray-200">
                Appointment No
              </th>
              <th className="px-4 py-3 border-b border-gray-200">Doctor</th>
              <th className="px-4 py-3 border-b border-gray-200">Session</th>
              <th className="px-4 py-3 border-b border-gray-200">Time</th>
            </tr>
          </thead>

          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-center text-gray-800">
                    {appointment.userId}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {appointment.appointment}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {appointment.doctor}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {appointment.tittle}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {new Date(appointment.date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
