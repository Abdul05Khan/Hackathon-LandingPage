"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ExternalLink, Users } from "lucide-react"

export default function HackathonLanding() {
  const heroRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const project1Ref = useRef<HTMLElement>(null)
  const project2Ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
      rootMargin: "-20% 0px -20% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement
        const ratio = entry.intersectionRatio

        if (element.classList.contains("project-section")) {
          // Scale and opacity effects with better range
          const scale = Math.max(0.85, 0.85 + ratio * 0.15)
          const opacity = Math.max(0.4, ratio * 1.2)

          element.style.transform = `scale(${scale})`
          element.style.opacity = Math.min(1, opacity).toString()

          // Add focus effect when more than 50% in view
          if (ratio > 0.5) {
            element.classList.add("in-focus")
          } else {
            element.classList.remove("in-focus")
          }
        }
      })
    }, observerOptions)

    // Observe project sections
    if (project1Ref.current) observer.observe(project1Ref.current)
    if (project2Ref.current) observer.observe(project2Ref.current)

    // Scroll animation handler with improved logic
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Hero parallax effect
      if (heroRef.current) {
        const heroOffset = scrollY * 0.3
        heroRef.current.style.transform = `translateY(${heroOffset}px)`
      }

      // Team section parallax effect
      if (teamRef.current) {
        const teamOffset = scrollY * 0.1
        teamRef.current.style.transform = `translateY(${teamOffset}px)`
      }

      // Project sections parallax with better performance
      const sections = [project1Ref.current, project2Ref.current]
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect()
          const isVisible = rect.top < windowHeight && rect.bottom > 0

          if (isVisible) {
            // Apply subtle parallax to background elements
            const backgroundElements = section.querySelectorAll(".parallax-bg")
            backgroundElements.forEach((el) => {
              const element = el as HTMLElement
              const offset = (scrollY - section.offsetTop) * 0.2
              element.style.transform = `translateY(${offset}px)`
            })
          }
        }
      })
    }

    // Set initial states for project sections
    const initializeProjectSections = () => {
      ;[project1Ref.current, project2Ref.current].forEach((section) => {
        if (section) {
          section.style.transform = "scale(0.85)"
          section.style.opacity = "0.4"
        }
      })
    }

    initializeProjectSections()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth snap-y snap-mandatory">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center relative snap-center">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Team 11
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto px-4">
            Two innovative projects. One incredible journey. Scroll to explore our creations.
          </p>
          <button
            onClick={() => scrollToSection(teamRef)}
            className="animate-bounce p-4 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black pointer-events-none" />
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 pb-40 relative snap-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Users className="w-8 h-8 text-purple-400" />
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Our Team
              </h2>
            </div>

            <p className="text-xl text-gray-400 mb-16">
              Meet the passionate developers behind these innovative projects
            </p>

            {/* Team Members */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { name: "Abdul", role: "Developer" },
                { name: "Hayfa", role: "Developer" },
                { name: "Ibrahim", role: "Team Lead" },
                { name: "Ridwan", role: "Developer" },
              ].map((member, index) => (
                <div key={member.name} className="group">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              ))}
            </div>

            {/* Team Name */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full border border-purple-500/20 backdrop-blur-sm mb-16">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Deen Developers
              </span>
            </div>

            <div>
              <button
                onClick={() => scrollToSection(project1Ref)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                Explore Our Projects
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project 1 */}
      <section
        ref={project1Ref}
        className="project-section min-h-screen flex items-center justify-center py-20 relative transition-all duration-700 ease-out snap-center"
      >
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  Project Alpha
                </span>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Field Medical Station
                  <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                    FrontLine
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Field Medical Station is a voice-powered medical assistant that lets doctors dictate patient information hands-free. It
                  extracts key details like name, age, and symptoms, and helps prioritise cases by urgency, streamlining
                  triage and patient management in high-pressure environments.
                </p>
              </div>

              <Link
                href="/project-1"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                Explore Project Alpha
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 overflow-hidden">
                <Image
                  src="/images/field-medical-station.png"
                  alt="Field Medical Station - Voice-powered medical assistant interface"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project 2 */}
      <section
        ref={project2Ref}
        className="project-section min-h-screen flex items-center justify-center py-20 relative transition-all duration-700 ease-out snap-center"
      >
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-gray-700 overflow-hidden">
                <Image
                  src="/images/gaza-journals.jpeg"
                  alt="Gaza Journals - Preserving Palestinian voices through daily audio journals"
                  width={600}
                  height={400}
                  className="w-full h-96 object-contain bg-white"
                />
              </div>
            </div>

            <div className="space-y-8 lg:order-2">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium">
                  Project Beta
                </span>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Voices From Gaza
                  <span className="block text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text">
                    Green Birds
                  </span>
                </h2>
                <div className="text-xl text-gray-300 leading-relaxed space-y-6">
                  <p>
                    <strong>Gaza Diary</strong> captures the raw, unfiltered experiences of people living through the
                    ongoing siege in Gaza.
                  </p>

                  <p>
                    Through personal diary entries, voice recordings, and daily reflections, residents share their
                    encounters with war, survival, loss, and resilience, in their own words.
                  </p>

                  <p>
                    This archive is a living testimony of life under blockade. Every entry is real. Every voice is from
                    the ground.
                  </p>

                  <p className="italic">It's not news — it's lived reality.</p>
                </div>
              </div>

              <Link
                href="/project-2"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
              >
                Explore Project Beta
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-gray-800 snap-center">
        <p className="text-gray-400">Built with passion</p>
      </footer>
    </div>
  )
}
