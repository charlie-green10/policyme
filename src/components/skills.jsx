import React from 'react';
import { Section } from './section';

export const Skills = ({
    skills,
    getSkillPoints,
    updateSkill,
    getAttributeModifier,
}) => {
    return (
        <Section>
            <h2>Skills</h2>
            <h3>Skill points available: {getSkillPoints()}</h3>
            {Object.entries(skills).map(([skill, amount]) => {
                const { attribute, amount: bonus } = getAttributeModifier(skill);
                return (
                    <div key={skill}>
                        <span>{skill} (Modifier: {attribute}) </span>
                        <button onClick={() => updateSkill(skill, '-')}>-</button>
                        <span>{amount + bonus}</span>
                        <button onClick={() => updateSkill(skill, '+')}>+</button>
                        <span> (Points: {amount}, Modifer: {bonus})</span>
                    </div>
                );
            })}
        </Section>
    );
}