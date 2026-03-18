import { useState } from "react";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AddSessionForm2 = ({ setShowForm, refreshFunction }) => {
  const [error, setError] = useState();
  const { userEmail } = useSelector((state) => {
    return state.userSlice;
  });

  const [formData, setFormData] = useState({
    sessionTitle: "",
    doctorEmail: userEmail,
    time: "",
    slot: "",
  });

  const [isBlur, setBlur] = useState({
    sessionTitle: false,
    time: false,
    slot: false,
  });

  const handleBlur = (e) => {
    const { id } = e.target;
    setBlur((prev) => ({ ...prev, [id]: true }));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setBlur((prev) => ({ ...prev, [id]: false }));
  };

  const isTitleInvalid =
    isBlur.sessionTitle && formData.sessionTitle.trim().length < 3;
  const isDoctorInvalid =
    isBlur.doctorEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.doctorEmail);
  const isTimeInvalid = isBlur.time && !formData.time.trim();
  const isSlotInvalid =
    isBlur.slot &&
    (!formData.slot || isNaN(formData.slot) || Number(formData.slot) <= 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isTitleInvalid || isDoctorInvalid || isTimeInvalid || isSlotInvalid) {
      setError("Please correct the highlighted fields.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/admin/sessions`, {
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
        setError(data.message || "Failed to add session.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-100 p-8 rounded-2xl shadow-md flex flex-col gap-6 text-lg"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Add Session
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="sessionTitle">Session Title</label>
          <input
            id="sessionTitle"
            type="text"
            placeholder="Enter session title"
            value={formData.sessionTitle}
            onChange={handleInput}
            onBlur={handleBlur}
            className="border p-2 rounded text-base focus:outline-blue-400"
          />
          {isTitleInvalid && (
            <p className="text-red-600 text-sm">Enter a valid session title.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="time">Date & Time</label>
          <input
            id="time"
            type="datetime-local"
            value={formData.time}
            onChange={handleInput}
            onBlur={handleBlur}
            className="border p-2 rounded text-base focus:outline-blue-400"
          />
          {isTimeInvalid && (
            <p className="text-red-600 text-sm">Enter a valid date and time.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slot">Max Can Book</label>
          <input
            id="slot"
            type="number"
            placeholder="Enter slot count"
            value={formData.slot}
            onChange={handleInput}
            onBlur={handleBlur}
            className="border p-2 rounded text-base focus:outline-blue-400"
          />
          {isSlotInvalid && (
            <p className="text-red-600 text-sm">Enter a valid slot number.</p>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
          <button
            type="button"
            className="w-full  text-white py-2 rounded bg-red-500 hover:bg-red-600 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-red-700 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddSessionForm2;
