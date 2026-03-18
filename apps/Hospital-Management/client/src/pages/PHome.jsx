import { useEffect, useState } from "react";
import { BriefcaseMedical, AudioWaveform } from "lucide-react";
import Search from "../components/Search";
import { getInfo } from "../services/user";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const PHome = () => {
  const [info, setInfo] = useState(null);
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getInfo(userId);
    setInfo(data);
  };
  return (
    <div className="p-6 w-full h-full overflow-x-hidden">
      <Search title="Home" />

      <div className="relative h-[40vh] my-8 rounded-2xl overflow-hidden">
        <img
          src="https://github.com/HashenUdara/edoc-doctor-appointment-system/blob/main/img/b3.jpg?raw=true"
          alt="main bg"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="relative z-10  h-full w-full flex flex-col justify-center text-black px-10">
          <h2 className="text-lg font-semibold">Welcome</h2>
          <h2 className="text-3xl font-bold">AMAN</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed">
            Not sure where to start? Explore{" "}
            <span className="font-semibold">All Doctors</span> or check{" "}
            <span className="font-semibold">Sessions</span> to track your
            appointments and arrival times for your doctor.
          </p>
          <h3 className="mt-3 text-base font-semibold">
            Channel a Doctor Here
          </h3>
          <div className="mt-4">
            <Link
              to="/home/sessions"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-base"
            >
              View Sessions
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-2">Status</h3>

          <div className="flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white shadow">
            <div>
              <h4 className="text-lg font-bold">{info ? info.doctors : "0"}</h4>
              <p className="text-gray-600 text-sm">All Doctors</p>
            </div>
            <div className="bg-gray-200 p-2 rounded">
              <BriefcaseMedical size={36} />
            </div>
          </div>

          <div className="flex items-center justify-between border border-gray-300 p-4 rounded-md bg-white shadow">
            <div>
              <h4 className="text-lg font-bold">
                {info ? info.appointment : "0"}
              </h4>
              <p className="text-gray-600 text-sm">Appointments</p>
            </div>
            <div className="bg-gray-200 p-2 rounded">
              <AudioWaveform size={36} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <h3 className="text-xl font-bold mb-4">All Sessions</h3>
          <div className="overflow-x-auto max-h-[300px] rounded-md border border-gray-300 bg-white shadow">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-3 py-2">Appoint. No.</th>
                  <th className="px-3 py-2">Session Title</th>
                  <th className="px-3 py-2">Doctor</th>
                  <th className="px-3 py-2">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {info?.appointments && info.appointments.length > 0 ? (
                  info.appointments.map((appointment, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="py-3">{appointment.appointment}</td>
                      <td>{appointment.tittle}</td>
                      <td>{appointment.doctor}</td>
                      <td>{new Date(appointment.date).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No Sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHome;
