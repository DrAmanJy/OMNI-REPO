const Header = () => {
  return (
    <header className="absolute top-0 z-40 w-full text-lg text-[#6b645c] font-medium">
      <nav className="mt-8 px-6 flex justify-between items-center">
        <div>MERN STACK DEVELOPER</div>
        <ul className="flex flex-col md:flex-row gap-3">
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
