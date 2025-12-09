import React from 'react';
import { RESUME_DATA } from './constants';
import { Github, Linkedin, Mail, MapPin, Phone, Globe, Rocket, Cpu, Instagram, Facebook, Ghost, MessageCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-white">AF</div>
              <span className="font-bold text-lg tracking-wide">ABDULLAH FATHTHAH</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
          <PortfolioView />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Abdullah Faththah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PortfolioView = () => {
  const { personalInfo, education, certifications, skills, projects } = RESUME_DATA;

  const socialLinkClass = "flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors font-medium text-slate-700 hover:text-primary";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero / Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img 
            src={personalInfo.image} 
            alt={personalInfo.name} 
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-xl ring-2 ring-accent/20"
          />
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white" title="Available for work"></div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{personalInfo.name}</h1>
          <p className="text-xl text-accent font-medium mb-6">{personalInfo.role}</p>
          <p className="text-slate-600 mb-8 max-w-2xl leading-relaxed">{personalInfo.summary}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600 mb-8">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" /> {personalInfo.email}
            </a>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" /> {personalInfo.phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {personalInfo.location}
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-blue-50 hover:text-blue-700`}>
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-gray-200 hover:text-black`}>
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-emerald-50 hover:text-emerald-700`}>
              <Globe className="w-5 h-5" />
              <span>Website</span>
            </a>
            
            {personalInfo.instagram && (
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-pink-50 hover:text-pink-600`}>
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            )}
            {personalInfo.facebook && (
              <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-blue-50 hover:text-blue-600`}>
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
            )}
            {personalInfo.snapchat && (
              <a href={personalInfo.snapchat} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-yellow-50 hover:text-yellow-600`}>
                <Ghost className="w-5 h-5" />
                <span>Snapchat</span>
              </a>
            )}
            {personalInfo.x && (
              <a href={personalInfo.x} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-slate-200 hover:text-black`}>
                <XIcon className="w-4 h-4" />
                <span>X</span>
              </a>
            )}
            {personalInfo.wechat && (
              <a href={personalInfo.wechat} target="_blank" rel="noopener noreferrer" className={`${socialLinkClass} hover:bg-green-50 hover:text-green-600`}>
                <MessageCircle className="w-5 h-5" />
                <span>WeChat</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Skills & Certs */}
        <div className="space-y-8">
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b pb-2">
              <Cpu className="w-5 h-5 text-accent" /> Skills
            </h2>
            <div className="space-y-6">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-3">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-xs font-medium border border-slate-200 hover:border-accent hover:text-accent transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b pb-2">
              <Rocket className="w-5 h-5 text-accent" /> Certifications
            </h2>
            <ul className="space-y-3">
              {certifications.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Projects & Education */}
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Projects</h2>
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-accent transition-colors">{project.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-3 italic text-sm">{project.description}</p>
                  <ul className="space-y-1 mb-4">
                    {project.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-slate-700 text-sm flex items-start gap-2">
                        <span className="text-accent mt-1">›</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-2">Education</h2>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-accent" />
                  <h3 className="text-lg font-bold text-slate-800">{edu.degree}</h3>
                  <p className="text-accent font-medium">{edu.school}</p>
                  <p className="text-sm text-slate-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;
