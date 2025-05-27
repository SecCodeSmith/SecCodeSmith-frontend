import {type SkillCardProps} from '../untils/SkillCardProps';

export const skillCardData: SkillCardProps[] = [
    {
        categoryIcon: "fa-code",
        categoryTitle: "Languages",
        skills: [
            { name: "C/C++", icon: "devicon-cplusplus-plain" },
            { name: "Python", icon: "devicon-python-plain" },
            { name: ".NET", icon: "devicon-dotnetcore-plain" },
            { name: "C#", icon: "devicon-csharp-plain" },
        ]
    },
    {
        categoryIcon: "fa-microchip",
        categoryTitle: "Embedded Systems",
        skills: [
            { name: "STM32 (I2C, SPI, UART)", icon: "fas fa-microchip" },
            { name: "ESP32", icon: "fas fa-wifi" },
            { name: "Pico-SDK", icon: "fas fa-memory" }
        ]
    },
    {
        categoryIcon: "fa-brain",
        categoryTitle: "Data & ML",
        skills: [
            { name: "Pandas", icon: "devicon-pandas-plain" },
            { name: "Scikit-learn", icon: "devicon-scikitlearn-plain" },
            { name: "Scikit-image", icon: "fas fa-image" },
            { name: "PyTorch", icon: "devicon-pytorch-plain" },
            { name: "OpenCV", icon: "devicon-opencv-plain" }
        ]
    },
    {
        categoryIcon: "fas fa-window-maximize",
        categoryTitle: "Web Development",
        skills: [
            { name: "ASP.NET Core", icon: "devicon-dot-net-plain" },
            { name: "Entity Framework", icon: "fas fa-database" },
            { name: "Blazor", icon: "devicon-dotnetcore-plain"},
            { name: "React", icon: "devicon-react-original" },
            { name: "Django", icon: "devicon-django-plain" },
            { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
        ],
    },
    {
        categoryIcon: "fas fa-cloud",
        categoryTitle: "DevOps & Systems",
        skills: [
            { name: "Docker", icon: "devicon-docker-plain" },
            { name: "Docker-compose", icon: "fas fa-layer-group" },
            { name: "Linux CLI", icon: "devicon-bash-plain" },
            { name: "Git", icon: "devicon-git-plain" },
            { name: "CI/CD", icon: "fas fa-cogs" },
            { name: "Cmake", icon: "devicon-cmake-plain" },
            { name: "Linux", icon: "devicon-linux-plain" },
            { name: "Jenkins", icon: "devicon-jenkins-plain" },
        ]
    }
];