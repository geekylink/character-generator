// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';
require('dotenv').config();

import {MoralAlignment, LawfulAlignment} from "../../types";
import {getAlignmentString} from "@/utils";
import DnDRaces from "../../data/DnDRaces.json";
import DnDClasses from "../../data/DnDClasses.json";
import { isNumber } from "node:util";
import { isNumberObject } from "node:util/types";

type GenerateResponse = {
    name: string;
    backstory: string;
    race: string;
    class: string;
    abilities: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    }
    moralAlignment: string;
    lawfulAlignment: string;
    avatarURL: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rips the int value of the abilityname (ie "Wisdom") from the full abilities string
const ripAbility = (abilities: String, abilityName: string): number => {

    abilities = abilities.toLowerCase();
    abilityName = abilityName.toLowerCase();

    const abilityId = abilities.indexOf(abilityName);
    let abilityStr = abilities.substring(abilityId);

    // Find first number, use that to get substring first part
    let abilityIdEnd = 0;
    for (let i = 0; i < abilityStr.length; i++) {
        if (!isNaN(Number(abilityStr[i]))) {
            abilityStr = abilityStr.substring(i);
            break;
        }
    }

    // Find first non-number after number, use that to get substring last paprt
    for (let i = 0; i < abilityStr.length; i++) {
        if (isNaN(Number(abilityStr[i]))) {
            abilityStr = abilityStr.substring(0,i);
            break;
        }
    }

    return Number(abilityStr);
}

export default async function handler( 
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) { // API entry point

        let dndRace = req.body["race"] ?? "Any";
        let dndName = req.body["name"] ?? "";
        let dndClass = req.body["class"] ?? "Any"; 
        let dndLawful = req.body["lawfulness"] ?? "Any";
        let dndMoral = req.body["moral"] ?? "Any";

        if (dndRace === "Any") {
            const raceId = Math.floor(Math.random() * DnDRaces.length);
            dndRace = DnDRaces[raceId].name;
        }

        if (dndClass === "Any") {
            const classId = Math.floor(Math.random() * DnDClasses.length);
            dndClass = DnDClasses[classId].name;
        }

        if (dndLawful === "Any") {
            const lawfulId = Math.floor(Math.random() * 3);
            dndLawful = LawfulAlignment[lawfulId];
        }

        if (dndMoral === "Any") {
            const moralId = Math.floor(Math.random() * 3);
            dndMoral = MoralAlignment[moralId];
        }

        const alignmentStr = getAlignmentString(dndLawful, dndMoral);
        console.log(dndClass, dndRace, alignmentStr);

        if (dndName == "") {
            console.log("name gennnnn....");
            const nameCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: `Generate Dungeons and Dragons character that has the race of ${dndRace} and a class of ${dndClass} and an alignment: ${alignmentStr} and return ONLY the name without labeling it as such` }],
                model: 'gpt-3.5-turbo',
            });
            dndName = nameCompletion.choices[0].message.content ?? "";   
        }
        console.log(dndName);

        const abilityCompletion  = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Generate Dungeons and Dragons character backstory for a character named ${dndName} who has the race of ${dndRace} and a class of ${dndClass} and an alignment: ${alignmentStr} and return ONLY the ability scores` }],
            model: 'gpt-3.5-turbo',
        });

        let dndAbilityStr = abilityCompletion.choices[0].message.content ?? "";  
        console.log(dndAbilityStr);

        const strength = ripAbility(dndAbilityStr, "strength");
        const dexterity = ripAbility(dndAbilityStr, "dexterity");
        const constitution = ripAbility(dndAbilityStr, "constitution");
        const intelligence = ripAbility(dndAbilityStr, "intelligence");
        const wisdom = ripAbility(dndAbilityStr, "wisdom");
        const charisma = ripAbility(dndAbilityStr, "charisma");

        console.log("Abilities:", strength, dexterity, constitution, intelligence, wisdom, charisma);

        /*const backstoryCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Generate Dungeons and Dragons character backstory for a character named ${dndName} who has the race of ${dndRace} and a class of ${dndClass} and an alignment: ${alignmentStr} and return ONLY the backstory` }],
            model: 'gpt-3.5-turbo',
        });
        const backstory = backstoryCompletion.choices[0].message.content ?? "";*/
        const backstory = "";
        
        console.log(`Name: ${dndName} \nClass: ${dndClass} \nRace: ${dndRace} \n\n${backstory}`);

        /*const response = await openai.images.generate({   
            prompt: `A fantasy portrait of a Dungeons and Dragons character that has the race of ${dndRace} and a class of ${dndClass} and is named ${dndName} and an alignment: ${alignmentStr}`,
            n: 1,
            size: "1024x1024",
        });

        const avatarURL = response.data[0].url ?? "";*/
        const avatarURL = "";

        console.log(avatarURL);

        return res.status(200).json(
            {
            name: dndName,
            race: dndRace,
            class: dndClass,
            moralAlignment: dndMoral,
            lawfulAlignment: dndLawful,
            abilities: {
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma,
            },
            backstory,
            avatarURL,
            },
        );
}

