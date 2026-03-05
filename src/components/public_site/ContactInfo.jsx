import Card from "./Card";
import { contactInfo } from "../../data/contactData";

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {contactInfo.map((info, idx) => (
        <div key={info.title}>
          <Card hover className="h-full group flex flex-col items-center text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-college-navy/5 flex items-center justify-center mb-5 group-hover:bg-college-gold transition-colors border border-college-navy/10">
              <info.icon className="h-6 w-6 md:h-7 md:w-7 text-college-navy group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-serif font-bold text-college-navy mb-3">
              {info.title}
            </h3>
            <div className="space-y-1.5 flex-1">
              {info.details.map((detail) => (
                <p key={detail} className="text-gray-600 text-sm font-medium">
                  {detail}
                </p>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
