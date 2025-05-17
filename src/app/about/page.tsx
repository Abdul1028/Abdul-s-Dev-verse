'use client';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          About Me
        </h1>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-700 dark:text-slate-300">
        <p>
          Hello! I'm Abdul, a passionate developer dedicated to creating impactful and innovative digital solutions. 
          My journey into the world of code started with a fascination for how technology can solve real-world problems and bring ideas to life.
        </p>
        <p>
          Over the years, I've honed my skills in various technologies, always striving to learn and adapt in this ever-evolving field. 
          I believe in the power of collaboration, clean code, and continuous improvement.
        </p>
        <p>
          When I'm not coding, you might find me exploring new tech trends, contributing to open-source projects, or 
          [mention a hobby or two here, e.g., playing chess, hiking, learning a new language].
        </p>
        <p>
          This portfolio is a showcase of my work and the projects I'm proud of. 
          Feel free to explore and reach out if you'd like to connect or discuss a potential collaboration!
        </p>
        {/* You can add more sections here later, like: */}
        {/* - Skills section (with icons/tags) */}
        {/* - Experience timeline */}
        {/* - Education */}
        {/* - Testimonials */}
      </div>
    </main>
  );
} 