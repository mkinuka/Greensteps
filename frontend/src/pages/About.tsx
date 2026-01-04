import GreenStepsLogo from "../assets/GreenSteps-removebg-preview.png";
import animate1 from "../assets/animate1.png";
import animate2 from "../assets/animate2.png";

export const About = () => {
  return (
    <>
      <div className="mr-[10vw] ml-[10vw] mt-[2vh] p-8 rounded-lg max-[1200px]:mr-[2vw] max-[1200px]:ml-[2vw]">
        <section className="flex items-center gap-8 max-[1200px]:flex-col">
          <img src={GreenStepsLogo} alt="logo" className="rounded-4xl min-[2000px]:w-[600px]"></img>
          <div className=" backdrop-blur-lg bg-white/10 shadow-xl p-6 min-[2000px]:p-10 rounded-tl-[55px] rounded-tr-lg rounded-bl-lg rounded-br-[55px]">
            <h3 className="text-black text-5xl min-[2000px]:text-7xl font-bold">About Greensteps</h3>
            <p className="text-black text-xl min-[2000px]:text-3xl font-semibold mb-4 md:text-base">
              GreenSteps is a daily carbon footprint tracker designed to make
              climate impact visible, understandable, and actionable. Our goal
              is to help individuals better understand how everyday choices
              affect the planet — and empower them to take small, meaningful
              steps toward a more sustainable lifestyle.
            </p>
            <p className="text-black text-lg min-[2000px]:text-2xl mb-3">
              With GreenSteps, users can log their daily activities such as:
            </p>
            <ul className="text-black text-lg min-[2000px]:text-2xl list-disc list-inside mb-4 space-y-2">
              <li>Distances traveled by car</li>
              <li>The food they eat</li>
              <li>Clothing and other consumer goods they purchase</li>
            </ul>
            <p className="text-black text-lg min-[2000px]:text-2xl">
              By translating these actions into carbon emissions, GreenSteps
              gives users a clearer picture of their personal environmental
              footprint over time.
            </p>
          </div>
        </section>

        {/* section two */}
        <section className="flex items-center gap-8 my-20 max-[1200px]:flex-col">
            <img
              className="h-96 min-[2000px]:h-[550px] w-auto rounded-tr-lg rounded-tl-[40px] rounded-bl-lg rounded-br-lg min-[1200px]:hidden  "
              src={animate2}
              alt="mascot"
            />
          <div className=" backdrop-blur-lg bg-green-800/10 shadow-xl flex-1 p-6 min-[2000px]:p-10 rounded-tl-lg rounded-tr-[55px] rounded-bl-[55px] rounded-br-lg">
            <h3 className="text-black text-5xl min-[2000px]:text-7xl font-bold mb-4">
              Data & Transparency
            </h3>
            <p className="text-black text-lg min-[2000px]:text-2xl">
              All emission data used in GreenSteps is based on research from Our
              World in Data, one of the most trusted and widely used open-data
              platforms for global development and environmental research. Our
              World in Data collaborates with leading scientific institutions,
              universities, and international organizations such as the IPCC,
              UN, FAO, and academic researchers worldwide. Their data is
              collected from peer-reviewed studies, government reports, and
              large-scale datasets, and is continuously reviewed, updated, and
              made publicly accessible. By building GreenSteps on open and
              transparent data, we aim to ensure credibility, accuracy, and
              trust — while making complex climate data accessible to everyone.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              className="h-96 min-[2000px]:h-[550px] w-auto rounded-tr-lg rounded-tl-[40px] rounded-bl-lg rounded-br-lg max-[1200px]:hidden  "
              src={animate2}
              alt="mascot"
            />
          </div>
        </section>

        {/* Section three */}
        <section className="flex items-center gap-8 my-20 mb-0 max-[1200px]:flex-col">
          <img
            className="h-96 min-[2000px]:h-[550px] w-auto mr-6 rounded-tr-[40px] rounded-tl-4 rounded-bl-lg rounded-br-lg"
            src={animate1}
            alt="mascot"
          />
          <div className="backdrop-blur-lg bg-green-400/10 shadow-xl p-6 min-[2000px]:p-10 rounded-tr-[55px] rounded-tl-lg rounded-bl-3xl rounded-br-[55px]">
            <h3 className="text-black text-5xl min-[2000px]:text-7xl font-bold">Our Mission</h3>
            <p className="text-black text-lg min-[2000px]:text-2xl">
              The climate challenge is no longer a distant problem — it is
              happening right now. Rising global temperatures, extreme weather
              events, biodiversity loss, and increasing pressure on natural
              resources affect communities all over the world. At GreenSteps,
              our mission is to: Increase awareness of personal climate impact
              Turn data into understanding Encourage better everyday decisions
              without guilt or pressure We believe real change happens when
              people are informed, not overwhelmed. While individual actions
              alone won’t solve the climate crisis, collective awareness and
              consistent small changes can drive larger systemic shifts.
              GreenSteps is not about perfection — it’s about progress. One step
              at a time.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
