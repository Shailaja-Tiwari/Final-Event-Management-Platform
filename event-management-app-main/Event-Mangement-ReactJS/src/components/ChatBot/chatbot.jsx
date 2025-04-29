import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Hello! How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef(null);

  const API_KEY = 'b29ea8d49d8242c5a96c315a6fe64440';
  const API_URL = 'https://api.aimlapi.com/v1/chat/completions';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [...messages, userMessage],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "❌ Sorry, I’m having trouble responding. Try again soon."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    wrapper: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 9999,
      fontFamily: "'Segoe UI', sans-serif"
    },
    toggleButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px 18px',
      borderRadius: '30px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      transition: 'background 0.3s',
    },
    toggleButtonHover: {
      backgroundColor: '#1e40af',
    },
    chatbot: {
      width: '360px',
      height: '540px',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      overflow: 'hidden',
      marginTop: '12px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
      animation: isOpen ? 'slideUp 0.3s ease-out' : ''
    },
    header: {
      backgroundColor: '#1e40af',
      color: 'white',
      padding: '16px',
      fontSize: '17px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: '600'
    },
    icon: {
      fontSize: '20px'
    },
    messages: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '20px',
      maxWidth: '80%',
      lineHeight: '1.5',
      wordWrap: 'break-word',
      fontSize: '15px'
    },
    user: {
      backgroundColor: '#2563eb',
      color: 'white',
      alignSelf: 'flex-end',
      borderBottomRightRadius: '6px'
    },
    assistant: {
      backgroundColor: '#f3f4f6',
      color: '#111827',
      alignSelf: 'flex-start',
      borderBottomLeftRadius: '6px'
    },
    error: {
      color: '#dc2626',
      fontSize: '14px',
      padding: '8px 12px',
      textAlign: 'center',
      backgroundColor: '#fee2e2',
      borderRadius: '4px',
      margin: '8px 16px'
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: '#e5e7eb',
      borderRadius: '18px',
      alignSelf: 'flex-start',
      width: 'fit-content'
    },
    dot: {
      height: '10px',
      width: '10px',
      backgroundColor: '#6b7280',
      borderRadius: '50%',
      margin: '0 3px',
      animation: 'bounce 1.5s infinite ease-in-out'
    },
    inputForm: {
      display: 'flex',
      borderTop: '1px solid #ddd',
      backgroundColor: 'white',
      padding: '8px'
    },
    input: {
      flex: '1',
      padding: '12px 16px',
      border: '1px solid #ddd',
      borderRadius: '24px',
      outline: 'none',
      fontSize: '15px',
      marginRight: '8px'
    },
    button: {
      padding: '0 24px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600'
    },
    buttonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed'
    }
  };

  const keyframes = `
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }
    @keyframes slideUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;

  return (
    <div style={styles.wrapper}>
      <style>{keyframes}</style>
      <button
        style={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => e.target.style.background = '#1e40af'}
        onMouseLeave={(e) => e.target.style.background = '#2563eb'}
      >
        {isOpen ? '✖️ Close' : '💬 Chat with us'}
      </button>

      <div style={styles.chatbot}>
        <div style={styles.header}>
          <span style={styles.icon}>🤖</span>
          AI Assistant
        </div>

        <div style={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                ...(msg.role === 'user' ? styles.user : styles.assistant)
              }}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && (
            <div style={styles.typingIndicator}>
              <span style={{ ...styles.dot, animationDelay: '0s' }}></span>
              <span style={{ ...styles.dot, animationDelay: '0.2s' }}></span>
              <span style={{ ...styles.dot, animationDelay: '0.4s' }}></span>
            </div>
          )}

          {errorMessage && <div style={styles.error}>{errorMessage}</div>}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} style={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              ...styles.button,
              ...(isLoading || !input.trim() ? styles.buttonDisabled : {})
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
