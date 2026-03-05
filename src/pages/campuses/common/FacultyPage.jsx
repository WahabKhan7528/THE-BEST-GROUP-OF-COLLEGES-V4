import { useLocation } from "react-router-dom";
import Section from "../../../components/public_site/Section";
import FacultyComponent from "../../../components/public_site/FacultyComponent";
import GSAPReveal from "../../../components/shared/GSAPReveal";

const FacultyPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let campusName = "";
  if (path.includes("/main")) campusName = "Main Campus";
  else if (path.includes("/law")) campusName = "Law College";
  else if (path.includes("/hala")) campusName = "Hala Campus";

  return (
    <div className="min-h-screen bg-white">
      <Section background="white" spacing="standard">
        <GSAPReveal>
          <Section.Header
            title="Our Faculty"
            badge={campusName || "Faculty"}
            description="Meet the dedicated educators who shape the future of our students."
          />
        </GSAPReveal>
        <GSAPReveal y={40} delay={0.2}>
          <FacultyComponent filterCampus={campusName} />
        </GSAPReveal>
      </Section>
    </div>
  );
};

export default FacultyPage;