import ExperienceCard from './ExperienceCard';
import { Experience } from '../../types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.started_on);
    const dateB = new Date(b.started_on);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            My professional journey and the stories behind each role
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {sortedExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {/* Empty State */}
        {sortedExperiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">
              No experience data available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
