import { useState, useEffect } from "react";
import { BriefcaseMedical } from "lucide-react";
import Search from "../components/Search";
import AccountDetails from "../components/AccountDetails";
import DeleteAccount from "../components/DeleteAccount";
import UpdateProfile from "../components/UpdateProfile";

const Setting = () => {
  const [showinformation, setShowinformation] = useState(false);
  const [showDeleteAccount, setDeleteAccount] = useState(false);
  const [showUpdateProfile, setUpdateProfile] = useState(false);

  return (
    <div className="p-6 md:p-10">
      {showinformation && <AccountDetails setShowForm={setShowinformation} />}
      {showDeleteAccount && <DeleteAccount setShowForm={setDeleteAccount} />}
      {showUpdateProfile && <UpdateProfile setShowForm={setUpdateProfile} />}

      <Search title="Setting" />

      <div className="py-5 flex flex-col gap-6">
        <div onClick={() => setUpdateProfile(true)} className="flex items-center p-5 gap-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="bg-gray-300 p-3 rounded-xl">
            <BriefcaseMedical size={40} />
          </div>
          <div>
            <h2 className="text-blue-600 font-bold text-xl sm:text-2xl">
              Account Settings
            </h2>
            <p className="text-gray-600">
              Edit your account details & change password
            </p>
          </div>
        </div>

        <div
          onClick={() => setShowinformation(true)}
          className="flex items-center p-5 gap-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="bg-gray-300 p-3 rounded-xl">
            <BriefcaseMedical size={40} />
          </div>
          <div>
            <h2 className="text-blue-600 font-bold text-xl sm:text-2xl">
              View Account Details
            </h2>
            <p className="text-gray-600">
              View personal information about your account
            </p>
          </div>
        </div>

        <div onClick={() => setDeleteAccount(true)} className="flex items-center p-5 gap-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="bg-gray-300 p-3 rounded-xl">
            <BriefcaseMedical size={40} />
          </div>
          <div>
            <h2 className="text-red-600 font-bold text-xl sm:text-2xl">
              Delete Account
            </h2>
            <p className="text-gray-600">
              Will permanently remove your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
