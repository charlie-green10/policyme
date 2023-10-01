import React, { useState } from 'react';

export const SkillCheck = ({
    skills
}) => {
    const [ skill, setSkill ] = useState('Acrobatics');
    const [ DC, setDC ] = useState();
    const [ result, setResult ] = useState();

    const roll = () => {
        if(DC) {
            const rollAmount = Math.ceil(Math.random() * 20);
            setResult({ roll: rollAmount, success:  rollAmount + skills[skill] >= DC })
        }
        
    }

    const onDCChange = (dc) => {
        if(dc.length === 0) {
            setDC(undefined)
        }
        else
        {
            const value = Number(dc);
            setDC(Math.min(20, Math.max(0, value)));
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
                <label htmlFor='skills'>Skill:</label>
                <select name='skills' onChange={e => setSkill(e.target.value)}>
                    {Object.keys(skills).map(skill => {
                        return (
                            <option key={skill} value={skill}>{skill}</option>
                        );
                    })}
                </select>
                <input 
                    type='number' 
                    value={DC}
                    onChange={e => onDCChange(e.target.value)}
                    placeholder='DC'
                />
                <button onClick={roll}>
                    Roll
                </button>
            </div>
            {result ? (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>Roll: {result.roll}</span>
                    <span>Outcome: {result.success ? 'Success' : 'Failure'}</span>
                </div>
            ) : null}
        </div>
        
    );
}