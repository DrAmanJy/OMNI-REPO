const projectData = [
  {
    title: "Hospital Management System",
    type: "Full Stack App",
    year: 2025,
    bg: "/project-bg-1.jpg",
    video:
      "https://www.youtube-nocookie.com/embed/p6gmoXM4y-s?autoplay=1&mute=1&controls=0&loop=1&playlist=p6gmoXM4y-s&disablekb=1&modestbranding=1&rel=0",
  },
  {
    title: "TaskStrom",
    type: "Task Management App",
    year: 2025,
    bg: "/project-bg-3.jpg",
    video: "",
  },
  {
    title: "Plane Ticket Booking App",
    type: "Booking Platform",
    year: 2025,
    bg: "/project-bg-2.jpg",
    video: "",
  },
  {
    title: "WhatsApp Clone",
    type: "Chat Application",
    year: 2025,
    bg: "/project-bg-1.jpg",
    video: "",
  },
  {
    title: "E-Commerce Website",
    type: "Online Store",
    year: 2025,
    bg: "/project-bg-3.jpg",
    video: "",
  },
];

const SelectedProjects = () => {
  return (
    <>
      <div
        id="projects"
        className="text-3xl md:text-[7vw] font-extrabold my-10 text-white"
      >
        SELECTED PROJECTS/
      </div>
      <div className="flex flex-col min-h-screen bg-black text-white px-4 py-10 gap-32">
        {projectData.map((project, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="relative overflow-hidden aspect-video rounded-lg cursor-pointer">
              <img
                src={project.bg}
                alt="Project Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <div className="relative z-10 w-[80%] aspect-video mx-auto mt-[5%] rounded-lg overflow-hidden shadow-lg pointer-events-none">
                {project.video && (
                  <iframe
                    className="w-full h-full"
                    src={project.video}
                    title="Embedded YouTube Video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="text-base text-blue-400 font-mono">
                  {project.type}
                </h3>
                <h2 className="text-2xl font-bold">{project.title}</h2>
              </div>
              <div className="flex gap-2 items-end mt-2 md:mt-0">
                <span className="text-sm border border-gray-500 px-3 py-1 rounded-full">
                  Development
                </span>
                <span className="text-sm border border-gray-500 bg-gray-400 text-black px-3 py-1 rounded-full">
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectedProjects;
