import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button1";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 }
};

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userDetail = user ? JSON.stringify(user) : "No user details available";

  return (
    <div className="w-full">
      {/* Hero Section with Background Image */}
      <motion.div
        className="w-full bg-slate-400 h-screen"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center px-6 bg-overlay-image bg-cover bg-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Centralized IoT Dashboard for Real-Time Project Monitoring
          </motion.h1>
          <motion.p
            className="my-4 text-lg md:text-xl opacity-80 max-w-2xl"
            variants={fadeInUp}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Track and manage all IoT devices in one place. Access live data, analytics, and seamless project tracking within your campus network.
          </motion.p>
          <motion.div variants={fadeInUp} transition={{ duration: 1, delay: 0.6 }}>
            <Button
              className="bg-foreground hover:bg-primary cursor-pointer"
              onClick={() => navigate("/projects")}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Our IoT Dashboard? */}
      <motion.div
        className="bg-blue-200 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">Why Choose Our IoT Dashboard?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          A streamlined IoT management system with real-time monitoring, security, and an intuitive interface.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Live Data", desc: "View live sensor data and analytics for improved decision-making." },
            { title: "Security", desc: "Hosted on a campus server, ensuring data privacy without the need for internet access." },
            { title: "User Friendly", desc: "A clean, modern design tailored for students and faculty." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-slate-200 rounded-lg shadow-md"
              variants={scaleIn}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* About IoT Lab Section */}
      <motion.div
        id="about"
        className="py-16 px-6 text-center rounded-2xl mt-10"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">About Our IoT Lab</h2>
        <div className="max-w-4xl mx-auto text-left">
          <p className="text-lg">
            Our IoT Lab is a dedicated research and innovation space at BIT Sathy, designed to empower students and faculty in real-time embedded systems and IoT applications.
          </p>
          {[
            { title: "Vision", content: "Transforming everyday things into smart entities with AI-driven solutions based on real-time analytics." },
            { title: "Mission", content: "Providing a platform for professionals to explore smart city applications, training engineers, and enhancing skills." },
            { title: "Focus Areas", content: ["Sensors", "Cloud Computing", "IoT Controllers"] },
          ].map((section, index) => (
            <motion.div
              key={index}
              className="mt-6"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.3 }}
            >
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              {Array.isArray(section.content) ? (
                <ul className="list-disc list-inside text-lg">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg">{section.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Features of IoT Lab */}
      <motion.div
        className="bg-[#e6f0ff] py-16 px-6 text-center rounded-2xl mt-10"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Key Features of Our IoT Lab</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Industry 5.0 Ready", desc: "Training students with skills required for Industry 5.0 through real-world projects." },
            { title: "Research & Innovation", desc: "Providing immense research opportunities and supporting project grants." },
            { title: "Skill Development", desc: "Enhancing project management, documentation, and leadership skills." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-slate-100 rounded-2xl shadow-md"
              variants={scaleIn}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover="hover"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Faculty Managing IoT Lab */}
      <motion.div
        className="bg-quaternary py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Faculty Managing IoT Lab</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Dr. Ramkumar R",
              designation: "Assistant Professor Level III",
              dept: "ECE Dept",
              email: "ramkumarr@bitsathy.ac.in",
              img: "ram.jpg",
            },
            {
              name: "Dr. Manojkumar P",
              designation: "Assistant Professor Level III",
              dept: "EEE Dept",
              email: "manojkumarp@bitsathy.ac.in",
              img: "manoj.jpg",
            },
          ].map((faculty, index) => (
            <motion.div
              key={index}
              className="p-6 bg-slate-100 rounded-2xl shadow-md flex flex-col items-center text-center"
              variants={scaleIn}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover="hover"
            >
              <img
                src={faculty.img}
                alt={faculty.name}
                className="w-40 h-40 rounded-2xl object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{faculty.name}</h3>
              <p className="text-gray-600">{faculty.designation}</p>
              <p className="text-gray-500">{faculty.dept}</p>
              <p className="text-blue-600 mt-2">{faculty.email}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer with College Details */}
      <footer className="bg-blue-900 text-white py-5 text-center">
        <p className="text-lg font-semibold">Bannari Amman Institute of Technology</p>
        <p className="text-sm opacity-80">Sathyamangalam, Erode - 638401, Tamil Nadu, India</p>
        <p className="text-sm opacity-80">Phone: +91 9944854608 | Email: iot@bitsathy.ac.in</p>
        <p className="text-sm opacity-60 mt-2">&copy; 2025 BIT Sathy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;