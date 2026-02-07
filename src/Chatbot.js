import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm Michael's AI assistant. I can answer questions about his experience, skills, and projects. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are Michael Caldo's friendly AI assistant on his portfolio website. Respond in a natural, conversational way as if you're having a casual chat. Avoid using asterisks, bullet points, or formal formatting. Just talk naturally.

About Michael:
He's a full-stack developer specializing in AI integration. He previously worked as a Junior Software Developer Intern at NexLogic Telecommunications where he contributed to AI-powered chatbots and Flutter mobile applications. He also joined the WhiteCloak Launch Pad program as a Software Engineer Trainee, where he worked on the dating application Affinelle and the AI assistant Jia AI. He's studying Computer Science at STI College Dasmariñas (graduating 2025).

His main skills are JavaScript, React, HTML/CSS for frontend, and Firebase, SQL, Node.js for backend. He also does mobile development with Flutter and AR/VR with Unity.

His notable projects:
1. Affinelle - A dating app with real-time chat and geolocation matching, built with Next.js and MongoDB
2. ELSAR - An AR educational app for high school students using Unity
3. HCM System - An employee attendance tracking system with React and Firebase

Contact info:
Email: caldomichael10@gmail.com
Phone: 09939657804
Location: Dasmariñas, Cavite, Philippines
LinkedIn and GitHub: michael-caldo

Keep responses brief, friendly, and conversational. Talk like you're texting a friend, not writing a formal document. If someone asks for contact info, just mention it naturally in a sentence or two.`
            },
            ...newMessages
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Michael Caldo Portfolio'
          }
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      setMessages([...newMessages, { role: 'assistant', content: aiMessage }]);
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact Michael directly at caldomichael10@gmail.com"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>AI Assistant</span>
        <button className="chat-close" onClick={onClose}>✕</button>
      </div>
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role === 'user' ? 'user' : 'bot'}`}>
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot">
            <p className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </p>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          className="chat-send" 
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
