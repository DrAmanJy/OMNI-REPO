import { Plus } from "lucide-react";
import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState } from "react";
import { getDoctors, deleteDoctor } from "../services/admin";

const Doctor = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState(null);
  useEffect(() => {
    getDoctorsData();
  }, []);
  const getDoctorsData = async () => {
    const data = await getDoctors();
    setDoctors(data.doctors);
  };
  const handleDelete = async (id) => {
    const res = await deleteDoctor(id);
    alert(res.message);
    getDoctorsData();
  };
  return (
    <div className="p-6 space-y-6">
      {showAddDoctor && (
        <AddDoctorForm
          showForm={showAddDoctor}
          setShowForm={setShowAddDoctor}
          refreshFunction={getDoctorsData}
        />
      )}

      <Search title="All Doctors" />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Add New Doctor</h2>
        <button
          onClick={() => setShowAddDoctor(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">
                Doctor Name
              </th>
              <th className="px-4 py-3 border-b border-gray-200">Email</th>
              <th className="px-4 py-3 border-b border-gray-200 text-center">
                Actions
              </th>
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
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-medium"
                    >
                      Remove
                    </button>
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

export default Doctor;
