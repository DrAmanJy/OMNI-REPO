import { Bookmark, Settings, LayoutDashboard, AlarmClock,Menu,
  User2, 
  Tablets} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { aboutMe } from "../services/auth";

const DoctorLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    let id = localStorage.getItem("id") || null;
    if (id) {
      id = JSON.parse(id);
    }
    let user = await aboutMe(id);
    setUser(user);
  }
  const logOut = () => {
    localStorage.clear("id");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-b shadow-sm bg-white z-20">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu size={28} />
        </button>
      </div>

      <div
        className={`bg-white border-r border-gray-200 z-30 md:relative fixed top-0 left-0 h-full w-3/4 md:w-1/4 transition-transform duration-300 ease-in-out 
      ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:flex`}
      >
        <div className="p-5 w-full">
          <div className="flex flex-col gap-5 p-6">
            <div className="flex items-center gap-5">
              <User2 size={30} className="w-1/4 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">{user?.userName}</h2>
                <h3 className="text-sm text-gray-600">{user?.userEmail}</h3>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={logOut}
                className="bg-blue-300 w-full py-1 rounded hover:bg-blue-400"
              >
                Logout
              </button>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />
          <nav className="flex flex-col font-semibold items-center gap-6 pt-4">
            <NavLink to={"main"}  className="flex items-center gap-3 p-2 w-2/3 hover:bg-gray-100 rounded">
              <LayoutDashboard />
              <h3>Dashboard</h3>
            </NavLink>
            <NavLink to={"sessions"}  className="flex items-center gap-3 p-2 w-2/3 hover:bg-gray-100 rounded">
              <Bookmark /> <h3>Sessions</h3>
            </NavLink>
            <NavLink to={"appointment"}  className="flex items-center gap-3 p-2 w-2/3 hover:bg-gray-100 rounded">
              <AlarmClock /> <h3>Appointment</h3>
            </NavLink>
            <NavLink to={"pharmesy"}  className="flex items-center gap-3 p-2 w-2/3 hover:bg-gray-100 rounded">
              <Tablets /> <h3>Pharmesy</h3>
            </NavLink>
            <NavLink to={"setting"}  className="flex items-center gap-3 p-2 w-2/3 hover:bg-gray-100 rounded">
              <Settings /> <h3>Settings</h3>
            </NavLink>
          </nav>
        </div>
      </div>
       {showSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div className="w-3/4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
