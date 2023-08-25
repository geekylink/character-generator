'use client';

import React, { useState } from 'react';
import axios from 'axios';

export const DnDCharacterForm: React.FC = () => {
    const [dndRace, setDndRace] = useState("Any");
    const [dndClass, setDndClass] = useState("Any");
    const [dndLawful, setLawful] = useState("Any");
    const [dndMoral, setMoral] = useState("Any");
    const [dndName, setName] = useState("");
    const [dndBackstory, setBackstory] = useState("");
    const [avatarURL, setAvatar] = useState("");

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
                    <option>Dragonborn</option>
                    <option>Dwarf</option>
                    <option>Elf</option>
                    <option>Gnome</option>
                    <option>Half-Elf</option>
                    <option>Halfling</option>
                    <option>Half-Orc</option>
                    <option>Human</option>
                    <option>Tiefling</option>
                    <option disabled={true}>---</option>
                    <option>Aarakocra</option>
                    <option>Aasimar</option>
                    <option>Air Genasi</option>
                    <option>Bugbear</option>
                    <option>Centaur</option>
                    <option>Changeling</option>
                    <option>Deep Gnome</option>
                    <option>Duergar</option>
                    <option>Earth Genasi</option>
                    <option>Fairy</option>
                    <option>Firbolg</option>
                    <option>Fire Genasi</option>
                    <option>Githyanki</option>
                    <option>Githzerai</option>
                    <option>Goblin</option>
                    <option>Goliath</option>
                    <option>Harengon</option>
                    <option>Hobgoblin</option>
                    <option>Kenku</option>
                    <option>Kobold</option>
                    <option>LizardFolk</option>
                    <option>Minotaur</option>
                    <option>Orc</option>
                    <option>Satyr</option>
                    <option>Sea Elf</option>
                    <option>Shadar-kai</option>
                    <option>Shifter</option>
                    <option>Tabaxi</option>
                    <option>Tortle</option>
                    <option>Triton</option>
                    <option>Water Genasi</option>
                    <option>Yuan-ti</option>
                    <option disabled={true}>---</option>
                    <option>Kender</option>
                    <option disabled={true}>---</option>
                    <option>Astral Elf</option>
                    <option>Autognome</option>
                    <option>Giff</option>
                    <option>Hadozee</option>
                    <option>Plasmoid</option>
                    <option>Thri-kreen</option>
                    <option disabled={true}>---</option>
                    <option>Owlin</option>
                    <option disabled={true}>---</option>
                    <option>Lineages</option>
                    <option disabled={true}>---</option>
                    <option>Leonin</option>
                    <option disabled={true}>---</option>
                    <option>Kalashtar</option>
                    <option>Warforged</option>
                    <option disabled={true}>---</option>
                    <option>Verdan</option>
                    <option disabled={true}>---</option>
                    <option>Loxodon</option>
                    <option>Simic Hybrid</option>
                    <option disabled={true}>---</option>
                    <option>Vedalken</option>
                    <option disabled={true}>---</option>
                    <option>Feral Tiefling</option>
                    <option disabled={true}>---</option>
                    <option>Locathah</option>
                    <option disabled={true}>---</option>
                    <option>Grung</option>
                </select>
            </label><br/>
            <label>
                Class:
                <select name="race" value={dndClass} onChange={handleClassChange}>
                    <option>Any</option>
                    <option>Barbarian</option>
                    <option>Bard</option>
                    <option>Cleric</option>
                    <option>Druid</option>
                    <option>Fighter</option>
                    <option>Monk</option>
                    <option>Paladin</option>
                    <option>Ranger</option>
                    <option>Rogue</option>
                    <option>Sorcerer</option>
                    <option>Warlock</option>
                    <option>Wizard</option>
                    <option disabled={true}>---</option>
                    <option>Artificer</option>
                    <option>Blood Hunter</option>
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
            <button onClick={handleSubmit}>Generate Character!</button><br /><br /><hr /><br />
            <label>Character:</label><br />
            <label><strong>Name</strong>: {dndName}</label><br /><br />
            <label><strong>Backstory</strong>: {dndBackstory}</label><br />
            <br /><hr /><br />
            {avatarURL !== "" ? <img src={avatarURL} /> : null}<br />
        </form>
    );
}

export default DnDCharacterForm;
