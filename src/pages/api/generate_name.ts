// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';
require('dotenv').config();

import {MoralAlignment, LawfulAlignment} from "../../types";
import {getAlignmentString} from "../../utils";
import DnDRaces from "../../data/DnDRaces.json";
import DnDClasses from "../../data/DnDClasses.json";

type GenerateResponse = {
    name: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


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


        return res.status(200).json(
            {
                name: dndName,
            },
        );
}

