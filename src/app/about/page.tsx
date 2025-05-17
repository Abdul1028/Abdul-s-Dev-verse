'use client';

import Image from 'next/image';
import { Brain, Cpu, Database, Layers, Palette, Server, CodeSquare, Github, Mail, ExternalLink, Download, Sparkles, Briefcase, Users, CalendarDays, Link as LinkIcon, ChevronRight, Laptop } from 'lucide-react';
import { useState } from 'react';
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

interface Skill {
  name: string;
  icon?: React.ReactNode;
  color?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
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

  const githubUsername = "Abdul1028";
  const userCity = "Mumbai"; // TODO: Replace with your city
  const resumeUrl = "/abdul_shaikh_resume.pdf"; // TODO: Replace with your actual resume URL or path, e.g., /resume.pdf
  const emailAddress = "rasoolas2003@gmail.com"; // TODO: Replace with your email
  const profileImageUrl = "/personal-pic.jpeg"; // TODO: Replace with your profile image URL, e.g., /profile.jpg or https://example.com/image.png
  const finalQuote = "Beyond coding, I'm passionate about exploring new technologies and continuously learning. Let's connect and build something amazing together!"; // TODO: Replace with your quote

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
        "Currently contribute to the development and maintenance of MPSTMonTrack, the official college application available on Play Store and App Store.",
        "Collaborate with a team to implement new features, fix bugs, and ensure a smooth user experience for students."
      ],
      link: "#gdg-mpstmontrack-link", // TODO: Replace with actual link
      linkText: "MPSTMonTrack App (Link Placeholder)",
      technologies: ["Mobile Dev", "Team Collaboration", "Version Control"],
    },
    {
      company: "Freelance Project: KalTrack",
      shortName: "KalTrack",
      role: "Sole Developer & Manager",
      description: [
        "Independently designed, developed, and deployed KalTrack, a nutrition and health management application, on the Play Store.",
        "Managed all project phases from concept to launch and ongoing maintenance."
      ],
      link: "#kaltrack-website-link", // TODO: Replace with actual link
      linkText: "KalTrack App (Link Placeholder)",
      technologies: ["Android/iOS", "Health Tech", "Full-Stack Dev"],
    },
    {
      company: "Startup: E-commerce Venture",
      shortName: "E-commerce",
      role: "Next.js Developer",
      description: [
        "Developed an e-commerce platform for selling perfumes, focusing on a modern user experience using Next.js.",
        "Handled frontend architecture and integration with backend services for product display, cart, and checkout functionalities."
      ],
      technologies: ["Next.js", "React", "E-commerce", "Tailwind CSS"],
    },
    {
      company: "Hackathon Project: SafeHer",
      shortName: "SafeHer",
      role: "Developer",
      description: [
        "Contributed to building SafeHer, a women's safety application, during a hackathon.",
        "The application is available on the Play Store, showcasing rapid development and deployment capabilities."
      ],
      link: "#safeher-app-link", // TODO: Replace with actual link
      linkText: "SafeHer App (Link Placeholder)",
      technologies: ["Mobile App Dev", "Social Impact", "Rapid Prototyping"],
    },
  ];
  
  const techStack: SkillCategory[] = [
    {
      title: "Languages",
      icon: <CodeSquare className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "Python", color: "bg-blue-500" }, 
        { name: "Java", color: "bg-orange-600" }, 
        { name: "JavaScript", color: "bg-yellow-400 text-yellow-900" }
      ],
    },
    {
      title: "Frameworks & Libraries",
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "Node.js", color: "bg-green-600" }, 
        { name: "Express.js", color: "bg-gray-800" }, 
        { name: "Next.js", color: "bg-gray-900" },
        { name: "Spring Boot", color: "bg-green-500" }, 
        { name: "Django", color: "bg-green-700" },
      ],
    },
    {
      title: "Frontend",
      icon: <Palette className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "React", color: "bg-blue-400" }, 
        { name: "Tailwind CSS", color: "bg-cyan-500" }, 
        { name: "Shadcn/ui", color: "bg-purple-600" }
      ],
    },
    {
      title: "AI / ML",
      icon: <Brain className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "OpenCV", color: "bg-blue-600" }, 
        { name: "Pandas", color: "bg-indigo-700" }, 
        { name: "Scikit-learn", color: "bg-orange-500" }, 
        { name: "TensorFlow", color: "bg-orange-600" },
      ],
    },
    {
      title: "Databases",
      icon: <Database className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "MongoDB", color: "bg-green-600" }, 
        { name: "Firebase", color: "bg-yellow-500 text-yellow-900" }, 
        { name: "SQL", color: "bg-blue-600" }, 
        { name: "PostgreSQL", color: "bg-blue-700" },
      ],
    },
    {
      title: "Deployment",
      icon: <Server className="w-5 h-5 text-emerald-500" />,
      skills: [
        { name: "Vercel", color: "bg-gray-800" }, 
        { name: "Heroku", color: "bg-purple-700" }
      ],
    },
  ];

  const selectedExperience = experiences[selectedExperienceIndex];

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
                I have robust experience in both developing and exploring (hacking) software, with a particular expertise in Next.js.
              </p>
              <p>
                My core programming languages include Python, Java, and JavaScript. I'm proficient with frameworks such as Node.js, Express, Next.js, Spring, and Django. For frontend development, I leverage React, Tailwind CSS, and Shadcn/ui.
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
                  <Button variant="outline" asChild className="w-full group border-emerald-400/80 dark:border-emerald-600/80 bg-white/90 dark:bg-slate-900/90 hover:border-white dark:hover:border-white hover:bg-white dark:hover:bg-slate-800">
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                      <span className="text-emerald-700 dark:text-emerald-300">View Résumé</span>
                      <ExternalLink className="ml-2 h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
                      <Download className="ml-1.5 h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" />
                    </a>
                  </Button>
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
          <span className="text-emerald-500 dark:text-emerald-400">2.</span> Where I've Worked
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
           <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                <Github className="w-7 h-7 mr-3 text-slate-600 dark:text-slate-400" />
                My GitHub Contributions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex justify-center items-center">
              {githubUsername ? (
                <img 
                  src={`https://ghchart.rshah.org/40c463/${githubUsername}`}
                  alt={`${githubUsername}'s GitHub Contribution Graph`}
                  className="w-full max-w-3xl rounded-md shadow-md dark:bg-slate-800 p-1"
                />
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400">
                  Please set your GitHub username to display the contribution graph.
                </p>
              )}
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <p className="text-center w-full text-xs text-slate-500 dark:text-slate-400">
                Note: This graph might take a moment to load and is generated by an external service.
              </p>
            </CardFooter>
          </Card>
        </section>

        {/* Tech Stack Section - Table format */}
        <section id="tech-stack">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl flex items-center justify-center font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                <Laptop className="w-7 h-7 mr-3 text-slate-600 dark:text-slate-400" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-slate-200 dark:border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                      <TableHead className="w-[200px] font-bold">Category</TableHead>
                      <TableHead>Skills</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {techStack.map((category) => (
                      <TableRow key={category.title} className="border-t border-slate-200 dark:border-slate-700">
                        <TableCell className="font-medium flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.title}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                              <Badge 
                                key={skill.name} 
                                className={cn(
                                  "uppercase px-2 py-1 text-xs font-medium text-white",
                                  skill.color || "bg-emerald-500"
                                )}
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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