import { useState } from 'react';
import { ChevronDown, ChevronUp, Building2, MapPin, Calendar } from 'lucide-react';
import { Experience } from '../../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const hasAIContext = Boolean(
    experience.why_joined ||
    experience.why_left ||
    experience.actual_contributions ||
    experience.proudest_achievement ||
    experience.challenges_faced ||
    experience.lessons_learned
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent-teal/50 transition-all duration-300">
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
              <Building2 className="text-accent-teal" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white font-playfair">
                {experience.title}
              </h3>
              <p className="text-accent-amber font-medium">{experience.company_name}</p>
            </div>
          </div>
          {experience.is_current && (
            <span className="px-3 py-1 bg-accent-teal/10 text-accent-teal text-xs font-medium rounded-full">
              Current
            </span>
          )}
        </div>

        {/* Location and Dates */}
        <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm mb-4">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>
              {formatDate(experience.started_on)} - {' '}
              {experience.finished_on ? formatDate(experience.finished_on) : 'Present'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Expandable AI Context Button */}
        {hasAIContext && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-accent-teal hover:text-accent-teal/80 transition-colors text-sm font-medium group"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>Hide AI Context</span>
              </>
            ) : (
              <>
                <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                <span>View AI Context</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Expandable AI Context Section */}
      {isExpanded && hasAIContext && (
        <div className="border-t border-border bg-background/50">
          <div className="p-6 space-y-6">
            {/* Why Joined */}
            {experience.why_joined && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                  Why I Joined
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.why_joined}
                </p>
              </div>
            )}

            {/* Actual Contributions */}
            {experience.actual_contributions && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                  What I Actually Did
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.actual_contributions}
                </p>
              </div>
            )}

            {/* Proudest Achievement */}
            {experience.proudest_achievement && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-amber rounded-full"></span>
                  Proudest Achievement
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.proudest_achievement}
                </p>
              </div>
            )}

            {/* Challenges Faced */}
            {experience.challenges_faced && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                  Challenges Faced
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.challenges_faced}
                </p>
              </div>
            )}

            {/* Lessons Learned */}
            {experience.lessons_learned && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                  Lessons Learned
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.lessons_learned}
                </p>
              </div>
            )}

            {/* Why Left */}
            {experience.why_left && (
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-teal rounded-full"></span>
                  Why I Left
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed pl-4">
                  {experience.why_left}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
