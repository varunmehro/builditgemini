import React from 'react';
import styles from './styles.module.css';

export const Header = ({ title, level = 1 }) => {
    const Tag = `h${Math.min(level, 6)}`;
    return <Tag className={styles.header}>{title}</Tag>;
};

export const Text = ({ content }) => {
    return <p className={styles.text}>{content}</p>;
};

export const Input = ({ label, placeholder, type = 'text' }) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input type={type} placeholder={placeholder} className={styles.input} />
        </div>
    );
};

export const Button = ({ label, variant = 'primary', onClick }) => {
    return (
        <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
            {label}
        </button>
    );
};

export const StatsCard = ({ label, value }) => {
    return (
        <div className={styles.statsCard}>
            <span className={styles.statsLabel}>{label}</span>
            <span className={styles.statsValue}>{value}</span>
        </div>
    );
}
