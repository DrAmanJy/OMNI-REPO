const skills = [
  {
    id: "01",
    title: "Full-Stack Development",
    desc: "I build complete web applications using the MERN stack. From responsive user interfaces to secure backend APIs, I deliver performant and maintainable full-stack solutions.",
    tools: [
      "React, Node.js, Express.js",
      "MongoDB, Mongoose, REST APIs",
      "Git, GitHub, Postman",
    ],
    top: "top-[11vh]",
  },
  {
    id: "02",
    title: "Frontend Development",
    desc: "I focus on building fast, responsive, and accessible user interfaces with clean, component-based design patterns using React and TailwindCSS.",
    tools: [
      "React, JSX, TailwindCSS",
      "HTML5, CSS3, JavaScript (ES6+)",
      "Responsive & Component-Based Design",
    ],
    top: "top-[25vh]",
  },
  {
    id: "03",
    title: "Backend Development",
    desc: "I build robust and scalable backends using Node.js and Express. I implement RESTful APIs, middleware, authentication, and integrate MongoDB for secure data handling.",
    tools: [
      "Node.js, Express.js, Middleware",
      "MongoDB, Mongoose, CRUD Operations",
      "dotenv, CORS, Helmet, Postman",
    ],
    top: "top-[39vh]",
  },
];

const IKnow = () => {
  return (
    <div id="skills">
      <div className="text-4xl md:text-[7vw] font-extrabold my-10 text-white">
        WHAT I KNOW/
      </div>
      <div className="h-[210vh]">
        <div className="w-full mb-20">
          <p className="max-w-xl text-md md:ml-[40vw] lg:ml-[50vw] 2xl:ml-[60vw] md:text-lg 2xl:text-2xl">
            I’m a MERN stack developer skilled in building scalable, full-stack
            applications with a strong emphasis on clean code, modular
            architecture, and performance optimization. I craft intuitive user
            interfaces with React, robust APIs with Node and Express, and
            efficient data models with MongoDB—all aligned to deliver seamless
            digital experiences.
          </p>
        </div>

        {skills.map(({ id, title, desc, tools, top }) => (
          <div key={id} className={`sticky ${top} border-t bg-black pt-10`}>
            <div className="flex flex-col md:grid md:grid-cols-12 items-center gap-x-4">
              <span className="col-span-2 text-2xl text-[#bcb7af] font-semibold">
                ({id})
              </span>
              <h3 className="col-span-8 col-start-6 text-2xl md:text-4xl font-bold py-4">
                {title}
              </h3>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-12 min-h-[40vh] gap-6 pt-6">
              <div className="col-span-7 col-start-6 flex flex-col gap-6">
                <p className="text-base md:text-lg max-w-[40ch] text-neutral-300">
                  {desc}
                </p>
                <div className="flex flex-col divide-y divide-gray-700">
                  {tools.map((tool, i) => (
                    <span
                      key={i}
                      className="flex items-start gap-4 py-2 text-lg font-semibold text-blue-300"
                    >
                      <span className="text-sm font-mono text-neutral-500 leading-[200%]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IKnow;
