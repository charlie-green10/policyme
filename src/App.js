import './App.css';
import { useCharacterBuilder } from './useCharacterBuilder';
import { Character } from './components/character';


function App() {
  const {
    characters,
    newCharacter,
    updateAttribute,
    updateSkill,
    getAttributeModifier,
    characterMeetsClass,
    getSkillPoints,
    saveCharacters
  } = useCharacterBuilder();

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {Object.values(characters).map(character => {
          return (
            <Character 
              key={character.uuid}
              character={character}
              updateAttribute={updateAttribute(character.uuid)}
              updateSkill={updateSkill(character.uuid)}
              getAttributeModifier={getAttributeModifier(character.uuid)}
              characterMeetsClass={characterMeetsClass(character.uuid)}
              getSkillPoints={getSkillPoints(character.uuid)}
            />
          )
        })}
        <div style={{ margin: '10px' }}>
          <button onClick={newCharacter}>
            Add Character
          </button>
          <button onClick={saveCharacters}>
            Save Characters
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
