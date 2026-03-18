import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState } from "react";
import { getDoctors } from "../services/admin";

const UserDoctor = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState(null);
  useEffect(() => {
    getDoctorsData();
  }, []);
  const getDoctorsData = async () => {
    const data = await getDoctors();
    setDoctors(data.doctors);
  };

  return (
    <div className=" p-10">
      {showAddDoctor && (
        <AddDoctorForm
          showForm={showAddDoctor}
          setShowForm={setShowAddDoctor}
          refreshFunction={getDoctorsData}
        />
      )}
      <Search title={"All Doctors"} />
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">
                Doctor Name
              </th>
              <th className="px-4 py-3 border-b border-gray-200">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-gray-800">{doctor.userName}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {doctor.userEmail}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDoctor;
