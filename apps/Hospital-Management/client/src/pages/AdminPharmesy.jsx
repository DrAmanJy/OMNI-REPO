import Search from "../components/Search";
import { useEffect, useState } from "react";
import { getMedicine } from "../services/admin";


const AdminPharmesy = () => {
const [medicines, setMedicines] = useState(null);
  useEffect(() => {
    getMedicineData();
  }, []);
  const getMedicineData = async () => {
    const res = await getMedicine();
    setMedicines(res.medicine);
  };
  return (
    <div className="p-6">
      <Search title={"Medicine"} />
      <div className="py-10">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {medicines && medicines.length > 0 ?(medicines.map((medicine) => (
            <div
              key={medicine._id}
              className="border border-gray-300 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            >
             <h2 className="text-2xl text-blue-600 font-bold mb-2">
                  {medicine.userName}
                </h2>

                <div className="text-gray-700 text-sm space-y-1 mb-4">
                  <p>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {medicine.doctorName}
                  </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(medicine.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Medicine:</span>{" "}
                  {medicine.medicine}
                </p>
                <p>
                  <span className="font-semibold">Status</span>{" "}
                  {medicine.status}
                </p>
              </div>
              

             
            </div>
          ))):<h3  className="mx-auto py-6 text-gray-500 col-span-full text-center">No Appointment found. </h3> }
        </div>
      </div>
    </div>
  );
};

export default AdminPharmesy