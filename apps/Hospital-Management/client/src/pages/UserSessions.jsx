import { Plus } from "lucide-react";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import { getSessions } from "../services/admin";
import { makeAppointment } from "../services/user";
import { useSelector } from "react-redux";

const UserSessions = () => {
  const [sessions, setSessions] = useState(null);
  const { userId } = useSelector((state) => {
    return state.userSlice;
  });
  useEffect(() => {
    getSessionData();
  }, []);
  const getSessionData = async () => {
    const res = await getSessions();
    setSessions(res.sessions);
  };

  const handleBookBtn = async (sessionId) => {
    const res = await makeAppointment({ sessionId, userId });
    alert(res.message);
    getSessionData();
  };
  return (
    <div className="p-6">
      <Search title={"Sessions"} />
      <div className="py-10">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sessions && sessions.length > 0 ?(sessions.map((session) => (
            <div
              key={session._id}
              className="border border-gray-300 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            >
              <h2 className="text-2xl text-blue-600 font-bold mb-2">
                {session.tittle}
              </h2>

              <div className="text-gray-700 text-sm space-y-1 mb-4">
                <p>
                  <span className="font-semibold">Doctor:</span>{" "}
                  {session.doctor}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(session.date).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Slots:</span>{" "}
                  {session.leftSlot}
                </p>
              </div>

              <button
                onClick={() => handleBookBtn(session._id)}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold"
              >
                Book Session
              </button>
            </div>
          ))):<h3  className="mx-auto py-6 text-gray-500 col-span-full text-center">No Appointment found. </h3> }
        </div>
      </div>
    </div>
  );
};

export default UserSessions;
