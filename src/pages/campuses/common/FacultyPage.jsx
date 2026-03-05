import { useLocation } from "react-router-dom";
import Section from "../../../components/public_site/Section";
import SectionHeader from "../../../components/public_site/SectionHeader";
import FacultyGrid from "../../../components/public_site/FacultyGrid";
import CampusCta from "../../../components/public_site/CampusCta";

const FacultyPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let campusName = "";
  if (path.includes("/main")) campusName = "Main Campus";
  else if (path.includes("/law")) campusName = "Law College";
  else if (path.includes("/hala")) campusName = "Hala Campus";

  return (
    <div className="min-h-screen bg-white">
      <Section variant="white" className="py-12 md:py-16">
        <SectionHeader
          badge={campusName || "Faculty"}
          title="Our Faculty"
          description="Meet the dedicated educators who shape the future of our students."
          variant="light"
          centered
        />
      </Section>
      <FacultyGrid filterCampus={campusName} />

      <CampusCta
        badge="JOIN OUR FACULTY"
        title={<>Shape the <br /></>}
        highlightedWord="Future"
        description="Are you passionate about education? Join our world-class faculty and help us nurture the next generation of leaders."
        image="/maincampus.webp"
        primaryButton={{ text: "VIEW OPENINGS", to: "/contact" }}
        secondaryButton={{ text: "TALK TO US", to: "/contact" }}
      />
    </div>
  );
};

export default FacultyPage;