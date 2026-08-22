import LayoutShell from "./components/LayoutShell";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Skills from "./components/Skills";
import GitHubTasks from "./components/GitHubTasks";

function App() {
  return (
    <LayoutShell>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Work />
      <Skills />
      <Experience />
      <GitHubTasks />
      <Contact />
      <Footer />
      <ChatWidget />
    </LayoutShell>
  );
}

export default App;