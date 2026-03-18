import Search from "../components/Search";
import { useEffect, useState } from "react";
import { getMedicine, givMedicines } from "../services/admin";
const Pending = () => {
  const [medicines, setMedicines] = useState(null);
  useEffect(() => {
    getMedicineData();
  }, []);
  const getMedicineData = async () => {
    const res = await getMedicine();
    setMedicines(res.medicine);
  };
  const pendingMedicines = medicines?.filter(
    (medicine) => medicine.status === "ordered"
  );
  const handleGivBtn = async (userId) => {
    const res = await givMedicines(userId);
    alert(res.message);
    getMedicineData();
  };
  return (
    <div className="p-6">
      <Search title={"Pending Orders"} />
      <div className="py-10">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pendingMedicines && pendingMedicines.length > 0 ? (
            pendingMedicines.map((medicine) => (
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
                {medicine?.status === "ordered" && (
                  <button
                    onClick={() => handleGivBtn(medicine._id)}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold"
                  >
                    Give
                  </button>
                )}
              </div>
            ))
          ) : (
            <h3 className=" mx-auto  py-6 text-gray-500">
              No Medicine record found.{" "}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pending;
