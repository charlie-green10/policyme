import React, { useState } from 'react';
import { CLASS_LIST } from '../consts';
import { Section } from './section';
export const Classes = ({
    characterMeetsClass
}) => {
    return (
        <Section>
            <h2>Classes</h2>
            {Object.entries(CLASS_LIST).map(([className, values]) => {
                return <ClassRequirements key={className} name={className} values={values} active={characterMeetsClass(className)}/>
            })}
        </Section>
    );
}


const ClassRequirements = ({
    name,
    values,
    active
}) => {

    const [ showRequirements, setShowRequirements ] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <button style={{backgroundColor: active ? '#00aa00' : undefined}} onClick={() => setShowRequirements(current => !current)}>
                {name}
            </button>
            {showRequirements ? (
                Object.entries(values).map(([attribute, amount]) => {
                    return (
                        <span key={attribute}>{attribute}: {amount}</span>
                    );
                })
            ) : null}
        </div>
    );
}