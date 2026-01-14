'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { PhaseIndicator } from './PhaseIndicator';
import styles from './Chat.module.css';

export const ChatInterface = ({ messages, onSendMessage, isTyping, currentPhase }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className={styles.chatContainer}>
            {/* Roadmap Header */}
            <PhaseIndicator currentPhase={currentPhase} />

            <div className={styles.messages} ref={scrollRef}>
                {messages.filter(m => m.id > 1).length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '20vh', opacity: 0.5 }}>
                        <div style={{ width: '48px', height: '48px', background: '#ccc', borderRadius: '12px', margin: '0 auto 16px' }}></div>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>How can I help you build?</h2>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.messageRow} ${msg.sender === 'user' ? styles.userRow : styles.aiRow}`}>
                        {msg.sender === 'ai' && <div className={styles.avatar}>AI</div>}
                        <div className={`${styles.bubble} ${msg.sender === 'user' ? styles.userBubble : styles.aiBubble}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.messageRow} ${styles.aiRow}`}>
                        <div className={styles.avatar}>AI</div>
                        <div className={styles.bubble}>
                            <span className={styles.typingDot}>.</span>
                            <span className={styles.typingDot}>.</span>
                            <span className={styles.typingDot}>.</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.inputContainer}>
                <form onSubmit={handleSubmit} className={styles.inputWrapper}>
                    <button type="button" className={styles.attachBtn}>
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your app..."
                        className={styles.input}
                    />
                    <button type="submit" disabled={!input.trim()} className={styles.sendBtn}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};
