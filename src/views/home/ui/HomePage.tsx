"use client";

import { useState } from "react";
import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
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

  const openContactForm = () => setContactDialogOpen(true);
  const openCoursePopup = () => setSelectedCourse(courses[0]);

  return (
    <div className="min-h-screen bg-green-dark">
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
      <ContactFormDialog
        isOpen={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      />
    </div>
  );
}
