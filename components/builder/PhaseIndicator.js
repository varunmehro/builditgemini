'use client';
import React from 'react';
import { Check } from 'lucide-react';
import styles from './PhaseIndicator.module.css';

const PHASES = [
    "Discovery",
    "Features",
    "Logic",
    "UI",
    "Blueprint",
    "Assembly",
    "Implementation",
    "Evolution"
];

export const PhaseIndicator = ({ currentPhase = 1 }) => {
    return (
        <div className={styles.container}>
            {PHASES.map((phase, index) => {
                const step = index + 1;
                const isActive = step === currentPhase;
                const isCompleted = step < currentPhase;

                return (
                    <div key={phase} className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}>
                        <div className={styles.circle}>
                            {isCompleted ? <Check size={12} strokeWidth={3} /> : step}
                        </div>
                        <span className={styles.label}>{phase}</span>
                        {index < PHASES.length - 1 && <div className={styles.line} />}
                    </div>
                );
            })}
        </div>
    );
};
