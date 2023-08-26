'use client';

import React, { useState } from 'react';
import axios from 'axios';

import { DnDAbilityBox } from '../';
import DnDRaces from "../../../data/DnDRaces.json";
import DnDClasses from "../../../data/DnDClasses.json";
import { DnDAbilities } from '@/types';

export const DnDCharacterForm: React.FC = () => {
    const [dndRace, setDndRace] = useState("Any");
    const [dndClass, setDndClass] = useState("Any");
    const [dndLawful, setLawful] = useState("Any");
    const [dndMoral, setMoral] = useState("Any");
    const [dndName, setName] = useState("");
    const [dndBackstory, setBackstory] = useState("");
    const [avatarURL, setAvatar] = useState("");
    const [strength,        setStrength]    = useState<Number| undefined>();
    const [dexterity,       setDexterity]    = useState<Number| undefined>();
    const [constitution,    setConstitution] = useState<Number| undefined>();
    const [intelligence,    setIntelligence] = useState<Number| undefined>();
    const [wisdom,          setWisdom]      = useState<Number| undefined>();
    const [charisma,        setCharisma]    = useState<Number| undefined>();

    const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDndRace(event.target.value);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleLawfulChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLawful(event.target.value);
    }

    const handleMoralChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMoral(event.target.value);
    }

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDndClass(event.target.value);
    }

    const handleSubmit = async (e: any) => {
        const response = await axios.post(
            "/api/generate",
            {
                "name":         dndName,
                "race":         dndRace,
                "class":        dndClass,
                "moral":        dndMoral,
                "lawfulness":   dndLawful,
            },
            { headers: { "content-type": "application/json" } }
          );

          const queryResponse = response.data;

          setName(queryResponse.name);
          setBackstory(queryResponse.backstory);
          setAvatar(queryResponse.avatarURL);
          setDndRace(queryResponse.race);
          setDndClass(queryResponse.class);
          setLawful(queryResponse.lawfulAlignment);
          setMoral(queryResponse.moralAlignment);
          setStrength(queryResponse.abilities.strength);
          setDexterity(queryResponse.abilities.dexterity);
          setConstitution(queryResponse.abilities.constitution);
          setIntelligence(queryResponse.abilities.intelligence);
          setWisdom(queryResponse.abilities.wisdom);
          setCharisma(queryResponse.abilities.charisma);


          console.log(queryResponse.abilities);
          console.log(queryResponse.abilities.strength);
          
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <label>
                Name:
                <input type="text" name="name" value={dndName} onChange={handleNameChange} />
            </label><br />
            <label>
                Race:
                <select name="race" value={dndRace} onChange={handleRaceChange}>
                    <option>Any</option>
                    {DnDRaces.map((race, key) => (
                        (race.disabled || race.legacy) ? null : <option value={race.name} key={key}>{race.name} - {race.edition}</option>
                    ))}
                </select>
            </label><br/>
            <label>
                Class:
                <select name="class" value={dndClass} onChange={handleClassChange}>
                    <option>Any</option>
                    {DnDClasses.map((dndClass, key) => (
                        dndClass.disabled ? null : <option value={dndClass.name} key={key}>{dndClass.name} - {dndClass.edition}</option>
                    ))}
                </select>
            </label><br/>
            <label>
                Lawful Alignment:
                <select name="lawful" value={dndLawful} onChange={handleLawfulChange}>
                    <option>Any</option>
                    <option>Lawful</option>
                    <option>Neutral</option>
                    <option>Chaotic</option>
                </select>
            </label><br />
            <label>
                Moral Alignment:
                <select name="moral" value={dndMoral} onChange={handleMoralChange}>
                    <option>Any</option>
                    <option>Good</option>
                    <option>Neutral</option>
                    <option>Evil</option>
                </select>
            </label><br />
            <div style={{"display": "inline-block"}}>
                <DnDAbilityBox abilityName="strength" abilityScore={strength} OnChange={(score: number) => {setStrength(score); console.log(score);}} />
                <DnDAbilityBox abilityName="dexterity" abilityScore={dexterity} OnChange={(score: number) => {setDexterity(score); console.log(score);}}  />
                <DnDAbilityBox abilityName="constitution" abilityScore={constitution} OnChange={(score: number) => {setConstitution(score); console.log(score);}}  />
                <DnDAbilityBox abilityName="intelligence" abilityScore={intelligence} OnChange={(score: number) => {setIntelligence(score); console.log(score);}}  />
                <DnDAbilityBox abilityName="wisdom" abilityScore={wisdom} OnChange={(score: number) => {setWisdom(score); console.log(score);}} />
                <DnDAbilityBox abilityName="charisma" abilityScore={charisma} OnChange={(score: number) => {setCharisma(score); console.log(score);}} />
            </div>
            <br /><br />
            <div>
                <button onClick={handleSubmit}>Generate Character!</button><br /><br />
            </div><hr /><br />
            <label>Character:</label><br />
            <label><strong>Name</strong>: {dndName}</label><br /><br />
            <label><strong>Backstory</strong>: </label><br />
            <textarea value={dndBackstory} >
            </textarea>
            <br /><hr /><br />
            {avatarURL !== "" ? <img src={avatarURL} /> : null}<br />
        </form>
    );
}

export default DnDCharacterForm;
