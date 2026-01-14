'use client';
import React, { useState } from 'react';
import { INITIAL_APP_SCHEMA } from '@/lib/schema';
import { ChatInterface } from '@/components/builder/ChatInterface';
import { Preview } from '@/components/builder/Preview';
import { Sidebar } from '@/components/layout/Sidebar';

export default function Home() {
  const [schema, setSchema] = useState(INITIAL_APP_SCHEMA);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', content: "Hello! I'm your App Architect. What kind of mini-app would you like to build today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Call Real Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          currentSchema: schema
        })
      });

      const { reply, updatedSchema, currentPhase: newPhase } = await response.json();

      if (updatedSchema) {
        setSchema(updatedSchema);
      }

      if (newPhase) {
        setCurrentPhase(newPhase);
      }

      // Add AI response
      const aiMsg = { id: Date.now() + 1, sender: 'ai', content: reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setSchema(INITIAL_APP_SCHEMA);
    setCurrentPhase(1);
    setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', content: "App reset. What shall we build next?" }]);
  };

  const handleNewChat = () => {
    setMessages([{ id: Date.now(), sender: 'ai', content: "Starting a new project. What's the goal?" }]);
    setSchema(INITIAL_APP_SCHEMA);
    setCurrentPhase(1);
  }

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <main className={isDarkMode ? 'dark' : ''} style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-app)', color: 'var(--text-primary)' }}>

      {/* 1. Sidebar */}
      <Sidebar onNewChat={handleNewChat} onToggleTheme={handleToggleTheme} isDarkMode={isDarkMode} />

      {/* 2. Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '400px', borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-app)' }}>
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          currentPhase={currentPhase}
        />
      </div>

      {/* 3. Preview / Code Panel (Collapsible logic could go here, stuck open for now) */}
      <div style={{ width: '450px' }}> {/* Fixed width for preview on large screens */}
        <Preview schema={schema} onReset={handleReset} />
      </div>

    </main>
  );
}
