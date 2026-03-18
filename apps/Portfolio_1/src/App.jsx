import Contact from "./components/Contact";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IKnow from "./components/IKnow";
import SelectedProjects from "./components/SelectedProjects";

function App() {
  return (
    <>
      <Header />
      <Hero />

      <section className="bg-black z-10 relative rounded-4xl p-7 text-[#6b645c]">
        <IKnow />

        <SelectedProjects />
      </section>
      <Contact />
    </>
  );
}

export default App;
