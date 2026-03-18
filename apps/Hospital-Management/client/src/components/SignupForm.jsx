import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { login } from "../redux/userSlice";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SignupForm = () => {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const res = await fetch(`"${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        dispatch(
          login({
            userName: data.user.userName,
            userId: data.user._id,
            role: data.user.role,
          })
        );
        localStorage.setItem("id", JSON.stringify(data.user._id));
        navigate("/");
        window.location.reload();
      } else {
        console.log(data);
        setError(data.message);
        alert("Faield to Signup");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="fixed inset-0 z-40 bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-2xl p-6 w-full max-w-md space-y-5 text-base"
      >
        <div className="text-center text-xl font-semibold text-gray-800">
          <h2> Signup Form</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Full Name</label>
          <input
            onChange={handleInput}
            onBlur={handleBlur}
            className=" border rounded px-3 py-2 focus:outline-blue-400"
            type="text"
            id="userName"
            value={formData.userName}
            placeholder="Full Name"
          />
        </div>
        {isNameInvalid && (
          <p className="text-sm text-red-600">Please enter valid Name</p>
        )}
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInput}
            onBlur={handleBlur}
            className=" border rounded px-3 py-2 focus:outline-blue-400"
            type="text"
            id="userEmail"
            placeholder="abc@gmailcom"
          />
          {isEmailInvalid && (
            <p className="text-sm text-red-600">Please enter valid email</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleInput}
            onBlur={handleBlur}
            className=" border rounded px-3 py-2 focus:outline-blue-400"
            type="password"
            id="userPassword"
            placeholder="Password"
          />
          {isPassInvalid && (
            <p className="text-sm text-red-600">Please enter valid passsword</p>
          )}
        </div>
        <div className="flex flex-col">
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Signup
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className=" text-sm flex">
          <p>
            Already have a account{" "}
            <Link className=" text-blue-600" to="/login">
              {" "}
              Login
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
