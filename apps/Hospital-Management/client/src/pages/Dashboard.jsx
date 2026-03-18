import {
  BriefcaseMedical,
  Accessibility,
  Bookmark,
  AudioWaveform,
} from "lucide-react";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { getInfo } from "../services/admin";

const Dashboard = () => {
    const [info, setInfo] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = await getInfo();
    setInfo(data);
  };
  return (
    <div className="p-6 space-y-6">
      <Search title={"Dashboard "} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div>
            <h4 className="text-2xl font-bold">{info? info.doctors:"0"}</h4>
            <p className="text-gray-600 text-sm">Doctors</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <BriefcaseMedical size={32} className="text-blue-600" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div>
            <h4 className="text-2xl font-bold">{info? info.patients:"0"}</h4>
            <p className="text-gray-600 text-sm">Patients</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <Accessibility size={32} className="text-green-600" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div>
            <h4 className="text-2xl font-bold">{info? info.appointment:"0"}</h4>
            <p className="text-gray-600 text-sm">New Bookings</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <Bookmark size={32} className="text-purple-600" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div>
            <h4 className="text-2xl font-bold">{info? info.sessions:'0'}</h4>
            <p className="text-gray-600 text-sm">Sessions</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <AudioWaveform size={32} className="text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
