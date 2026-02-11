"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { IntroAnimation } from "@/widgets/intro-animation";
import { ForWhom } from "@/widgets/for-whom";
import { HowItWorks } from "@/widgets/how-it-works";
import { Courses } from "@/widgets/courses";
import { VideoSection } from "@/widgets/video-section";
import { ContactForm } from "@/widgets/contact-form";
import { Faq } from "@/widgets/faq";
import { ContactFormDialog } from "@/features/contact-dialog";
import { courses, type Course } from "@/entities/course";

export function HomePage() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<string>("splash");

  useEffect(() => {
    if (showIntro) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showIntro]);

  const openContactForm = () => setContactDialogOpen(true);
  const openCoursePopup = () => setSelectedCourse(courses[0]);

  const handlePhaseChange = useCallback((phase: string) => {
    setIntroPhase(phase);
  }, []);

  const isUnblurred = introPhase === "cubes-out" || introPhase === "done" || !showIntro;

  return (
    <div className="min-h-screen bg-green-dark">
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation
            onComplete={() => setShowIntro(false)}
            onPhaseChange={handlePhaseChange}
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={{
          filter: isUnblurred ? "blur(0px)" : "blur(6px)",
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Header />
        <Hero onStartToday={openContactForm} onViewCourses={openCoursePopup} />
        <ForWhom />
        <HowItWorks onTryNow={openContactForm} />
        <Courses
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          onStartToday={openContactForm}
        />
        <VideoSection />
        <ContactForm />
        <Faq />
      </motion.div>
      <ContactFormDialog
        isOpen={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      />
    </div>
  );
}
