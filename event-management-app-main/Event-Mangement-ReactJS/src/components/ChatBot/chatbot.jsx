import React, { useState } from 'react';
import axios from 'axios';
import './Portfolio.css'; // We'll create this CSS file next
import { FaJs, FaReact, FaNodeJs, FaHtml5, FaPython, FaGit } from 'react-icons/fa';
const Portfolio = () => {
  // Chatbot state (same as before)
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const API_CONFIG = {
    baseUrl: "https://api.aimlapi.com/v1",
    apiKey: "3d116bb1205748f9bf23f53d1a31d5d0", // Replace with your actual key
    model: "gpt-3.5-turbo"
  };
<div className={chat-widget ${chatOpen ? 'open' : ''}}>
<div className="chat-header" onClick={() => setChatOpen(!chatOpen)}>
  <h3>AI Assistant</h3>
  <span>{chatOpen ? '−' : '+'}</span>
        </div>
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = { text: message, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/chat/completions`,
        {
          model: API_CONFIG.model,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that helps answer questions about this portfolio."
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 256
        },
        {
          headers: {
            'Authorization': `Bearer ${API_CONFIG.apiKey}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data?.choices?.[0]?.message?.content) {
        const aiMessage = {
          text: response.data.choices[0].message.content,
          sender: 'ai'
        };
        setChatHistory(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        text: `Error: ${error.message || 'Failed to get response from AI'}`,
        sender: 'ai'
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Portfolio data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description: "Real-time weather application using weather API",
      technologies: ["JavaScript", "API Integration", "CSS"]
    }
  ];

  const skills = [
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "HTML/CSS", icon: <FaHtml5 /> },
    { name: "Python", icon: <FaPython /> },
    { name: "Git", icon: <FaGit /> }
  ];

  return (
    <div className="portfolio-container">
      {/* Header/Navigation */}
      <header className="portfolio-header">
        <h1>Shubham kumar</h1>
        <p>Full Stack Developer</p>
        <nav className="portfolio-nav">
          <button 
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button 
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="portfolio-content">
        {activeTab === 'about' && (
          <section className="about-section">
            <h2>About Me</h2>
            <p>
              I'm a passionate full-stack developer with 5 years of experience 
              building web applications. I specialize in JavaScript technologies 
              and love solving complex problems with clean, efficient code.
            </p>
            <div className="about-image"></div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section className="projects-section">
            <h2>My Projects</h2>
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.technologies.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

{activeTab === 'skills' && (
  <section className="skills-section">
    <h2>Skills & Technologies</h2>
    <div className="skills-list">
      {skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <span className="skill-icon">{skill.icon}</span>
        {  /*<span className="skill-name">{skill.name}</span>*/}
        </div>
      ))}
    </div>
  </section>
)}

        {activeTab === 'contact' && (
          <section className="contact-section">
            <h2>Get In Touch</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>
        )}
      </main>

      {/* AI Chat Widget */}
      <div className={`chat-widget ${chatOpen ? 'open' : ''}`}>
        <div className="chat-header" onClick={() => setChatOpen(!chatOpen)}>
          <h3>AI Assistant</h3>
          <span>{chatOpen ? '−' : '+'}</span>
        </div>
        
        {chatOpen && (
          <div className="chat-container">
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <strong>{msg.sender === 'user' ? 'You:' : 'AI:'}</strong>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                disabled={loading}
              />
              <button type="submit" disabled={!message.trim() || loading}>
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </div>
        )}
      </div>

      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </footer>
    </div>
  );


export default Portfolio;