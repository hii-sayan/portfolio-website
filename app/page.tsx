'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Moon, Sun, Copy, Check, Quote } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(true)
  const [copied, setCopied] = useState(false)

  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const projects = [
    { id: 1, title: 'Project 1', description: 'Description of Project 1' },
    { id: 2, title: 'Project 2', description: 'Description of Project 2' },
    { id: 3, title: 'Project 3', description: 'Description of Project 3' },
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Avinesh',
      text: 'Sayantan is an exceptional developer with a deep understanding of Web3 technologies. His work is always top-notch!',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      text: 'Working with Sayantan was a pleasure. His fullstack skills and attention to detail are impressive.',
    },
    {
      id: 3,
      name: 'Michael Chen',
      text: 'Sayantan\'s innovative approach to problem-solving sets him apart. A true asset to any development team!',
    },
  ]

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>, sectionName: string) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(sectionName)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('sayantan9876@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [homeRef, aboutRef, projectsRef, testimonialsRef, contactRef]
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current)
        }
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <motion.header
        style={{
          borderImage: `linear-gradient(to right, ${borderColor.get()}, ${borderColor.get()}) 1`,
        }}
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-300 border-b-2 border-solid"
      >
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <ul className="flex space-x-6">
            {[
              { name: 'home', ref: homeRef },
              { name: 'about', ref: aboutRef },
              { name: 'projects', ref: projectsRef },
              { name: 'testimonials', ref: testimonialsRef },
              { name: 'contact', ref: contactRef },
            ].map((item) => (
              <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => scrollToSection(item.ref, item.name)}
                  className={`text-lg ${
                    activeSection === item.name
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </button>
              </motion.li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
          </motion.button>
        </nav>
      </motion.header>

      <main className="pt-16">
        <section ref={homeRef} id="home" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Sayantan Mitra</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">Web3 Enthusiast & Fullstack Developer</p>
          </motion.div>
        </section>

        <section ref={aboutRef} id="about" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold mb-6">About Me</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate Web3 enthusiast and fullstack developer with a keen eye for creating clean,
              functional, and innovative web applications. With expertise in modern web technologies and blockchain,
              I strive to deliver high-quality solutions that leverage the power of decentralized systems and meet client needs.
            </p>
          </motion.div>
        </section>

        <section ref={projectsRef} id="projects" className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10 text-center">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={testimonialsRef} id="testimonials" className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold mb-10 text-center">Testimonials</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transition-colors duration-300 w-full md:w-80"
                >
                  <Quote className="text-blue-500 dark:text-blue-400 mb-4" size={24} />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{testimonial.text}</p>
                  <p className="font-semibold text-right">- {testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactRef} id="contact" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center w-full max-w-4xl px-6"
          >
            <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Feel free to reach out for collaborations, opportunities, or just a friendly hello. I'm always excited to connect with fellow developers and tech enthusiasts!
            </p>
            <div className="flex justify-center space-x-8 mb-12">
              <motion.a
                href="https://www.linkedin.com/in/sayantan-mitra-9289801b5/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg w-24 h-24"
              >
                <Linkedin size={40} className="text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-semibold">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com/hii-sayan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg w-24 h-24"
              >
                <Github size={40} className="text-gray-800 dark:text-gray-200 mb-2" />
                <span className="text-sm font-semibold">GitHub</span>
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer w-24 h-24"
                onClick={copyEmail}
              >
                <Mail size={40} className="text-red-600 dark:text-red-400 mb-2" />
                <span className="text-sm font-semibold">Email</span>
                {copied ? (
                  <span className="text-green-600 dark:text-green-400 mt-1 text-xs flex items-center">
                    <Check size={12} className="mr-1" /> Copied!
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <Copy size={12} className="mr-1" /> Click to copy
                  </span>
                )}
              </motion.div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Let's create something amazing together!
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  )
}