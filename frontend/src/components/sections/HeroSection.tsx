import { ArrowRight } from 'lucide-react';
import { CandidateProfile } from '../../types';

interface HeroSectionProps {
  profile: CandidateProfile;
}

const HeroSection = ({ profile }: HeroSectionProps) => {
  // Mock company data for pills - in production, this would come from experience data
  const featuredCompanies = [
    'Amazon',
    'Microsoft',
    'Google',
  ];

  const getAvailabilityBadgeColor = (status: string | null) => {
    if (!status) return 'bg-accent-amber/20 text-accent-amber border-accent-amber/30';
    switch (status.toLowerCase()) {
      case 'available':
      case 'open to opportunities':
        return 'bg-accent-teal/20 text-accent-teal border-accent-teal/30';
      case 'employed':
      case 'not looking':
        return 'bg-card text-text-secondary border-border';
      default:
        return 'bg-accent-amber/20 text-accent-amber border-accent-amber/30';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50 pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `linear-gradient(to right, #4ade80 1px, transparent 1px),
                         linear-gradient(to bottom, #4ade80 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Status Badge */}
        {profile.availability_status && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-8 animate-fade-in">
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              profile.availability_status.toLowerCase() === 'available' ? 'bg-accent-teal' : 'bg-accent-amber'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              profile.availability_status.toLowerCase() === 'available' ? 'bg-accent-teal' : 'bg-accent-amber'
            }`} />
          </span>
          <span className={`text-sm font-medium ${getAvailabilityBadgeColor(profile.availability_status)}`}>
            {profile.availability_status}
          </span>
        </div>
        )}

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 animate-fade-in">
          {profile.name}
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-text-secondary font-inter mb-6 animate-fade-in">
          {profile.title}
        </p>

        {/* Headline/Tagline */}
        <p className="text-2xl sm:text-3xl lg:text-4xl font-playfair text-gradient mb-8 animate-fade-in">
          {profile.headline}
        </p>

        {/* Company Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in">
          {featuredCompanies.map((company, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full text-sm text-text-secondary hover:border-accent-teal hover:text-accent-teal transition-all duration-300 cursor-default"
            >
              {company}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <button
            onClick={() => scrollToSection('chat')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-teal to-accent-teal/80 hover:from-accent-teal/90 hover:to-accent-teal/70 text-background font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-accent-teal/20"
          >
            <span>Let's Talk</span>
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-card/50 backdrop-blur-sm border border-border hover:border-accent-teal/50 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            <span>View Experience</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-text-secondary/50 rounded-full mt-1 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
