export enum LawfulAlignment {
    "Lawful", "Neutral", "Chaotic"
}

export enum MoralAlignment {
    "Good", "Neutral", "Evil"
}

export interface DnDAbilities {
    strength:     number;
    dexterity:    number;
    constitution: number;
    intelligence: number;
    wisdom:       number;
    charisma:     number;
}

export interface dndRace {
    name:   string,
    edition:string,
    legacy?: boolean;
}