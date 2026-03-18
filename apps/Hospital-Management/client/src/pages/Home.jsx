import { Link } from "react-router";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLogin } = useSelector((state) => {
    return state.userSlice;
  });
  return (
    <div className=" w-full">
      <img className=" w-screen h-screen absolute z-0" src="bg01.jpg" alt="" />
      <div className=" relative z-10">
        <div className=" flex justify-between mx-10 text-xl font-medium py-5">
          <div>
            <h2>eDoc</h2>
          </div>
          <ul className=" flex justify-between gap-10 text-gray-600">
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">REGISTER</Link>
          </ul>
        </div>
        <div className=" flex justify-center h-[90vh] w-screen items-center">
          <div className=" w-2/4 flex flex-col gap-10 items-center">
            <h1 className=" text-5xl font-medium ">Avoid Hassles & Dealys.</h1>
            <p className="text-gray-950">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
              voluptate, tenetur in labore illum earum. Enim atque veritatis
              aliquid suscipit, dicta eaque! Repellat modi ipsum odio beatae
              nihil alias inventore!
            </p>
            <Link
              to={isLogin ? `/home/main` : "/home"}
              className=" py-2 px-4 bg-blue-500 rounded transition-colors text-xl duration-200 hover:bg-blue-600 cursor-pointer"
            >
              Make Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
