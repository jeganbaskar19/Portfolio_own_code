import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiPython,
  SiRuby,
  SiHtml5,
  SiTailwindcss,
  SiBootstrap,
  SiRubyonrails,
  SiSpringboot,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiIntellijidea,
  SiEclipseide,
  SiJsonwebtokens
} from 'react-icons/si';

import {
  FaJava,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaCube,
  FaLayerGroup,
  FaLock,
  FaCode,
  FaCogs,
  FaCss3Alt
} from 'react-icons/fa';

import { VscVscode } from 'react-icons/vsc';

const iconMap = {
  SiReact,
  SiJavascript,
  SiPython,
  SiRuby,
  SiHtml5,
  FaCss3Alt,
  SiTailwindcss,
  SiBootstrap,
  SiRubyonrails,
  SiSpringboot,
  SiNodedotjs,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  VscVscode,
  SiIntellijidea,
  SiEclipseide,
  SiJsonwebtokens,
  FaJava,
  FaServer,
  FaDatabase,
  FaMobileAlt,
  FaCube,
  FaLayerGroup,
  FaLock,
  FaCode,
  FaCogs
};

function SkillCard({ skill }) {
  const IconComponent = iconMap[skill.icon] || FaCogs;

  return (
    <div
      className="skill-card"
      style={{
        '--skill-color': skill.color,
        '--skill-glow': `${skill.color}25`
      }}
      aria-label={`${skill.name} - ${skill.category}`}
    >
      <div className="skill-card__icon-wrapper">
        <IconComponent
          className="skill-card__icon"
          style={{ color: skill.color }}
          aria-hidden="true"
        />
      </div>
      <div className="skill-card__info">
        <h3 className="skill-card__name">{skill.name}</h3>
        <span className="skill-card__category">{skill.category}</span>
      </div>
    </div>
  );
}

export default SkillCard;
