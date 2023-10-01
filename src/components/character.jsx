import React from 'react';
import styled from 'styled-components';
import { Attributes } from './attributes'; 
import { Classes } from './classes';
import { Skills } from './skills';
import { SkillCheck } from './skillCheck';

import '../App.css';


export const  Character = ({
    character,
    updateAttribute,
    updateSkill,
    getAttributeModifier,
    characterMeetsClass,
    getSkillPoints
}) => {
    return (
        <Container>
            <SkillCheck 
                skills={character.skills}
            />
            <div style={{display: 'flex'}}>
                <Attributes 
                    attributes={character.attributes}
                    updateAttribute={updateAttribute}
                />
                <Classes 
                    attributes={character.attributes}
                    characterMeetsClass={characterMeetsClass}
                />
                <Skills
                    skills={character.skills}
                    updateSkill={updateSkill}
                    getSkillPoints={getSkillPoints}
                    getAttributeModifier={getAttributeModifier}
                />
            </div>
        </Container>
        
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid white;
    margin: 10px;
    padding: 10px;
`;