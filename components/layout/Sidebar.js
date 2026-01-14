'use client';
import React from 'react';
import { Plus, MessageSquare, Clock, Star, Sun, Moon } from 'lucide-react';
import styles from './styles.module.css';

export const Sidebar = ({ onNewChat, onToggleTheme, isDarkMode }) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logoIcon}>AI</div>
                <span className="font-semibold text-primary">App Builder</span>
            </div>

            <button onClick={onNewChat} className={styles.newChatBtn}>
                <Plus size={18} />
                <span>New Chat</span>
            </button>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Recents</div>
                <div className={styles.navItem}>
                    <MessageSquare size={16} />
                    <span>Project Alpha</span>
                </div>
                <div className={styles.navItem}>
                    <MessageSquare size={16} />
                    <span>Task Manager</span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Library</div>
                <div className={styles.navItem}>
                    <Star size={16} />
                    <span>Starred</span>
                </div>
                <div className={styles.navItem}>
                    <Clock size={16} />
                    <span>History</span>
                </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <button onClick={onToggleTheme} className={styles.navItem} style={{ width: '100%', border: 'none', background: 'transparent' }}>
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </div>
    );
};
