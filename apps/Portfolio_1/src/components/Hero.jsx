const Hero = () => {
  return (
    <main className="bg-[#e8e8e3] mb-[-100vh]">
      <section className="sticky top-0 h-screen flex items-end px-6">
        <div className="w-full overflow-x-clip">
          <img
            src="/my_photo.jpg"
            alt="Aman Lathar"
            className="md:hidden h-[40vh] absolute top-20 z-0 max-w-lg rounded-lg object-cover object-center grayscale"
          />
          <h1 className="z-10 overflow-clip">
            <span className="md:hidden flex flex-col text-5xl font-semibold leading-[0.8] tracking-tight text-black">
              <span>AMAN</span>
              <span>LATHAR</span>
            </span>
            <span className="hidden md:block text-[15vw] font-extrabold uppercase leading-[0.8] tracking-tight text-black">
              AMAN LATHAR
            </span>
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-6 mt-10 z-10">
            <div className="w-full md:w-[32%] flex flex-col gap-10 pt-20">
              <p className="max-w-[32ch] text-base md:text-2xl xl:text-3xl font-medium leading-snug text-[#6b645c]">
                Full-stack JavaScript developer (MERN) dedicated to crafting
                efficient, scalable, and user-friendly web solutions with clean
                code and solid architecture.
              </p>
              <a href="#contact">
                <button className="rounded-full bg-gray-700 px-6 py-2 text-white font-bold text-xl hover:bg-blue-600 transition">
                  CONTACT
                </button>
              </a>
            </div>
            <div className="w-full md:w-[30%] flex justify-center items-center">
              <img
                src="/my_photo.jpg"
                alt="Aman Lathar"
                className="hidden md:block h-[50vh] max-w-lg rounded-lg object-cover object-center grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
            <div className="w-full md:w-[32%] flex flex-col items-end justify-end mb-20">
              <span className="max-w-[15ch] text-right font-mono text-sm sm:text-3xl font-medium uppercase leading-snug tracking-widest text-[#6b645c]">
                Available for work
              </span>
              <span className="text-4xl sm:text-8xl xl:text-9xl font-semibold uppercase leading-none tracking-tight text-black">
                Aug'10
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="h-screen" />
    </main>
  );
};

export default Hero;
