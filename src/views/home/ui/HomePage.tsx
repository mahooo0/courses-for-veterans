import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { ForWhom } from "@/widgets/for-whom";
import { HowItWorks } from "@/widgets/how-it-works";
import { Courses } from "@/widgets/courses";
import { VideoSection } from "@/widgets/video-section";
import { ContactForm } from "@/widgets/contact-form";
import { Faq } from "@/widgets/faq";
export function HomePage() {
  return (
    <div className="min-h-screen bg-green-dark">
      <Header />
      <Hero />
      <ForWhom />
      <HowItWorks />
      <Courses />
      <VideoSection />
      <ContactForm />
      <Faq />
    </div>
  );
}
