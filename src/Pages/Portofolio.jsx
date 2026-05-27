import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase"; 
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, ExternalLink } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20"
  >
    {isShowingMore ? "See Less" : "See More"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${isShowingMore ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  // Data Projects langsung di sini
  const allProjects = [
    {
      id: 1,
      title: "Sistem Catering Management",
      description: "Aplikasi manajemen catering berbasis CodeIgniter dengan fitur pemesanan online, sistem pembayaran terintegrasi, tracking order real-time, dan dashboard analitik untuk monitoring bisnis.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/catering",
      tags: ["CodeIgniter", "PHP", "MySQL"],
      year: "2024"
    },
    {
      id: 2,
      title: "Posyandu Ibara",
      description: "Sistem informasi Posyandu digital untuk pencatatan kesehatan ibu dan anak, penjadwalan imunisasi otomatis, monitoring perkembangan balita, serta reporting kesehatan terintegrasi.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/posyandu",
      tags: ["Laravel", "MySQL", "Chart.js"],
      year: "2024"
    },
    {
      id: 3,
      title: "Huku Legal Platform",
      description: "Platform digital manajemen hukum dengan fitur document management system, case tracking, client portal, consultation scheduling, dan legal document generator.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/huku",
      tags: ["Laravel", "Vue.js", "PostgreSQL"],
      year: "2024"
    },
    {
      id: 4,
      title: "E-Letter Submission System",
      description: "Aplikasi digitalisasi pengajuan surat resmi dengan multi-level approval workflow, e-signature integration, status tracking real-time, dan notifikasi otomatis via email.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/e-letter",
      tags: ["Laravel", "Livewire", "MySQL"],
      year: "2024"
    },
    {
      id: 5,
      title: "Sistem Manajemen Data Warga",
      description: "Platform informasi kependudukan dengan fitur pencarian advanced, family tree visualization, demographic statistics, export data dalam berbagai format, dan dashboard interaktif.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/data-warga",
      tags: ["Laravel", "MySQL", "Chart.js"],
      year: "2023"
    },
    {
      id: 6,
      title: "Portal Berita Digital",
      description: "Platform berita online modern dengan CMS lengkap, multi-category management, advanced search, comment system, social media integration, dan SEO optimization untuk reach maksimal.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/portal-berita",
      tags: ["Laravel", "TinyMCE", "Bootstrap"],
      year: "2023"
    },
    {
      id: 7,
      title: "Advanced E-Letter Management",
      description: "Sistem pengajuan surat elektronik tingkat lanjut dengan fitur e-signature, customizable templates, multi-organization support, dan integrasi dengan sistem kepegawaian existing.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop",
      link: "https://github.com/yourusername/advanced-e-letter",
      tags: ["Laravel", "Redis", "Inertia.js"],
      year: "2024"
    }
  ];

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const certificatesResponse = await supabase
        .from("certificates")
        .select("*")
        .order('id', { ascending: true });

      if (certificatesResponse.error) throw certificatesResponse.error;

      const certificateData = certificatesResponse.data || [];
      
      if (certificateData.length > 0) {
        setCertificates(certificateData);
        localStorage.setItem("certificates", JSON.stringify(certificateData));
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedCertificates = localStorage.getItem('certificates');
    
    if (cachedCertificates) {
      try {
        setCertificates(JSON.parse(cachedCertificates));
      } catch (e) {
        console.error("Error parsing cached certificates:", e);
      }
    }
    
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? allProjects : allProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration="1000"
                    className="group relative h-full"
                  >
                    <div className="relative h-full bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
                      
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
                        
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&size=400&background=6366f1&color=fff&bold=true`;
                          }}
                        />
                        
                        {/* Year Badge */}
                        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                          <span className="text-xs font-semibold text-white">{project.year}</span>
                        </div>
                        
                        {/* Project Number */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center border-2 border-white/20 shadow-lg">
                            <span className="text-white font-bold text-sm">#{project.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative p-6 space-y-4 z-10">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                            {project.title}
                          </h3>
                          
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-purple-600/20 text-purple-300 text-xs font-medium rounded-lg border border-purple-500/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        {/* Button */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {allProjects.length > initialItems && (
              <div className="mt-10 w-full flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration="1000"
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration="1000"
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}