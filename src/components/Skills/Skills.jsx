import React, { memo, useMemo } from 'react';
import { technicalSkills, skillsSection } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import SectionHeading from '../shared/SectionHeading';
import Reveal from '../shared/Reveal';
import SkillCard from './SkillCard';
import './Skills.css';

function Skills() {
  const bgStyle = backgrounds?.skills ? { backgroundImage: `url(${backgrounds.skills})` } : undefined;

  const { row1Skills, row2Skills, row3Skills, col1Skills, col2Skills } = useMemo(() => {
    const total = technicalSkills.length;
    const chunkSize = Math.ceil(total / 3);
    const halfSize = Math.ceil(total / 2);

    return {
      row1Skills: technicalSkills.slice(0, chunkSize),
      row2Skills: technicalSkills.slice(chunkSize, chunkSize * 2),
      row3Skills: technicalSkills.slice(chunkSize * 2),
      col1Skills: technicalSkills.slice(0, halfSize),
      col2Skills: technicalSkills.slice(halfSize)
    };
  }, []);

  return (
    <section id="skills" className="section section--ink skills" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading
          eyebrow={skillsSection?.eyebrow || 'Skills & Tech'}
          title={skillsSection?.title || 'Technical Skills'}
          description={
            skillsSection?.description ||
            'Technologies and tools I use to build scalable, responsive and modern applications.'
          }
        />

        <Reveal className="skills__content">
          <div className="skills__horizontal-wrapper">
            <div className="skills__marquee skills__marquee--row1">
              <div className="skills__track skills__track--left">
                {[...row1Skills, ...row1Skills].map((skill, index) => (
                  <SkillCard key={`h-row1-${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>

            <div className="skills__marquee skills__marquee--row2">
              <div className="skills__track skills__track--right">
                {[...row2Skills, ...row2Skills].map((skill, index) => (
                  <SkillCard key={`h-row2-${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>

            <div className="skills__marquee skills__marquee--row3">
              <div className="skills__track skills__track--left">
                {[...row3Skills, ...row3Skills].map((skill, index) => (
                  <SkillCard key={`h-row3-${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="skills__vertical-wrapper">
            <div className="skills__vcol">
              <div className="skills__vtrack skills__vtrack--up">
                {[...col1Skills, ...col1Skills].map((skill, index) => (
                  <SkillCard key={`v-col1-${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>

            <div className="skills__vcol">
              <div className="skills__vtrack skills__vtrack--down">
                {[...col2Skills, ...col2Skills].map((skill, index) => (
                  <SkillCard key={`v-col2-${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default memo(Skills);
