import { mutate, query } from './https';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { CLASS_LIST, SKILL_LIST } from './consts.js';

const CHARACTER_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{thats-charlie}/character';
const ATTRIBUTE_MAX = 70;


export const useCharacterBuilder = () => 
{
    const [ characters, setCharacters ] = useState({});

    const createNewCharater = () => {
        return {
            uuid: uuid(),
            attributes : {
                'Strength': 0,
                'Dexterity': 0,
                'Constitution': 0,
                'Intelligence': 0,
                'Wisdom': 0,
                'Charisma': 0
            },
            skills : {
                'Acrobatics': 0,
                'Animal Handling': 0,
                'Arcana': 0,
                'Athletics': 0,
                'Deception': 0,
                'History': 0,
                'Insight': 0,
                'Intimidation': 0,
                'Investigation': 0,
                'Medicine': 0,
                'Nature': 0,
                'Perception': 0,
                'Performance': 0,
                'Persuasion': 0,
                'Religion': 0,
                'Sleight of Hand': 0,
                'Stealth': 0,
                'Survival': 0,
            }
        }
    }

    useEffect(() => {
        (async () => {
            const { success, reply } = await query(CHARACTER_URL);
            if (success && reply) {
                if (!reply.characters || Object.values(reply.characters).length === 0)
                {
                    newCharacter();
                } 
                else {
                    setCharacters(current => {
                        return { ...reply.characters, ...current };
                    });
                }
            }
        })();
        // eslint-disable-next-line
    }, []);

    const newCharacter = () => {
        const character = createNewCharater()
        setCharacters(current => {
            return { ...current, [character.uuid] : character };
        })
    }

    const updateAttribute = (uuid) => {
        return (attr, direction) => {
            let character = characters[uuid]
            if (character) {
                const totalAttributes = Object.values(character.attributes).reduce((a, b) => { return a + b; }, 0);
                if (totalAttributes < ATTRIBUTE_MAX) {
                    character.attributes[attr] += direction === '+' ? 1 : -1;
                    setCharacters(current => {
                        return {
                            ...current,
                            [uuid] : character
                        }
                    });
                }
            }
        }
    }

    const updateSkill = (uuid) => {
        return (skill, direction) => {
            let character = characters[uuid]
            if (character) {
                const points = getSkillPoints(uuid)();
                if (points > 0) {
                    character.skills[skill] += direction === '+' ? 1 : -1;
                    setCharacters(current => {
                        return {
                            ...current,
                            [uuid] : character
                        }
                    });
                }
            }
        }
    }

    const getAttributeModifier = (uuid) => {
        return (skill) => {
            let character = characters[uuid]
            if (character) {
                const attr = SKILL_LIST.find(s => s.name === skill)?.attributeModifier;
                if (attr) {
                    return {attribute: attr, amount: Math.floor((character.attributes[attr] - 10) / 2)};
                }
            }
            return 0;
        }
    }

    const characterMeetsClass = (uuid) => {
        return (classType) => {
            const classValues = CLASS_LIST[classType];
            let character = characters[uuid]
            if (character) {
                return Object.entries(classValues).every(([attr, value]) => {
                    return character.attributes[attr] >= value
                })
            }
            return false;
        }
        
    }

    const getSkillPoints = (uuid) => {
        return () => {
            let character = characters[uuid]
            if (character) {
                const total = 10 + 4 * (Math.floor((character.attributes['Intelligence'] - 10) / 2))
                const spent = Object.values(character.skills).reduce((a, b) => { return a + b; }, 0);
                return Math.max(0, total - spent)
            }
            return 0
        }
    }

    const saveCharacters = async () => {
        await mutate(CHARACTER_URL, { characters }, {}, 'POST');
    }

    return {
        characters,
        newCharacter,
        updateAttribute,
        updateSkill,
        getAttributeModifier,
        characterMeetsClass,
        getSkillPoints,
        saveCharacters
    }
}