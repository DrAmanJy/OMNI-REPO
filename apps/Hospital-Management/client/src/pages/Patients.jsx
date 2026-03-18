import Search from "../components/Search";
import AddDoctorForm from "../components/AddDoctorForm";
import { useEffect, useState } from "react";
import { deleteUser, getPatients } from "../services/admin";

const Patients = () => {
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [patients, setPatients] = useState(null);
  useEffect(() => {
    getDoctorsData();
  }, []);
  const getDoctorsData = async () => {
    const data = await getPatients();
    setPatients(data.users);
  };
  const handleDelete = async (id) => {
    const res = await deleteUser(id);
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

      <Search title="All Patients" />

      <div className="overflow-x-auto py-6">
        <table className="w-full text-center border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">
                Patiens Name
              </th>
              <th className="px-4 py-3 border-b border-gray-200">Email</th>
              <th className="px-4 py-3 border-b border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {patients && patients.length > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-center text-gray-800">
                    {patient.userName}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {patient.userEmail}
                  </td>
                  <td className="px-4 py-3 flex justify-center">
                    <button
                      onClick={() => handleDelete(patient._id)}
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
                  No Patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
