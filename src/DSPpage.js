import React, { useState } from 'react';
import './DSP.css';
import police from './dsp.jpg';
import { useNavigate } from 'react-router-dom';

const DSPDescription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showMessage = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handlehome= () => {
    // Add navigation logic here
    navigate('/'); // Navigate to the signout route
  };
  return (
    <>
    <div style={{marginLeft:"50px"}}>
    <button onClick={handlehome}><h2>HOME</h2></button>
    </div>
    <div className="dsp-description-container">
      <h1>Deputy Superintendent of Police (DSP) - Karnataka Police</h1>
      <br/>
      <br/>
      <section className="dsp-section">
        <center>
          <img src={police} alt="Dr. Alok Mohan, IPS" className="pimg" />
        </center>
        <center><h2>Dr ALOK MOHAN, IPS</h2></center><br/>
        <p>
          <center><button onClick={showMessage}>Message</button></center>
          <br/>
          <br/>
          <br/>
          <strong>Alok Mohan</strong> is the Director General of Police (DGP) of Karnataka. He is an esteemed officer of the 1987 batch of the Indian Police Service (IPS) from the Karnataka cadre. Over his illustrious career, DGP Alok Mohan has held several key positions within the police force, demonstrating exceptional leadership and a commitment to maintaining law and order.
        </p>
        <p>
          He has been instrumental in implementing various innovative policing strategies and community-oriented programs that have significantly contributed to enhancing public safety and crime prevention in Karnataka. Known for his integrity, dedication, and professional excellence, DGP Alok Mohan continues to lead the Karnataka Police with a focus on modernizing the force and improving its efficiency and effectiveness.
        </p>
        <h2>Role and Responsibilities</h2>
        <p>
          The Deputy Superintendent of Police (DSP) is a crucial officer in the Karnataka Police Department. The DSP holds significant responsibilities in maintaining law and order, preventing crime, and ensuring the safety and security of the public.
        </p>
        <p>
          Key responsibilities include:
        </p>
        <ul>
          <li>Supervising police operations within their jurisdiction.</li>
          <li>Leading investigations and ensuring proper documentation of cases.</li>
          <li>Coordinating with other law enforcement agencies and government departments.</li>
          <li>Managing resources and personnel effectively.</li>
          <li>Implementing community policing initiatives and engaging with the public.</li>
        </ul>
      </section>
      
      <section className="dsp-section">
        <h2>Eligibility and Training</h2>
        <p>
          To become a DSP in Karnataka Police, candidates must clear the Karnataka State Public Service Commission (KPSC) examination or be promoted from the ranks of Inspector or Sub-Inspector based on their service record and performance.
        </p>
        <p>
          DSPs undergo rigorous training at the Karnataka Police Academy, focusing on various aspects of law enforcement, leadership, and administrative skills.
        </p>
      </section>

      {isModalOpen && (
        <div className="modal-overlays">
          <div className="modal-contents">
            <h2>Greetings to all,</h2>
            <p>I extend my heartfelt greetings to each and every one of you. It is an immense honor and privilege to be a part of this wonderful community and to serve as the State Police Chief of our great state.</p>
            <p>As the State Police Chief, I bear a deep sense of responsibility and a sincere commitment to your safety and well-being. The well-being of our citizens is at the core of our mission, and we dedicate ourselves to ensuring a secure environment for all.</p>
            <p>We firmly believe in fostering a strong bond between the police and the community. We understand that your active participation is essential in maintaining a safe and secure society.</p>
            <p>The Karnataka State Police follows a people-centric approach, placing utmost importance on trust, transparency, and accountability in policing. Your trust in us is invaluable, and we pledge to uphold the highest standards of professionalism and integrity.</p>
            <p>Let us join hands and work together to build a stronger Karnataka—a place where every citizen feels secure, where justice is upheld, and where harmony and inclusivity thrive. Together, we can create a society that we are all proud to call home.</p>
            <p>Wishing you safety, peace, and prosperity.</p>
            <p style={{ textAlign: 'right' }}>
              <br/>
              ( Alok Mohan, IPS )
              <br/>
              Director General &
              <br/>
              Inspector General of Police,
              <br/>
              Karnataka State.
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DSPDescription;