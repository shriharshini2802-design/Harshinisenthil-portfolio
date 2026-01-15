
import React, { useState, useEffect } from 'react';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{name: string, image: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Qualification', id: 'qualification' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Passion', id: 'passion' }
  ];

  const socialLinks = [
    { platform: 'leetcode', url: 'https://leetcode.com/u/Shriharshini28/', icon: 'fa-solid fa-code' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/shriharshini-senthilkumar-47424333b/', icon: 'fa-brands fa-linkedin' },
    { platform: 'hackerrank', url: 'https://www.hackerrank.com/profile/hrshnsenthil', icon: 'fa-brands fa-hackerrank' }
  ];

  const certifications = [
    { 
      name: 'Python Full Stack Development', 
      issuer: 'Certification Authority',
      icon: 'fa-brands fa-python',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000',
      date: '2023'
    },
    { 
      name: 'Programming in Java', 
      issuer: 'NPTEL / Coursera',
      icon: 'fa-brands fa-java',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
      date: '2023'
    },
    { 
      name: 'E-commerce App Development', 
      issuer: 'Technical Workshop',
      icon: 'fa-solid fa-cart-shopping',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000',
      date: '2024'
    },
    { 
      name: 'Generative AI Content Creation', 
      issuer: 'Google Cloud / Coursera',
      icon: 'fa-solid fa-wand-magic-sparkles',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
      date: '2024'
    }
  ];

  return (
    <div className="min-h-screen purple-gradient-bg relative overflow-hidden text-white">
      {/* Dynamic BG elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-700/10 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[150px] rounded-full animate-float" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div className="absolute inset-0 bg-[#0f021d]/90 backdrop-blur-xl"></div>
          <div 
            className="relative max-w-5xl w-full glass rounded-[40px] overflow-hidden shadow-2xl border-white/10 flex flex-col md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full md:w-2/3 bg-black/40 flex items-center justify-center p-4">
              <img 
                src={selectedCert.image} 
                alt={selectedCert.name} 
                className="max-h-[70vh] w-auto rounded-xl shadow-2xl border border-white/5"
              />
            </div>
            <div className="w-full md:w-1/3 p-10 flex flex-col justify-center space-y-6">
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="space-y-2">
                <span className="text-purple-400 font-bold text-[10px] uppercase tracking-[0.3em]">Certificate Details</span>
                <h3 className="text-3xl font-black leading-tight">{selectedCert.name}</h3>
              </div>
              <p className="text-purple-100/60 font-light leading-relaxed">
                This certification validates expertise and proficiency in specialized technical domains within Computer Science.
              </p>
              <div className="pt-6">
                 <button 
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-4 bg-purple-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-purple-500 transition-all"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-6 ${scrolled || isMenuOpen ? 'glass py-4 shadow-2xl' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className="text-xs font-bold uppercase tracking-[0.2em] text-purple-200/50 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => setIsChatVisible(!isChatVisible)}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 ml-4"
            >
              Contact Me
            </button>
          </nav>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl relative z-50 w-10 h-10 flex items-center justify-center rounded-xl glass border-purple-500/20"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-purple-400 transition-transform duration-300`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#0f021d]/95 backdrop-blur-2xl z-40 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-12">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-black uppercase tracking-[0.3em] text-purple-200/50 hover:text-white transition-all"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setIsChatVisible(true); setIsMenuOpen(false); }}
              className="px-10 py-4 bg-purple-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-purple-500"
            >
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Floating AI Chat Integration */}
      <div className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 ${isChatVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="w-[350px] md:w-[400px]">
          <AIChat />
          <button 
            onClick={() => setIsChatVisible(false)}
            className="absolute -top-4 -right-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-xl hover:bg-purple-500 transition-all border-4 border-[#0f021d]"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      {!isChatVisible && (
        <button 
          onClick={() => setIsChatVisible(true)}
          className="fixed bottom-8 right-8 z-[55] w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-900/40 hover:bg-purple-500 hover:-translate-y-2 transition-all group"
        >
          <i className="fa-solid fa-ghost text-2xl group-hover:scale-110 transition-transform"></i>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
          </span>
        </button>
      )}

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-60 pb-40 px-8 flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.3em] text-purple-300 mx-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Available for Projects
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter">
              I'm <span className="gradient-text">SHRIHARSHINI S</span> <br />
              <span className="text-xl md:text-3xl block mt-4 font-light text-purple-100/60 uppercase tracking-[0.2em] leading-tight">A computer science student</span>
            </h1>
            
            <p className="text-base md:text-lg text-purple-200/40 leading-relaxed font-light max-w-2xl mx-auto">
              Passionate about developing clean, modern, and high-performance digital solutions while exploring the latest frontiers of computer science and technology.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <a href="#passion" className="px-10 py-4 bg-purple-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/40 hover:-translate-y-1">
                Explore My Work
              </a>
              <div className="flex items-center gap-8 px-6">
                {socialLinks.map(social => (
                  <a 
                    key={social.platform} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-200/40 hover:text-white transition-colors text-xl"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-8 glass border-y border-white/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tight uppercase">About <span className="text-purple-500">Me</span></h2>
              <div className="w-20 h-1 bg-purple-600 rounded-full"></div>
              <p className="text-lg text-purple-100/60 leading-relaxed font-light">
                I am a dedicated Computer Science student with a keen eye for design and a drive for technical excellence. I believe that technology should not only be powerful but also aesthetically pleasing and user-centric. My journey is defined by continuous learning and building innovative tools that bridge the gap between complex code and intuitive design.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black gradient-text">3.7+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-purple-200/30">GPA Average</div>
                </div>
                <div>
                  <div className="text-4xl font-black gradient-text">9.4</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-purple-200/30">CGPA Average</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-600/20 rounded-3xl p-8 aspect-square flex items-center justify-center hover:bg-purple-600/30 transition-all border border-purple-500/10">
                <i className="fa-solid fa-laptop-code text-5xl text-purple-400"></i>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-white/5 mt-8">
                <i className="fa-solid fa-graduation-cap text-5xl text-purple-400/50"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Qualification Section */}
        <section id="qualification" className="py-32 px-8">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight uppercase mb-4">Qualification</h2>
            <p className="text-purple-200/30 max-w-2xl mx-auto font-light">My academic background and learning milestones.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { year: '2024 - Present', title: 'B.E in Computer Science', org: 'Paavai Engineering College' },
              { year: '2022 - 2024', title: 'Higher Secondary Education', org: 'M.D.V School' },
              { year: '2022', title: 'SSLC', org: 'M.D.V School' }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center group hover:bg-white/5 transition-all">
                <div className="text-purple-400 font-bold tracking-widest text-xs uppercase mb-2 md:mb-0">{item.year}</div>
                <div className="text-xl font-bold">{item.title}</div>
                <div className="text-purple-200/40 text-sm italic">{item.org}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-32 px-8 glass border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <h2 className="text-4xl font-black tracking-tight uppercase">Certifications</h2>
                <p className="text-purple-200/30 mt-2 font-light">Validated expertise through professional courses.</p>
              </div>
              <div className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-purple-500/10">
                {certifications.length} Credentials Verified
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, i) => (
                <div 
                  key={i} 
                  className="group relative glass rounded-[32px] overflow-hidden border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2 cursor-pointer shadow-xl shadow-black/20"
                  onClick={() => setSelectedCert({ name: cert.name, image: cert.image })}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f021d] via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <i className="fa-solid fa-expand text-xs"></i>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-3 relative z-10">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center mb-2">
                      <i className={`${cert.icon} text-lg text-purple-400`}></i>
                    </div>
                    <h4 className="font-bold text-sm tracking-wide leading-snug group-hover:text-purple-400 transition-colors">{cert.name}</h4>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-purple-200/20">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Passion Section */}
        <section id="passion" className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black tracking-tight uppercase mb-4">My Passion</h2>
              <p className="text-purple-200/30 max-w-2xl mx-auto font-light">Areas of computer science and technology that inspire me.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Web Development', desc: 'Building modern, high-performance web applications using the latest technologies.', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800' },
                { title: 'Data Analyst', desc: 'Transforming raw data into meaningful insights to drive informed decisions.', img: 'https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=800' },
                { title: 'UI/UX Design', desc: 'Crafting intuitive and visually stunning user experiences that delight users.', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=800' },
                { title: 'Prompt Engineering', desc: 'Mastering the art of communicating with AI to unlock its full potential.', img: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800' }
              ].map((item, i) => (
                <div key={i} className="group glass rounded-[40px] overflow-hidden hover:bg-white/5 transition-all">
                  <div className="h-64 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                  </div>
                  <div className="p-10 space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                    <p className="text-purple-200/40 font-light leading-relaxed">{item.desc}</p>
                    <div className="pt-4 flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                      Learn More <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-24 pb-12 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4">
             <p className="text-purple-200/20 text-xs font-bold uppercase tracking-[0.3em]">Personal Portfolio of Shriharshini S</p>
          </div>
          
          <div className="flex gap-8">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200/40 hover:text-white transition-all">
                {l.name}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-bold text-purple-200/20 uppercase tracking-widest text-center md:text-right leading-loose">
            © 2024 SHRIHARSHINI S <br />
            CS STUDENT • ESTD 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
