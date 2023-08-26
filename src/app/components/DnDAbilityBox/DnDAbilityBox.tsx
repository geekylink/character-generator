'use client';

import React, { useState } from 'react';
import { ShortenAbilityName } from '@/utils';
import styles from './DnDAbilityBox.module.css'

const DEFAULT_ABILITY_SCORE = 10;

type DnDAbilityProps = {
    abilityName: string;
    abilityScore?: number | undefined;
    max?: number;
    min?: number;
    OnChange?: (score: number) => void;
};

export const DnDAbilityBox = ({
    abilityName,
    abilityScore,
    max = 20,
    min = 1,
    OnChange = () => {}
}: DnDAbilityProps) => {
    //const [score, setScore] = useState<Number | undefined>(abilityScore);

    console.log(OnChange);

    const changeScore = (amount: number) => {
        let newScore = Number(((abilityScore === undefined) ? DEFAULT_ABILITY_SCORE : abilityScore)) + amount;

        if (newScore > max) newScore = max;
        if (newScore < min) newScore = min;

        console.log("ll", newScore);
        OnChange(newScore);
    }

    return (
        <div className={styles.abilityBox} >
            <label>{ShortenAbilityName(abilityName)}</label><br />
            <button onClick={() => changeScore(-1)}>-</button>
            <span className={styles.abilityScore}>{abilityScore === undefined ? "-" : "" + abilityScore}</span>
            <button onClick={() => changeScore(1)}>+</button>
        </div>
    );
}

export default DnDAbilityBox;
