import { Bookmark,BriefcaseMedical,Accessibility ,LayoutDashboard ,AlarmClock  } from 'lucide-react';

const UserLayout = ({children}) => {
  return (
    <div className=" w-screen flex">
        <div className="w-1/4 h-screen border-r-1 border-gray-200">
          <div className=" p-5 w-full">
            <div className=" flex flex-col gap-5 p-10">
              <div className=" flex items-center gap-5">
                <img src="user.png" className=" w-1/4 rounded-full" />{" "}
                <div>
                  <h2 className=" text-3xl">Administrator</h2>
                  <h3>admin@gmail.com</h3>
                </div>
              </div>
              <div className=" w-full text-center ">
                <button className=" bg-blue-300 w-full py-1 rounded hover:bg-blue-400">
                  Logout
                </button>
              </div>
            </div>
            <hr className=" text-gray-200" />
            <div className=" flex flex-col font-bold items-center gap-10 pt-10">
              <div className=" w-1/2 flex gap-3 p-2 "> <LayoutDashboard/><h3>Dashboard</h3></div>
              <div className=" w-1/2 flex gap-3 p-2 active"><BriefcaseMedical /> <h3>Doctor</h3></div>
              <div className=" w-1/2 flex gap-3 p-2 "><AlarmClock /> <h3>Schedule</h3></div>
              <div className=" w-1/2 flex gap-3 p-2"><Bookmark/> <h3>Appointment</h3></div>
              <div className=" w-1/2 flex gap-3 p-2"> <Accessibility /><h3>Patients</h3></div>

            </div>
          </div>
        </div>
        <div className="w-3/4 ">{children}</div>
      </div>
  )
}

export default UserLayout
