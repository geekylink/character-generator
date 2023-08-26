import {MoralAlignment, LawfulAlignment} from "@/types";

export const ShortenAbilityName = (abilityName: string): string => {

    abilityName = abilityName.toLowerCase();

    if (abilityName === "strength") return "STR";
    if (abilityName === "dexterity") return "DEX";
    if (abilityName === "constitution") return "CON";
    if (abilityName === "intelligence") return "INT";
    if (abilityName === "wisdom") return "WIS";
    if (abilityName === "charisma") return "CHA";

    console.error("Bad ability name: " + abilityName);
    throw new Error("Bad ability name");
}

export const FullAbilityName = (shortName: string): string => {

    shortName = shortName.toLowerCase();

    if (shortName === "STR") return "strength";
    if (shortName === "DEX") return "dexterity";
    if (shortName === "CON") return "constitution";
    if (shortName === "INT") return "intelligence";
    if (shortName === "WIS") return "wisdom";
    if (shortName === "CHA") return "charisma";

    console.error("Bad short name: " + shortName);
    throw new Error("Bad short name");
}

export const getAlignmentString = (lawfulAlignment: string, moralAlignment: string): string => {
    const alignmentStr = lawfulAlignment + " " + moralAlignment;

    return (lawfulAlignment === "Neutral" && moralAlignment === "Neutral") ? "True Neutral" : alignmentStr;
}