import { useState } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddDoctorForm = ({ showForm, setShowForm, refreshFunction }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [isBlur, setBlur] = useState({
    userName: false,
    userEmail: false,
    userPassword: false,
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
  const isNameInvalid = isBlur.userName && formData.userName.length < 3;
  const isEmailInvalid =
    isBlur.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail);
  const isPassInvalid = isBlur.userPassword && formData.userPassword.length < 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      console.log(formData);
      const res = await fetch(`${BASE_URL}/admin/doctor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowForm(false);
        refreshFunction();
      } else {
        setError(data.message);
        alert("Faield to add Doctor");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(error);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-white flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 shadow-lg rounded-2xl p-8 max-w-lg w-full space-y-6"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Add Doctor</h2>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="Full Name"
              className="border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {isNameInvalid && (
              <p className="text-sm text-red-600">Please enter a valid name.</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="userEmail"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="abc@example.com"
              className="border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {isEmailInvalid && (
              <p className="text-sm text-red-600">
                Please enter a valid email.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="userPassword"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="userPassword"
              name="userPassword"
              type="password"
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="Password"
              className="border rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {isPassInvalid && (
              <p className="text-sm text-red-600">
                Please enter a valid password.
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-red-500 hover:bg-red-600 text-white  px-6 py-2 rounded-md "
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-center text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default AddDoctorForm;
