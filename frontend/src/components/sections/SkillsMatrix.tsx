import { Skill } from '../../types';

interface SkillsMatrixProps {
  skills: Skill[];
}

const SkillsMatrix = ({ skills }: SkillsMatrixProps) => {
  // Group skills by category
  const strongSkills = skills.filter((skill) => skill.category === 'strong');
  const moderateSkills = skills.filter((skill) => skill.category === 'moderate');
  const gapSkills = skills.filter((skill) => skill.category === 'gap');

  const skillsColumns = [
    {
      title: 'Strong Skills',
      description: 'Deep expertise and proven track record',
      skills: strongSkills,
      bgColor: 'bg-accent-teal/10',
      borderColor: 'border-accent-teal/30',
      textColor: 'text-accent-teal',
    },
    {
      title: 'Moderate Skills',
      description: 'Functional knowledge with growing experience',
      skills: moderateSkills,
      bgColor: 'bg-accent-amber/10',
      borderColor: 'border-accent-amber/30',
      textColor: 'text-accent-amber',
    },
    {
      title: 'Gaps & Growth Areas',
      description: 'Actively learning or planning to develop',
      skills: gapSkills,
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Skills Matrix
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            An honest assessment of technical capabilities, organized by proficiency level
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsColumns.map((column) => (
            <div
              key={column.title}
              className={`rounded-lg border ${column.borderColor} ${column.bgColor} p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Column Header */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${column.textColor} mb-2`}>
                  {column.title}
                </h3>
                <p className="text-sm text-text-secondary">{column.description}</p>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {column.skills.length === 0 ? (
                  <p className="text-text-secondary text-sm italic">No skills listed</p>
                ) : (
                  column.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-card/50 rounded-lg p-4 border border-border/50 hover:border-border transition-colors"
                    >
                      {/* Skill Name */}
                      <h4 className="text-white font-medium mb-2">{skill.skill_name}</h4>

                      {/* Evidence */}
                      {skill.evidence && (
                        <div className="mb-3">
                          <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                            Evidence
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {skill.evidence}
                          </p>
                        </div>
                      )}

                      {/* Honest Notes */}
                      {skill.honest_notes && (
                        <div>
                          <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                            Notes
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed italic">
                            {skill.honest_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Optional Summary Section */}
        {(strongSkills.length > 0 || moderateSkills.length > 0 || gapSkills.length > 0) && (
          <div className="mt-12 text-center">
            <p className="text-text-secondary text-sm">
              Total Skills: <span className="text-white font-medium">{skills.length}</span>
              {' · '}
              Strong: <span className="text-accent-teal font-medium">{strongSkills.length}</span>
              {' · '}
              Moderate: <span className="text-accent-amber font-medium">{moderateSkills.length}</span>
              {' · '}
              Gaps: <span className="text-red-400 font-medium">{gapSkills.length}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsMatrix;
