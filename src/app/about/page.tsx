'use client';

import Image from 'next/image';
import {
  Brain, Cpu, Database, Layers, Palette, Server, CodeSquare, Github, Mail, ExternalLink, Download, Sparkles, Briefcase, Users, CalendarDays, Link as LinkIcon, ChevronRight, Laptop,
  FileCode, DatabaseZap, CloudCog, ShieldCheck, GitFork,
  Pi, SquareFunction, Atom, Terminal, Database as DatabaseIcon, Cloud, GitMerge, Wand2, Settings2, Aperture, TestTube2, Puzzle, Coffee
} from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Add table imports from shadcn UI
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LucideIcon } from 'lucide-react'; // Import LucideIcon type

interface Skill {
  name: string;
  icon?: LucideIcon;
  color?: string;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

interface Experience {
  company: string;
  role: string;
  duration?: string;
  description: string[];
  link?: string;
  linkText?: string;
  technologies?: string[];
  shortName?: string;
}

export default function AboutPage() {
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2024);

  const githubUsername = "Abdul1028";
  const userCity = "Mumbai"; 
  const resumeUrl = "/Abdulshaikh.pdf"; 
  const emailAddress = "rasoolas2003@gmail.com"; 
  const profileImageUrl = "/personal-pic.jpeg"; 
  const finalQuote = "Beyond coding, I'm passionate about exploring new technologies and continuously learning. Let's connect and build something amazing together!"; 

  const experiences: Experience[] = [
    {
      company: "Cipher Apps",
      shortName: "Cipher Apps",
      role: "Android Developer Intern",
      duration: "3 Months",
      description: [
        "Solely developed a comprehensive resume builder application, handling both frontend and backend aspects.",
        "Gained hands-on experience in full-cycle mobile application development within a professional software solutions environment."
      ],
      technologies: ["Android", "Java/Kotlin", "Firebase", "UI/UX Design"],
    },
    {
      company: "GDG Club (Google Developer Student Clubs)",
      shortName: "GDG Club",
      role: "Executive, Application Development Team",
      description: [
        "Currently contribute to the development and maintenance of MPSTMEOnTrack, the official college application available on Play Store and App Store.",
        "Collaborate with a team to implement new features, fix bugs, and ensure a smooth user experience for students."
      ],
      link: "https://apps.apple.com/in/app/mpstme-ontrack/id6525137090",

      linkText: "MPSTMEOnTrack",
      technologies: ["Mobile Dev", "Team Collaboration", "Flutter","Android","iOS"],
    },
    {
      company: "Freelance Project: KalTrack",
      shortName: "KalTrack",
      role: "Sole Developer & Manager",
      description: [
        "Independently designed, developed, and deployed KalTrack, a nutrition and health management application, on the Play Store.",
        "Managed all project phases from concept to launch and ongoing maintenance."
      ],
      link: "#kaltrack-website-link",
      linkText: "KalTrack App (Under PlayStore Review)",
      technologies: ["Android/iOS", "Health Tech", "Full-Stack Dev"],
    },
    {
      company: "Startup Elixor",
      shortName: "E-commerce",
      role: "Full Stack Developer",
      description: [
        "Developed an e-commerce platform for selling perfumes, focusing on a modern user experience using Next.js.",
        "Handled frontend architecture and integration with backend services for product display, cart, and checkout functionalities."
      ],
      link: "https://www.elixor.live", 
      linkText: "Elixor",
      technologies: ["Next.js", "React", "E-commerce", "Tailwind CSS"],
    },
    {
      company: "SafeHer",
      shortName: "Hackathons",
      role: "Lead Developer",
      description: [
        "Contributed to building SafeHer, a women's safety application, during a hackathon.",
        "The application is available on the Play Store, showcasing rapid development and deployment capabilities."
      ],
      link: "https://github.com/Abdul1028/SafeHer", 
      linkText: "SafeHer App",
      technologies: ["Mobile App Dev", "Social Impact", "Rapid Prototyping"],
    },
  ];
  
  const techStack: SkillCategory[] = [
    {
      title: "Languages",
      icon: FileCode,
      skills: [
        { name: "Python", icon: Pi }, 
        { name: "Java", icon: Coffee },
        { name: "JavaScript", icon: SquareFunction }
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: Layers,
      skills: [
        { name: "Node.js", icon: Server }, 
        { name: "Express.js", icon: Settings2 }, 
        { name: "Next.js", icon: Aperture },
        { name: "Spring Boot", icon: Puzzle }, 
        { name: "Django", icon: Terminal }
      ],
    },
    {
      title: "Frontend",
      icon: Palette,
      skills: [
        { name: "React", icon: Atom }, 
        { name: "Tailwind CSS", icon: Wand2 }, 
        { name: "Shadcn/ui", icon: Puzzle }
      ],
    },
    {
      title: "AI / ML",
      icon: Brain,
      skills: [
        { name: "OpenCV", icon: Aperture }, 
        { name: "Pandas", icon: DatabaseIcon }, 
        { name: "Scikit-learn", icon: TestTube2 }, 
        { name: "TensorFlow", icon: Cpu }
      ],
    },
    {
      title: "Databases",
      icon: DatabaseZap,
      skills: [
        { name: "MongoDB", icon: DatabaseIcon }, 
        { name: "Firebase", icon: Cloud }, 
        { name: "SQL", icon: DatabaseIcon }, 
        { name: "PostgreSQL", icon: DatabaseIcon }
      ],
    },
    {
      title: "Deployment & Tools",
      icon: CloudCog,
      skills: [
        { name: "Vercel", icon: Cloud }, 
        { name: "Heroku", icon: Cloud },
        { name: "Docker", icon: Puzzle },
        { name: "Git", icon: GitMerge }
      ],
    },
  ];

  const selectedExperience = experiences[selectedExperienceIndex];

  // GitHub Calendar options
  const calendarColorScheme = "dark";
  
  // Calendar styles to match the image
  const calendarBlockSize = 12;
  const calendarBlockMargin = 4;
  const calendarResponsiveBlockSize = 10; // Smaller blocks for mobile
  const calendarResponsiveBlockMargin = 3; // Smaller margins for mobile

  const contributionYears = [2025, 2024, 2023, 2022]; // 2021 removed

  // Helper function to get skill badge colors (same as before, ensure it's defined)
  const getSkillColor = (skillName: string): string => {
    const lowerSkillName = skillName.toLowerCase();
    if (lowerSkillName.includes('python')) return 'bg-blue-500 hover:bg-blue-600 text-white';
    if (lowerSkillName.includes('javascript')) return 'bg-yellow-400 hover:bg-yellow-500 text-black';
    if (lowerSkillName.includes('java')) return 'bg-orange-500 hover:bg-orange-600 text-white';
    if (lowerSkillName.includes('typescript')) return 'bg-blue-400 hover:bg-blue-500 text-white';
    if (lowerSkillName.includes('react') || lowerSkillName.includes('next.js')) return 'bg-sky-500 hover:bg-sky-600 text-white';
    if (lowerSkillName.includes('node.js') || lowerSkillName.includes('express.js')) return 'bg-green-500 hover:bg-green-600 text-white';
    if (lowerSkillName.includes('spring boot')) return 'bg-lime-500 hover:bg-lime-600 text-black';
    if (lowerSkillName.includes('mongodb') || lowerSkillName.includes('sql')) return 'bg-emerald-500 hover:bg-emerald-600 text-white';
    if (lowerSkillName.includes('docker') || lowerSkillName.includes('kubernetes')) return 'bg-blue-600 hover:bg-blue-700 text-white';
    if (lowerSkillName.includes('aws') || lowerSkillName.includes('cloud')) return 'bg-amber-500 hover:bg-amber-600 text-black';
    if (lowerSkillName.includes('git') || lowerSkillName.includes('github')) return 'bg-slate-600 hover:bg-slate-700 text-white';
    return 'bg-slate-400 hover:bg-slate-500 text-black'; // Default color
  };

  return (
    <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20 min-h-screen text-slate-900 dark:text-slate-100">
      {/* New Introduction Section */}
      <section className="mb-16 md:mb-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Text */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
              I'm <span className="text-emerald-400 dark:text-emerald-500">Abdul Shaikh</span>. I live in {userCity}, where I build the future.
            </h1>
            <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
              <p>
                I hold a Bachelor's degree in Computer Science and I'm currently pursuing an MCA at NMIMS. 
                I have robust experience in both developing and exploring (hacking) software, with a particular expertise in Next.js for web and Expo for cross platfrom apps.
              </p>
              <p>
                My core programming languages include Python, Java, and JavaScript. I'm proficient with frameworks such as Node.js, Express, Next.js, Spring, NestJS and Django. For frontend development, I leverage React, Tailwind CSS, and Shadcn/UI.
              </p>
            </div>
          </div>

          {/* Right Column: Image & Links */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <Card className="overflow-hidden shadow-xl">
              <div className="aspect-[6/5] relative group">
                <Image 
                  src={profileImageUrl} 
                  alt="Abdul Shaikh - Profile Picture" 
                  layout="fill" 
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <CardFooter className="p-4 bg-black-600/90 dark:bg-black-800/90 border-t border-emerald-500 dark:border-emerald-700">
                <div className="w-full space-y-3">
                  <div className="flex w-full gap-2">
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 group border-emerald-400/80 dark:border-emerald-600/80 bg-white/90 dark:bg-slate-900/90 hover:border-white dark:hover:border-white hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center gap-2"
                    >
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 justify-center w-full"
                      >
                        <span className="text-emerald-700 dark:text-emerald-300 whitespace-nowrap">View Résumé</span>
                        <ExternalLink className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-emerald-400/80 dark:border-emerald-600/80 bg-white/90 dark:bg-slate-900/90 hover:border-white dark:hover:border-white hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center"
                      title="Download Résumé"
                    >
                      <a href={resumeUrl} download>
                        <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
                      </a>
                    </Button>
                  </div>
                  <Button variant="outline" asChild className="w-full group border-emerald-400/80 dark:border-emerald-600/80 bg-white/90 dark:bg-slate-900/90 hover:border-white dark:hover:border-white hover:bg-white dark:hover:bg-slate-800">
                    <a href={`mailto:${emailAddress}`}>
                      <Mail className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
                      <span className="text-emerald-700 dark:text-emerald-300">{emailAddress}</span>
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>


      {/* Tabbed Experience Section */}
      <section id="experience" className="mb-16 md:mb-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 sm:mb-12 text-slate-900 dark:text-slate-100">
          <span className="text-emerald-500 dark:text-emerald-400">2.</span> Where I've Excelled
        </h2>
        <div className="md:grid md:grid-cols-12 md:gap-x-8 lg:gap-x-12 min-h-[400px]">
          {/* Left Column: Tabs */}
          <div className="md:col-span-3 lg:col-span-3 mb-8 md:mb-0 md:border-r md:border-slate-200 dark:md:border-slate-700 pr-4">
            <div className="sticky top-28 flex flex-col space-y-1">
              {experiences.map((exp, index) => (
                <button
                  key={exp.shortName || exp.company}
                  onClick={() => setSelectedExperienceIndex(index)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-opacity-50",
                    selectedExperienceIndex === index
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  )}
                >
                  {exp.shortName || exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-9 lg:col-span-9 pl-0 md:pl-4">
            {selectedExperience && (
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  {selectedExperience.role} <span className="text-emerald-500 dark:text-emerald-400">@ {selectedExperience.company}</span>
                </h3>
                {selectedExperience.duration && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <CalendarDays className="inline-block h-3.5 w-3.5 mr-1 opacity-80" /> {selectedExperience.duration}
                  </p>
                )}
                <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedExperience.description.map((desc, i) => (
                    <li key={i} className="flex">
                      <ChevronRight className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mt-1 mr-2 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">Key Tech/Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map(tech => (
                        <Badge key={tech} variant="secondary"
                               className="bg-emerald-100/80 text-emerald-700 dark:bg-emerald-700/30 dark:text-emerald-300 border-emerald-300/70 dark:border-emerald-600/50 px-2 py-0.5 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedExperience.link && selectedExperience.linkText && (
                  <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/60">
                    <Button variant="link" asChild className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 px-0 h-auto text-sm">
                      <a href={selectedExperience.link} target="_blank" rel="noopener noreferrer">
                        {selectedExperience.linkText} <LinkIcon className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Existing Sections Container */}
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
        {/* GitHub Contributions Section */}
        <section id="github-contributions">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#0d1117] border-[#30363d]">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center font-semibold tracking-tight text-white">
                <Github className="w-7 h-7 mr-3 text-white/70" />
                Contribution Graph
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {githubUsername ? (
                <div className="space-y-4">
                  <div className="github-contribution-calendar">
                    <GitHubCalendar 
                      username={githubUsername}
                      colorScheme={calendarColorScheme}
                      hideColorLegend={false}
                      hideMonthLabels={false}
                      blockSize={typeof window !== 'undefined' && window.innerWidth < 640 ? calendarResponsiveBlockSize : calendarBlockSize}
                      blockMargin={typeof window !== 'undefined' && window.innerWidth < 640 ? calendarResponsiveBlockMargin : calendarBlockMargin}
                      labels={{
                        totalCount: '{{count}} contributions in the last year',
                      }}
                      year={selectedYear}
                    />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {contributionYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={cn(
                          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                          selectedYear === year
                            ? "bg-[#40c463] text-[#0d1117]"
                            : "bg-[#21262d] text-white hover:bg-[#30363d]"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <style jsx global>{`
                    .github-contribution-calendar {
                      width: 100%;
                      overflow-x: auto;
                    }
                    .github-contribution-calendar .day {
                      outline: 1px solid rgba(27, 31, 35, 0.06);
                      outline-offset: -1px;
                      border-radius: 2px;
                    }
                    .github-contribution-calendar .react-github-calendar__legend {
                      margin-top: 8px;
                    }
                    .github-contribution-calendar text {
                      fill: #adbac7 !important;
                      font-size: 12px !important;
                    }
                    .github-contribution-calendar .react-github-calendar__meta {
                      font-size: 14px !important;
                      color: #adbac7 !important;
                    }
                    /* Custom color scheme to match the image */
                    .github-contribution-calendar .level-0 {
                      fill: #161b22 !important;
                    }
                    .github-contribution-calendar .level-1 {
                      fill: #0e4429 !important;
                    }
                    .github-contribution-calendar .level-2 {
                      fill: #006d32 !important;
                    }
                    .github-contribution-calendar .level-3 {
                      fill: #26a641 !important;
                    }
                    .github-contribution-calendar .level-4 {
                      fill: #39d353 !important;
                    }
                  `}</style>
                </div>
              ) : (
                <p className="text-center text-slate-400">
                  Please set your GitHub username to display the contribution graph.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-background/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl md:text-xl lg:text-2xl flex items-center justify-center font-semibold tracking-tight">
                <Laptop className="w-6 h-6 mr-2 sm:mr-3 text-primary/90" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 text-sm">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="border-b-slate-200/80 dark:border-b-slate-700/80">
                    <TableHead className="w-[120px] sm:w-[150px] px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">Category</TableHead>
                    <TableHead className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">Skills</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techStack.map((category, index) => (
                    <TableRow key={index} className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <TableCell className="font-medium px-2 sm:px-4 py-3 align-top text-xs sm:text-sm">
                        <div className="flex items-center">
                          {category.icon && React.createElement(category.icon, { className: "w-4 h-4 mr-2 text-primary/80 flex-shrink-0" })}
                          <span className="truncate">{category.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-2 sm:px-4 py-3">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {category.skills.map((skill) => {
                            const SkillIcon = skill.icon;
                            return (
                              <Badge 
                                key={skill.name}
                                variant="default"
                                className={cn(
                                  "inline-flex items-center text-xs sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium shadow-sm transition-all hover:shadow-md",
                                  getSkillColor(skill.name)
                                )}
                              >
                                {SkillIcon && <SkillIcon className="w-3 h-3 mr-1.5 opacity-90" />}
                                {skill.name.toUpperCase()}
                              </Badge>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        
      {/* Final Quote Section */}
      <section className="mb-16 md:mb-24">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
            <CardContent className="p-6 sm:p-8 text-center">
              <Sparkles className="h-8 w-8 text-emerald-400 dark:text-emerald-500 mx-auto mb-4" />
              <p className="text-xl sm:text-2xl italic text-slate-700 dark:text-slate-300 leading-relaxed">
                &ldquo;{finalQuote}&rdquo;
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      </div>
    </main>
  );
} 