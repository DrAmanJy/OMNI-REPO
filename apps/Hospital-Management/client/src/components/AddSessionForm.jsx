import { useState } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AddSessionForm = ({ setShowForm, refreshFunction }) => {
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    sessionTitle: "",
    doctorEmail: "",
    time: "",
    slot: "",
  });

  const [isBlur, setBlur] = useState({
    sessionTitle: false,
    doctorEmail: false,
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
        className="bg-gray-100 shadow-md rounded-2xl p-6 w-full max-w-md space-y-5 text-base"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Add Session
        </h2>

        <div className="flex flex-col">
          <label htmlFor="sessionTitle">Session Title</label>
          <input
            id="sessionTitle"
            name="sessionTitle"
            type="text"
            value={formData.sessionTitle}
            onChange={handleInput}
            onBlur={handleBlur}
            placeholder="Enter title"
            className="border rounded px-3 py-2 focus:outline-blue-400"
          />
          {isTitleInvalid && (
            <p className="text-sm text-red-600">Enter a valid session title.</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="doctorEmail">Doctor Email</label>
          <input
            id="doctorEmail"
            name="doctorEmail"
            type="email"
            value={formData.doctorEmail}
            onChange={handleInput}
            onBlur={handleBlur}
            placeholder="Enter email"
            className="border rounded px-3 py-2 focus:outline-blue-400"
          />
          {isDoctorInvalid && (
            <p className="text-sm text-red-600">Enter a valid doctor email.</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="time">Date & Time</label>
          <input
            id="time"
            name="time"
            type="datetime-local"
            value={formData.time}
            onChange={handleInput}
            onBlur={handleBlur}
            className="border rounded px-3 py-2 focus:outline-blue-400"
          />
          {isTimeInvalid && (
            <p className="text-sm text-red-600">Enter a valid date and time.</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="slot">Max Can Book</label>
          <input
            id="slot"
            name="slot"
            type="number"
            value={formData.slot}
            onChange={handleInput}
            onBlur={handleBlur}
            placeholder="Enter slot count"
            className="border rounded px-3 py-2 focus:outline-blue-400"
          />
          {isSlotInvalid && (
            <p className="text-sm text-red-600">Enter a valid slot number.</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full  text-white py-2 rounded bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-center text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AddSessionForm;
