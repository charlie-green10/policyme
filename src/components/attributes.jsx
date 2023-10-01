import React from 'react';
import { Section } from './section';
import { ATTRIBUTE_MAX } from '../useCharacterBuilder';

export const Attributes = ({
    attributes,
    updateAttribute
}) => {
    return (
        <Section>
            <h2>Attributes</h2>
            <h3>Attribute points: {Object.values(attributes).reduce((a, b) => { return a + b; }, 0)}/{ATTRIBUTE_MAX}</h3>
            {Object.entries(attributes).map(([attribute, amount]) => {
                return (
                    <div key={attribute}>
                        <span>{attribute} (modifier: {Math.floor((amount - 10) / 2)})</span>
                        <button onClick={() => updateAttribute(attribute, '-')}>-</button>
                        <span>{amount}</span>
                        <button onClick={() => updateAttribute(attribute, '+')}>+</button>
                    </div>
                );
            })}
        </Section>
    );
}