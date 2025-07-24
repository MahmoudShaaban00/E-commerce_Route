import React, { useEffect, useState } from 'react';
import aboutImage from '../../assets/images/about.jpg'; // replace with actual path

export default function About() {
  const [yearsExperience, setYearsExperience] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);

  useEffect(() => {
    let exp = 0;
    let proj = 0;
    const expTarget = 5;
    const projTarget = 120;

    const interval = setInterval(() => {
      if (exp < expTarget) setYearsExperience((prev) => prev + 1);
      if (proj < projTarget) setProjectsCompleted((prev) => prev + 5);
      exp++;
      proj++;
      if (exp >= expTarget && proj >= projTarget) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-green-50 min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="flex-1 max-w-xl text-green-900">
          <h1 className="text-4xl font-extrabold mb-6">About Us</h1>
          <p className="mb-8 text-lg leading-relaxed">
            We are dedicated to delivering top-notch solutions tailored for your business.
            Our expert team combines innovation and quality to ensure your satisfaction.
          </p>
          <div className="flex gap-10">
            <div className="bg-green-100 rounded-lg p-6 shadow-md text-center w-40">
              <span className="text-4xl font-bold text-green-700">{yearsExperience}+</span>
              <p className="mt-2 font-semibold">Years Experience</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6 shadow-md text-center w-40">
              <span className="text-4xl font-bold text-green-700">{projectsCompleted}+</span>
              <p className="mt-2 font-semibold">Projects Completed</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 max-w-lg rounded-lg overflow-hidden shadow-lg">
          <img
            src={aboutImage}
            alt="About us"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
