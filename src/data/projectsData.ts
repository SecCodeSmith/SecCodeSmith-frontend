import type { ProjectProps, Category } from "../untils/ProjectProps";

type CategoryMap = Record<string, Category>
export const Categories: CategoryMap = {
  Embedded: {
    fullName: "Embedded Systems",
    shortName: "Embedded",
    icon: "fas fa-microchip",
  },
  Web: {
    fullName: "Web Development",
    shortName: "Web",
    icon: "fas fa-code",
  },
  ML: {
    fullName: "Machine Learning",
    shortName: "ML",
    icon: "fas fa-robot",
  },
  IoT: {
    fullName: "Internet of Things",
    shortName: "IoT",
    icon: "fas fa-network-wired",
  },
  Sec: {
    fullName: "Cybersecurity",
    shortName: "Security",
    icon: "fas fa-shield-alt",
  },
}

export const projectsData: ProjectProps[] = [
  {
    id: "SecCodeSmithFrontend",
    title: "SecCodeSmith Portfolio Page - Frontend",
    description: "A modern, responsive portfolio page showcasing my projects, skills, and blog posts. Built with React and styled-components for a sleek user interface.",
    image: "/images/projects/shadowguardian.jpg",
    category: [Categories["Web"]],
    featured: true,
    technologies: [
      { name: "React", icon: "devicon-react-original tech-icon" },
      { name: "TypeScript", icon: "devicon-typescript-plain tech-icon" },
      { name: "SCSS", icon: "devicon-sass-original tech-icon" },
      { name: "Vite", icon: "devicon-vitejs-plain tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/shadowguardian",
      demo: "https://seccodesmith.pl"
    },
    projectDetails: {
      descriptions: [
        "This portfolio page is designed to highlight my skills and projects in a visually appealing way. It features a clean layout, smooth animations, and responsive design for optimal viewing on all devices.",
        "The project utilizes React for building the user interface, TypeScript for type safety, and SCSS for styling. The use of Vite ensures fast development and build times."
      ],
      startDate: "12-05-2025",
      endDate: "",
      dateFormatted: "DD MMMM YYYY",
      role: "Frontend Developer",
      status: "In Progress",
      keyFeatures: [
        "Responsive design with mobile-first approach",
        "Dynamic project showcase with filtering options",
        "Interactive blog section with latest posts"
      ],
      gallery: ["/images/projects/shadowguardian1.jpg", "/images/projects/shadowguardian2.jpg"],
      fullTechStack: [
        { name: "React", icons: "devicon-react-original" },
        { name: "TypeScript", icons: "devicon-typescript-plain" },
        { name: "SCSS", icons: "devicon-sass-original" },
        { name: "Vite", icons: "devicon-vitejs-plain" }
      ]
    }
  },
  {
    id: "pyrosight",
    title: "PyroSight: Thermal Anomaly Detection",
    description: "An intelligent system that uses computer vision and thermal imaging to detect anomalies in industrial equipment. Employs PyTorch for deep learning to predict potential failures before they occur.",
    image: "/images/projects/pyrosight.jpg",
    category: [Categories["ML"], Categories["IoT"]],
    technologies: [
      { name: "Python", icon: "devicon-python-plain tech-icon" },
      { name: "PyTorch", icon: "devicon-pytorch-original tech-icon" },
      { name: "OpenCV", icon: "fas fa-camera tech-icon" },
      { name: "Raspberry Pi", icon: "fas fa-microchip tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/pyrosight"
    }
  },
  {
    id: "nexusflow",
    title: "NexusFlow: DevOps Dashboard",
    description: "A real-time monitoring dashboard for DevOps teams that visualizes CI/CD pipelines, infrastructure metrics, and deployment statuses. Built with Blazor for seamless updates without page refreshes.",
    image: "/images/projects/nexusflow.jpg",
    category: [Categories["Web"]],
    technologies: [
      { name: "C#", icon: "devicon-csharp-plain tech-icon" },
      { name: "Blazor", icon: "devicon-dotnetcore-plain tech-icon" },
      { name: "Entity Framework", icon: "fas fa-database tech-icon" },
      { name: "Docker", icon: "devicon-docker-plain tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/nexusflow",
      demo: "https://nexusflow.demo.com"
    }
  },
  {
    id: "etherwhisper",
    title: "EtherWhisper: Secure Communication Node",
    description: "A low-power, long-range communication node for IoT networks with military-grade encryption and mesh capabilities. Perfect for remote sensing applications in harsh environments.",
    image: "/images/projects/etherwhisper.jpg",
    category: [Categories["Embedded"], Categories["IoT"]],
    technologies: [
      { name: "C", icon: "devicon-c-plain tech-icon" },
      { name: "STM32", icon: "fas fa-memory tech-icon" },
      { name: "LoRa", icon: "fas fa-broadcast-tower tech-icon" },
      { name: "AES-256", icon: "fas fa-shield-alt tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/etherwhisper"
    }
  },
  {
    id: "dataforge",
    title: "DataForge: Advanced Analytics Platform",
    description: "A comprehensive data analytics platform with interactive visualization tools and automated reporting features. Integrates with various data sources and provides ML-powered insights.",
    image: "/images/projects/dataforge.jpg",
    category: [Categories["Web"]],
    technologies: [
      { name: "Python", icon: "devicon-python-plain tech-icon" },
      { name: "Django", icon: "devicon-django-plain tech-icon" },
      { name: "React", icon: "devicon-react-original tech-icon" },
      { name: "Pandas", icon: "devicon-pandas-original tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/dataforge",
      demo: "https://dataforge.demo.com"
    }
  },
  {
    id: "visionkeeper",
    title: "VisionKeeper: Object Recognition System",
    description: "A real-time object recognition system optimized for edge devices. Capable of identifying and tracking objects with high accuracy even in challenging lighting conditions.",
    image: "/images/projects/visionkeeper.jpg",
    category: [Categories["ML"]],
    technologies: [
      { name: "Python", icon: "devicon-python-plain tech-icon" },
      { name: "PyTorch", icon: "devicon-pytorch-original tech-icon" },
      { name: "OpenCV", icon: "fas fa-camera tech-icon" },
      { name: "NVIDIA Jetson", icon: "fas fa-microchip tech-icon" }
    ],
    links: {
      github: "https://github.com/SecCodeSmith/visionkeeper"
    }
  }
];