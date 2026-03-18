import { useEffect, useState } from "react";
import { getPatients, giveMedicine } from "../services/admin";
import { useSelector } from "react-redux";


const DoctorPharmesy = () => {
const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  const [users, setUsers] = useState(null);
  const [formData, setFormData] = useState({
    disease: "",
    medicine: "",
    userId: "",
    doctorId: userId,
  });
  const [isBlur, setBlur] = useState({
    disease: false,
    medicine: false,
    userId: false,
  });
  const [error, setError] = useState();

  const handleBlur = (e) => {
    const { id } = e.target;
    setBlur((prev) => ({ ...prev, [id]: true }));
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setBlur((prev) => ({ ...prev, [id]: false }));
  };
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const data = await getPatients();
    setUsers(data.users);
  };

  const isDiseaseInvalid = isBlur.disease && formData.disease.length < 3;
  const isMedicinelInvalid = isBlur.medicine && formData.medicine.length < 3;
  let isUserIdInvalid = isBlur.userId && formData.userId === "";
  isUserIdInvalid = isBlur.userId && formData.userId === "null";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const data = await giveMedicine(formData);
      alert(data.message);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className=" w-full mt-10 bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-2xl p-6 w-full max-w-md space-y-5 text-base"
      >
        <div className="text-center text-xl font-semibold text-gray-800">
          <h2>Give Medicine</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="disease">Disease</label>
          <input
            onChange={handleInput}
            onBlur={handleBlur}
            className=" border rounded px-3 py-2 focus:outline-blue-400"
            type="text"
            id="disease"
            value={formData.disease}
            placeholder="Disease Name"
          />
          {isDiseaseInvalid && (
            <p className="text-sm text-red-600">Please enter valid Disease</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="medicine">Medicine</label>
          <textarea
            rows={8}
            onChange={handleInput}
            onBlur={handleBlur}
            className="resize-none border rounded px-3 py-2 focus:outline-blue-400"
            type="text"
            id="medicine"
            value={formData.medicine}
            placeholder="Medicine"
          />
          {isMedicinelInvalid && (
            <p className="text-sm text-red-600">Please enter Medicine</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="noUser">Select User</label>
          <select
            onChange={handleInput}
            onBlur={handleBlur}
            className=" border rounded px-3 py-2 focus:outline-blue-400"
            type="password"
            id="userId"
            value={formData.userId}
            placeholder="New Password"
          >
            <option value="null">-Select User-</option>
            {users &&
              users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>
                    {user.userName}
                  </option>
                );
              })}
          </select>
          {isUserIdInvalid && (
            <p className="text-sm text-red-600">Please enter User </p>
          )}
        </div>
        <div className="flex ">
         
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
           Give
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default DoctorPharmesy