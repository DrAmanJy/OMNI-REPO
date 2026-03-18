import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddSessionForm from "../components/AddSessionForm";
import { deleteSessions, getSessions } from "../services/admin";
const Sessions = () => {
  const [showAddSession, setShowSession] = useState(false);
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    getSessionData();
  }, []);
  const getSessionData = async () => {
    const res = await getSessions();
    setSessions(res.sessions);
  };
  const handleDelete = async (id) => {
    const res = await deleteSessions(id);
    alert(res.message);
    getSessionData();
  };
  return (
    <div className="p-6 space-y-6">
      {showAddSession && (
        <AddSessionForm
          showForm={showAddSession}
          setShowForm={setShowSession}
          refreshFunction={getSessionData}
        />
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Sessions</h2>
        <button
          onClick={() => setShowSession(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border border-gray-200 shadow-sm rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">Title</th>
              <th className="px-4 py-3 border-b border-gray-200">Doctor</th>
              <th className="px-4 py-3 border-b border-gray-200">
                Date & Time
              </th>
              <th className="px-4 py-3 border-b border-gray-200">Slots Left</th>
              <th className="px-4 py-3 border-b border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions && sessions.length > 0 ? (
              sessions.map((session) => (
                <tr
                  key={session._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-gray-800 text-center">
                    {session.tittle}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {session.doctor}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {new Date(session.date).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {session.leftSlot}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sessions;
