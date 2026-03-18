const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const aboutMe = async (id) => {
  if (!id) {
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}/auth/about/${id}`, {
      method: "GET",
    });
    const x = await res.json();
    return x.user;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteAccount = async (id) => {
  if (!id) {
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}/auth/delete/${id}`, {
      method: "DELETE",
    });
    const x = await res.json();
    return x.user;
  } catch (error) {
    console.error(error.message);
  }
};
