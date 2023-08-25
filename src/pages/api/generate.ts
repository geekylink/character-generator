// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';
require('dotenv').config();

type GenerateResponse = {
    name: string;
    backstory: string;
    race: string;
    class: string;
    /*abilities: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    }*/
    moralAlignment: string;
    lawfulAlignment: string;
    avatarURL: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LawfulAlignment = [
    "Lawful", "Neutral", "Chaotic"
]

const MoralAlignment = [
    "Good", "Neutral", "Evil"
]

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
            dndRace = "Elf";
        }

        if (dndClass === "Any") {
            dndClass = "Wizard";
        }

        if (dndLawful === "Any") {
            let lawfulId = Math.floor(Math.random() * 3);
            dndLawful = LawfulAlignment[lawfulId];
        }

        if (dndMoral === "Any") {
            let moralId = Math.floor(Math.random() * 3);
            dndMoral = MoralAlignment[moralId];
        }

        console.log(dndClass, dndRace, dndMoral, dndLawful);

        if (dndName == "") {
            console.log("name gennnnn....");
            const nameCompletion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: `Generate Dungeons and Dragons character that has the race of ${dndRace} and a class of ${dndClass} and return ONLY the name without labeling it as such` }],
                model: 'gpt-3.5-turbo',
            });
            dndName = nameCompletion.choices[0].message.content ?? "";   
        }
        console.log(dndName);

        /*const abilityCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Generate Dungeons and Dragons character backstory for a character named ${dndName} who has the race of ${dndRace} and a class of ${dndClass} and return ONLY the ability scores` }],
            model: 'gpt-3.5-turbo',
        });

        const dndAbilityStr = abilityCompletion.choices[0].message.content ?? "";  
        console.log(dndAbilityStr);*/


        const backstoryCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Generate Dungeons and Dragons character backstory for a character named ${dndName} who has the race of ${dndRace} and a class of ${dndClass} and return ONLY the backstory` }],
            model: 'gpt-3.5-turbo',
        });
        const backstory = backstoryCompletion.choices[0].message.content ?? "";
        
        console.log(`Name: ${dndName} \nClass: ${dndClass} \nRace: ${dndRace} \n\n${backstory}`);

        const response = await openai.images.generate({
            prompt: `A fantasy portrait of a Dungeons and Dragons character that has the race of ${dndRace} and a class of ${dndClass} and is named ${dndName}`,
            n: 1,
            size: "1024x1024",
        });
        let image_url = response.data[0].url ?? "";

        console.log(image_url);

        res.status(200).json(
            {
            name: dndName,
            race: dndRace,
            class: dndClass,
            backstory,
            avatarURL: image_url,
            moralAlignment: dndMoral,
            lawfulAlignment: dndLawful,
            },
        );
}

