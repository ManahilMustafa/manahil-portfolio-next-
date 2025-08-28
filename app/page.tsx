"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Code,
  Palette,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { Sparkles } from "@/components/ui/sparkles";
import { Typewriter } from "@/components/ui/typewriter";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { SiFiverr } from "react-icons/si";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const testimonials = [
    {
      name: "Rodri Chen - Japan",
      role: "Fiverr-Client",
      content:
        "Working with Manahil was an exceptional experience! They efficiently converted my Figma designs into a stunning WordPress website, paying meticulous attention to detail and ensuring everything was pixel-perfect. Their communication was prompt and professional throughout the project, and they delivered ahead of schedule. I highly recommend Manahil for anyone looking for top-notch WordPress development services",
      rating: 5,
    },
    {
      name: "Abdul Majeed - UAE",
      role: "Small Business Owner",
      content:
        "I recently had the pleasure of working with someone who efficiently converted my Figma designs into Elementor with remarkable speed. Their communication skills were exceptional, ensuring a smooth and collaborative process throughout. Highly recommended!",
      rating: 5,
    },
    {
      name: "Talha Jabbar - Pakistan",
      role: "University Student",
      content:
        "Manahil did a great job developing my project. She was professional, quick to understand the requirements, and delivered everything on time with clean and efficient code. I highly recommend her for any frontend development work!",
      rating: 5,
    },
    {
      name: "Saad Khan - Pakistan",
      role: "Startup Founder",
      content:
        "Professional, reliable, and delivered exactly what we needed. The React app is fast and user-friendly.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-heading font-bold text-xl text-primary">
              <span className="text-accent">&lt;</span>
              Manahil
              <span className="text-accent">/&gt;</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["hero", "skills", "experience", "projects", "testimonials"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors hover:text-primary ${
                      activeSection === section
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {section}
                  </button>
                )
              )}
              <Button
                onClick={() => scrollToSection("contact")}
                size="sm"
                className="ml-4"
              >
                Contact
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {[
                  "hero",
                  "skills",
                  "experience",
                  "projects",
                  "testimonials",
                  "contact",
                ].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-left transition-colors hover:text-primary ${
                      activeSection === section
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section
        id="hero"
        className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <Sparkles className="opacity-30" particleCount={30} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6">
              <Typewriter
                text="Frontend & Wordpress Developer"
                delay={80}
                className="text-primary"
              />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              2+ Years of Experience in React.js & WordPress | Turning Ideas
              into Powerful Web Experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="text-lg px-8 bg-primary hover:bg-primary/90"
              >
                <Code className="mr-2 h-5 w-5" />
                Code Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="text-lg px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Palette className="mr-2 h-5 w-5" />
                WordPress Projects
              </Button>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <a
                href="https://github.com/ManahilMustafa"
                className="text-muted-foreground hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/manahil-mustafa-/"
                className="text-muted-foreground hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies I work with to build amazing digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-slide-in-left">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary " />
                  Frontend / React Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React.js",
                    "JavaScript (ES6+)",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                    "Bootstrap",
                    "Redux",
                    "API Integration",
                    "OAuth",
                    "Responsive Design",
                    "Git & GitHub",
                    "Netlify",
                    "Vercel",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-in-left animate-delay-200">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Palette className="h-6 w-6 text-accent mb-10" />
                  WordPress Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Elementor",
                    "Elementor Pro",
                    "WooCommerce",
                    "SEO Optimization",
                    "Html, Css, Js",
                    "Performance Optimization",
                  ].map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              2 years of professional development experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="font-heading text-primary mb-5">
                  React.js Developer
                </CardTitle>
                <CardDescription>
                  2 Years • Internships, Jobs & Freelance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Built responsive and dynamic UIs using React.js, Tailwind
                    CSS, and Bootstrap
                  </li>
                  <li>
                    • Integrated REST APIs and implemented secure authentication
                    with OAuth
                  </li>
                  <li>
                    • Applied Redux and Context API for scalable state
                    management
                  </li>
                  <li>
                    • Collaborated with design and backend teams to deliver
                    pixel-perfect features
                  </li>
                  <li>
                    • Deployed projects on Netlify/Vercel and optimized for
                    performance & SEO
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up animate-delay-200">
              <CardHeader>
                <CardTitle className="font-heading text-accent mb-5">
                  WordPress Developer
                </CardTitle>
                <CardDescription>
                  Client Websites, E-commerce & Landing Pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Designed and customized websites using Elementor &
                    Elementor Pro
                  </li>
                  <li>
                    • Developed high-converting landing pages for businesses and
                    campaigns
                  </li>
                  <li>
                    • Customized WordPress themes to match client requirements
                  </li>
                  <li>
                    • Built WooCommerce stores with product management & payment
                    integration
                  </li>
                  <li>
                    • Applied SEO optimization and performance best practices
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              A showcase of my recent work in both React and WordPress
            </p>
          </div>

          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted">
              <TabsTrigger
                value="code"
                className="font-heading data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Code Projects
              </TabsTrigger>
              <TabsTrigger
                value="wordpress"
                className="font-heading data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                WordPress Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
                {[
                  {
                    title: "SABZA Admin Panel",
                    description:
                      "An admin dashboard built with React, Tailwind CSS, Shadcn UI, and OAuth authentication. Designed to manage SABZA’s climate and sustainability projects with a clean UI, project listings, updates, and role-based access.",
                    tech: [
                      "React",
                      "OAuth",
                      "Chart.js",
                      "Tailwind CSS",
                      "Shadcn UI",
                    ],
                    image: "/sabza.JPG",
                    featured: true,
                    span: "md:col-span-2 lg:col-span-2",
                    codeLink:
                      "https://github.com/ManahilMustafa/Admin-Panel-SabzaProjects",
                    liveLink: "https://admin-panel-sabza-projects.vercel.app/",
                  },
                  {
                    title: "The BlackArt",
                    description:
                      "An online art marketplace featuring real-time bidding and painting sales. Built with React and Tailwind, it includes live auctions, interactive dashboards, and seamless REST API integration for smooth user experience.",
                    tech: ["React", "REST API", "Tailwind"],
                    image: "/seven.png",
                    span: "lg:col-span-1",
                    codeLink:
                      "https://github.com/ManahilMustafa/ArtMart-Gallery",
                    liveLink: "https://theblackart.temp2025.com/",
                  },
                  {
                    title: "Prescripto: Doctor Appointment",
                    description:
                      "A doctor appointment booking platform built with Next.js and TypeScript. It features patient registration, doctor listings, scheduling, and a responsive UI, deployed on Vercel for fast performance.",
                    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
                    image: "/doctor.png",
                    span: "lg:col-span-1",
                    codeLink:
                      "https://github.com/ManahilMustafa/doctor-appointment-site",
                    liveLink:
                      "https://doctor-appointment-site-neon.vercel.app/",
                  },
                  {
                    title: "Gericht: Restaurant Menu",
                    description:
                      "A modern restaurant menu website built with React. It features elegant UI design, dynamic food and drinks sections, and a fully responsive layout for an engaging dining experience.",
                    tech: ["React", "Framer", "JavaScript"],
                    image: "/menu.png",
                    span: "lg:col-span-1",
                    codeLink: "#",
                    liveLink: "https://resturant-jsx.vercel.app/",
                  },
                  {
                    title: "Scrowise",
                    description:
                      "A secure escrow management platform built with React, providing safe transactions between buyers and sellers. It includes user authentication, transaction tracking, and a clean, responsive UI for trust and transparency.",
                    tech: ["React", "Node.js", "Express", "MongoDB"],
                    image: "/scro.jpg",
                    span: "lg:col-span-1",
                    codeLink: "https://github.com/ManahilMustafa/Scrowise",
                    liveLink: "https://scrowise.vercel.app/#",
                  },
                  {
                    title: "Brainwave",
                    description:
                      "A modern personal portfolio website built with React and Tailwind CSS. It showcases projects, skills, and experience with a stylish UI, smooth animations, and responsive design.",
                    tech: ["React", "Tailwind CSS", "JavaScript"],
                    image: "/brain.png",
                    span: "md:col-span-2 lg:col-span-2",
                    codeLink:
                      "https://github.com/ManahilMustafa/Brainwave-react",
                    liveLink: "https://brainwave-react-five.vercel.app/",
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className={`card-hover group border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in-up ${
                      project.span || ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`${
                        project.featured ? "aspect-[4/3]" : "aspect-video"
                      } bg-muted rounded-t-lg overflow-hidden`}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className={project.featured ? "pb-4" : "pb-2"}>
                      <CardTitle
                        className={`font-heading text-primary ${
                          project.featured ? "text-xl" : "text-lg"
                        }`}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech
                          .slice(0, project.featured ? 4 : 2)
                          .map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-muted text-foreground text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent flex-1"
                        >
                          <a
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          className="bg-accent hover:bg-accent/90 flex-1"
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wordpress" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
                {[
                  {
                    title: "Permian Waste Valet",
                    description:
                      "Professional trash valet and pressure washing service website built using a purchased WordPress theme, customized for business needs.",
                    tech: [
                      "Theme Customization",
                      "Elementor Pro",
                      "Custom CSS",
                      "SEO",
                    ],
                    image: "/trash.JPG",
                    featured: true,
                    span: "md:col-span-2 lg:col-span-2",

                    liveLink: "https://permianwastevalet.com/",
                  },
                  {
                    title: "Elite Comfort Hub",
                    description:
                      "A premium e-commerce site built on WordPress with a purchased theme, customized to showcase and sell high-end home comfort products like massage chairs, accent chairs, and sofas, featuring free shipping, extended warranties, and smooth shopping experience.",
                    tech: ["WooCommerce", "Custom Theme", "Payment Gateway"],
                    image: "/comfort.JPG",
                    span: "lg:col-span-1",
                    liveLink: "https://elitecomforthub.co.uk/",
                  },
                  {
                    title: "Goditela – Slow Travel Experiences",
                    description:
                      "A WordPress site for curated slow-travel experiences for over-65 explorers. Built with a purchased theme and customized to feature small-group trips, cultural immersion, and mindful travel in Italy.",
                    tech: ["Custom Theme", "ACF", "Google Maps"],
                    image: "/cards.JPG",
                    span: "lg:col-span-1",
                    liveLink: "https://www.goditela.com/",
                  },
                  {
                    title: "Traveling With Cents",
                    description:
                      "A boutique WordPress travel agency website featuring accessible and personalized vacation planning, including luxury getaways, cruises, and custom itineraries tailored for clients across the United States. Built using a purchased theme and customized to showcase services, travel expertise, and easy booking.",
                    tech: ["WordPress", "Custom Post Types", "ACF Pro", "Maps"],
                    image: "/cup.JPG",
                    span: "lg:col-span-1",
                    liveLink: "https://www.travelingwithcents.com/",
                  },
                  {
                    title: "K&B Wellness Services",
                    description:
                      "A professional WordPress site for mental and emotional wellness services in Illinois and Indiana. The site was built using a purchased theme and customized to feature therapy bookings, service overviews, and personalized mental health support.",
                    tech: ["WordPress", "Booking System", "HIPAA Compliance"],
                    image: "/well.JPG",
                    span: "lg:col-span-1",
                    liveLink: "https://yourdomain.com/medical",
                  },
                  {
                    title: "Educational Platform",
                    description:
                      "Online learning platform with course management and student tracking",
                    tech: [
                      "WordPress",
                      "LearnDash",
                      "Custom Development",
                      "LMS",
                    ],
                    image: "/food.JPG",
                    span: "md:col-span-2 lg:col-span-2",
                    liveLink: "https://www.recipetineats.com/",
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className={`card-hover group border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in-up ${
                      project.span || ""
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`${
                        project.featured ? "aspect-[4/3]" : "aspect-video"
                      } bg-muted rounded-t-lg overflow-hidden`}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className={project.featured ? "pb-4" : "pb-2"}>
                      <CardTitle
                        className={`font-heading text-accent ${
                          project.featured ? "text-xl" : "text-lg"
                        }`}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-sm">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech
                          .slice(0, project.featured ? 4 : 3)
                          .map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-accent text-accent text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          asChild
                          size="sm"
                          className="bg-accent hover:bg-accent/90 w-full"
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Live
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Client Testimonials
            </h2>
            <p className="text-muted-foreground text-lg">
              What clients say about working with me
            </p>
          </div>

          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to start your next project? Lets work together!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-slide-in-left">
              <h3 className="font-heading font-semibold text-xl mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>mustafamanahil2@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+92 342 5613587</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Pakistan</span>
                </div>
                <div className="flex items-center">
                  <a
                    href="https://www.fiverr.com/manahilmusta090"
                    className="text-muted-foreground hover:text-primary transition-colors group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiFiverr className="h-15 w-15 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <Card className="animate-slide-in-left animate-delay-200">
              <CardHeader>
                <CardTitle className="font-heading">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2025, Manahil Mustafa. <span className="text-primary"></span>{" "}
          </p>
        </div>
      </footer>
    </div>
  );
}
