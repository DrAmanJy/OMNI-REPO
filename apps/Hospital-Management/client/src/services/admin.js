const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const getDoctors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/doctors`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getMedicine = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/medicine`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const giveMedicine = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/doctor/medicine`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const getPatients = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/patients`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getAppointment = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/appointment`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getSessions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/sessions`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteDoctor = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/doctor/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/user/doctor/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteSessions = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/sessions/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getDoctorSessions = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/doctor/sessions/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const getInfo = async () => {
  try {
    const res = await fetch(`${BASE_URL}/admin/info`, {
      method: "GET",
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const givMedicines = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/medicine/${id}`, {
      method: "PUT",
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
export const createDoctor = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/doctor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.error(error.message);
  }
};
