import React, { useState, useEffect } from 'react';
import './App.css';
import './chatbot.css';
import Chatbot from './Chatbot';

function App() {
  const [displayedName, setDisplayedName] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const fullName = 'Michael Caldo!';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullName.length) {
        setDisplayedName(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Trigger animation on initial load
  useEffect(() => {
    if (initialLoad) {
      setActiveSection('about');
      setTimeout(() => {
        setActiveSection('');
        setInitialLoad(false);
      }, 1000);
    }
  }, [initialLoad]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        setActiveSection('');
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <div className="scanlines"></div>
      <div className="noise"></div>
      
      <div className="terminal-window">
        <div className="window-header">
          <div className="window-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <div className="window-title">michael@portfolio:~</div>
        </div>

        <div className="terminal-content">
          <div className="hero-section">
            <h1 className="name-display">
              HELLO, I'm<br />
              {displayedName}
              <span className="cursor">|</span>
            </h1>
            <div className="subtitle-container">
              <p className="subtitle">Junior Software Developer</p>
              <a 
                href="/michaelCaldo_Resume.pdf" 
                download="Michael_Caldo_Resume.pdf"
                className="resume-button"
              >
                <span>📄</span> Download Resume
              </a>
            </div>
            <p className="bio">
              Full-stack developer specializing in AI integration and modern web applications. 
              Previously worked as a Junior Software Developer Intern at <a href="https://www.nexlogic.ph/" target="_blank" rel="noopener noreferrer" className="bio-link">NexLogic Telecommunications</a>, 
              where I contributed to AI-powered chatbots and Flutter mobile applications. Also joined the <a href="https://www.whitecloak.com/" target="_blank" rel="noopener noreferrer" className="bio-link">WhiteCloak</a> Launch Pad program 
              as a Software Engineer Trainee, and worked on the dating application Affinelle and the AI assistant Jia AI. 
              Passionate about building AI-driven solutions that solve real-world problems.
            </p>

            <div className="nav-buttons">
              <button onClick={() => scrollToSection('about')}>
                WORK EXPERIENCE
              </button>
              <button onClick={() => scrollToSection('projects')}>
                PROJECTS
              </button>
              <button onClick={() => scrollToSection('education')}>
                EDUCATION
              </button>
              <button onClick={() => scrollToSection('skills')}>
                SKILLS
              </button>
              <button onClick={() => scrollToSection('contact')}>
                CONTACT
              </button>
            </div>
          </div>

          <div id="about" className={`content-section ${activeSection === 'about' ? 'typing-animation' : ''}`}>
            <h2>&gt; Work Experience and Training</h2>
            <div className="section-content">
              <div className="education-item">
                <div className="edu-title">Software Engineer Trainee</div>
                <div className="edu-degree"><a href="https://www.whitecloak.com/" target="_blank" rel="noopener noreferrer" className="bio-link">WhiteCloak</a> Launch Pad Program</div>
                <div className="edu-date">Nov 2025 - Dec 2025</div>
                <ul className="work-details">
                  <li>Worked on Affinelle, a full-stack dating application with real-time chat and geolocation matching.</li>
                  <li>Contributed to Jia AI, an AI assistant project focused on natural language processing.</li>
                  <li>Gained hands-on experience and learned more about AI-driven workflows.</li>
                </ul>
              </div>
              
              <div className="education-item">
                <div className="edu-title">Junior Software Developer Intern</div>
                <div className="edu-degree"><a href="https://nexlogic.com.ph/" target="_blank" rel="noopener noreferrer" className="bio-link">NexLogic Telecommunications</a> - Silang, Cavite, Philippines</div>
                <div className="edu-date">Feb 2025 - Apr 2025</div>
                <ul className="work-details">
                  <li>Developed a Telegram Liquidation bot integrated with LLM Model (LLaVA AI) that converts images into text.</li>
                  <li>Built a Flutter-based mobile app to assist linemen, improving task efficiency and reporting accuracy.</li>
                  <li>Learned to use AI code assistance and how to work with LLM Models.</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="projects" className={`content-section ${activeSection === 'projects' ? 'typing-animation' : ''}`}>
            <h2>&gt; Projects</h2>
            <div className="section-content">
              <div className="project-item">
                <div className="project-header">
                  <span className="project-number">[1]</span>
                  <span className="project-title">Affinelle (Dating App)</span>
                  <span className="project-tech">Next.js, TypeScript, Node.js, MongoDB, Socket.io</span>
                </div>
                <ul className="project-details">
                  <li>Full-stack dating platform with real-time chat</li>
                  <li>Geolocation matching, swipe-based discovery</li>
                  <li>Secure authentication, profile management</li>
                  <li>Deployed on Vercel and Render with Docker</li>
                  <li>Live: <a href="https://affinelle.vercel.app" target="_blank" rel="noopener noreferrer" className="project-link">https://affinelle.vercel.app</a></li>
                </ul>
              </div>

              <div className="project-item">
                <div className="project-header">
                  <span className="project-number">[2]</span>
                  <span className="project-title">ELSAR (Earth and Life Science in AR)</span>
                  <span className="project-tech">Unity, Vuforia, C#</span>
                </div>
                <ul className="project-details">
                  <li>AR educational app for senior high school students</li>
                  <li>Interactive 3D models and quizzes</li>
                  <li>Designed UI and implemented AR tracking</li>
                </ul>
              </div>

              <div className="project-item">
                <div className="project-header">
                  <span className="project-number">[3]</span>
                  <span className="project-title">HCM (Human Capital Management System)</span>
                  <span className="project-tech">React, TypeScript, Node.js, Firebase</span>
                </div>
                <ul className="project-details">
                  <li>Full-stack employee attendance system</li>
                  <li>Real-time punch tracking, automatic hour calculations</li>
                  <li>Role-based authentication, responsive dashboards</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="education" className={`content-section ${activeSection === 'education' ? 'typing-animation' : ''}`}>
            <h2>&gt; Education</h2>
            <div className="section-content">
              <div className="education-item">
                <div className="edu-title">STI College Dasmariñas</div>
                <div className="edu-degree">Bachelor of Science in Computer Science</div>
                <div className="edu-date">2021 - 2025 | Dasmariñas City, Cavite</div>
              </div>
              
              <div className="education-item">
                <div className="edu-title">FEAPITSAT College Dasmariñas</div>
                <div className="edu-degree">Information and Communications Technology (ICT)</div>
                <div className="edu-date">2018 - 2020 | Dasmariñas City, Cavite</div>
              </div>
            </div>
          </div>

          <div id="skills" className={`content-section ${activeSection === 'skills' ? 'typing-animation' : ''}`}>
            <h2>&gt; Technical Skills</h2>
            <div className="section-content">
              <div className="skills-grid">
                <div className="skill-category">
                  <h3>Frontend</h3>
                  <ul>
                    <li>JavaScript</li>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>React</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h3>Backend/Database</h3>
                  <ul>
                    <li>Java</li>
                    <li>Node.js</li>
                    <li>Firebase</li>
                    <li>MongoDB</li>
                    <li>SQL/NoSQL</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h3>Tools & Platforms</h3>
                  <ul>
                    <li>Git, GitHub, GitLab</li>
                    <li>Vercel, Render, Figma</li>
                    <li>Android Studio</li>
                    <li>Visual Studio</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h3>Mobile & AR/VR</h3>
                  <ul>
                    <li>Flutter</li>
                    <li>Unity</li>
                    <li>Vuforia</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h3>Troubleshooting & Support</h3>
                  <ul>
                    <li>Software/hardware diagnostics</li>
                    <li>Preventive maintenance</li>
                    <li>Client assistance</li>
                  </ul>
                </div>
                
                <div className="skill-category">
                  <h3>Installation & Configuration</h3>
                  <ul>
                    <li>Mobile apps, APIs</li>
                    <li>Basic networking</li>
                    <li>Device setup</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className={`content-section ${activeSection === 'contact' ? 'typing-animation' : ''}`}>
            <h2>&gt; Contact Information</h2>
            <div className="section-content">
              <div className="contact-grid">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:caldomichael10@gmail.com" className="contact-value">caldomichael10@gmail.com</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <span className="contact-value">09939657804</span>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span className="contact-value">Dasmariñas, Cavite, Philippines</span>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">LinkedIn:</span>
                  <a href="https://www.linkedin.com/in/michael-caldo-610409377/" target="_blank" rel="noopener noreferrer" className="contact-value">linkedin.com/in/michael-caldo-610409377</a>
                </div>
                
                <div className="contact-item">
                  <span className="contact-label">GitHub:</span>
                  <a href="https://github.com/222michael" target="_blank" rel="noopener noreferrer" className="contact-value">github.com/222michael</a>
                </div>
              </div>
              
              <p className="contact-cta">Feel free to reach out for collaborations or opportunities!</p>
            </div>
          </div>

          <div className="footer-prompt">
            <span>$ explore --more</span>
            <span className="cursor">|</span>
          </div>
        </div>
      </div>

      <button className="chatbot-button" onClick={toggleChat} aria-label="Open AI Chatbot">
        <span className="chatbot-icon">🤖</span>
        {isChatOpen && <span className="chatbot-pulse"></span>}
      </button>

      <Chatbot isOpen={isChatOpen} onClose={toggleChat} />
    </div>
  );
}

export default App;