import { useEffect, memo, useMemo, useState } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, GraduationCap } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-12 mb-6 px-[5%]">
    <div className="inline-block relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
      <h2 
        className="relative text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-4 text-gray-300 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
      Crafting tomorrow&apos;s digital experiences today
      <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Enhanced gradient backgrounds */}
      <div className="absolute -inset-8 opacity-30 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-3xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-3xl animate-pulse-slow opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-3xl animate-float opacity-60" />
      </div>

      <div className="relative">
        <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-[0_0_60px_rgba(120,119,198,0.4)] transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_80px_rgba(120,119,198,0.6)]">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full z-20 transition-all duration-700 group-hover:border-white/50 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-blue-500/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="/saya.jpeg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-6 py-2 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-2">
          <p className="text-white font-semibold text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Available for Work
          </p>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
    <div className="relative z-10 bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-200 mb-2 font-semibold"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </div>
    </div>
  </div>
));
StatCard.displayName = 'StatCard';

const EducationCard = memo(() => (
  <div 
    className="relative bg-gradient-to-br from-[#6366f1]/10 via-gray-900/50 to-[#a855f7]/10 border border-[#6366f1]/30 rounded-2xl p-6 backdrop-blur-lg shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-full blur-3xl"></div>
    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-[#a855f7]/20 to-transparent rounded-full blur-3xl"></div>
    
    <div className="relative z-10 flex items-start gap-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <GraduationCap className="w-7 h-7 text-white" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-1">Politeknik Caltex Riau</h3>
        <p className="text-[#a855f7] font-semibold mb-2">Sistem Informasi</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          Fokus pada pengembangan web modern dengan teknologi terkini
        </p>
      </div>
    </div>
  </div>
));
EducationCard.displayName = 'EducationCard';

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => AOS.refresh(), 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions delivered",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#ec4899]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional credentials earned",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#8b5cf6]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous growth & learning",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="min-h-screen pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0 relative" 
      id="About"
    >
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
        }}
      />

      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]">
                  Hello, I&apos;m
                </span>
                <span 
                  className="block mt-3 text-white"
                  data-aos="fade-right"
                  data-aos-duration="1300"
                >
                  Fathur Rahman
                </span>
              </h2>
              
              <div 
                className="mt-4 flex items-center justify-center lg:justify-start gap-2"
                data-aos="fade-right"
                data-aos-duration="1400"
              >
                <div className="h-1 w-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full"></div>
                <span className="text-gray-400 text-sm uppercase tracking-wider">Web Developer</span>
              </div>
            </div>
            
            <p 
              className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed text-justify"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Mahasiswa <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] font-semibold">Sistem Informasi</span> di <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] font-semibold">Politeknik Caltex Riau</span> dengan fokus pada pengembangan web modern. Passionate dalam menciptakan pengalaman digital yang menarik dan fungsional menggunakan teknologi terkini.
            </p>

            <EducationCard />

            {/* Enhanced Quote Section */}
            <div 
              className="relative bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#a855f7]/10 border border-[#6366f1]/40 rounded-2xl p-6 backdrop-blur-md shadow-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#6366f1]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-[#a855f7]/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="absolute top-4 left-4 text-[#6366f1] opacity-40 group-hover:opacity-60 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 pl-8">
              
                <blockquote className="text-gray-200 text-center lg:text-left font-medium text-base">
                  Leveraging AI as a professional tool, not a replacement
                </blockquote>
              </div>
            </div>

            {/* Enhanced Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo" className="w-full sm:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="group w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                  <span>Download CV</span>
                </button>
              </a>
              
              <a href="#Portofolio" className="w-full sm:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="group w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-[#a855f7]/50 text-[#a855f7] font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 hover:bg-[#a855f7]/10 hover:border-[#a855f7] relative overflow-hidden"
                >
                  <Code className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                  <span>View Projects</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* Enhanced Stats Section */}
        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);