import React, { useState } from 'react';
import './SampleHome.css';
import videoBg from './kspback.mp4'; 
import FeedbackForm from './Home/Feedback';
import { useNavigate } from 'react-router-dom';

function SampleHome() {
  const [showHelplineList, setShowHelplineList] = useState(false);
  const [showFeedback, setFeedback] = useState(false);

  const toggleHelplineList = () => {
    setShowHelplineList(!showHelplineList);
  };
  const toggleFeedback = () => {
    setFeedback(!showFeedback);
  };
  const navigate = useNavigate();
  const handlesignin= () => {
    // Add navigation logic here
    navigate('/Signin'); // Navigate to the signout route
  };
  const handledsp= () => {
    // Add navigation logic here
    navigate('/dsp'); // Navigate to the signout route
  };
  return (
    <div className="give">
      <video autoPlay loop muted id="video-background">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      
      <button className="click" onClick={handledsp}>View dsp</button>
      
      <button className="click" onClick={toggleFeedback}>Feedback Form</button>
      <button className="click" onClick={toggleHelplineList}>Show Helpline Numbers</button>

      <a target="blank" href="https://www.facebook.com/KarnatakaCops/" class="facebook social">
      <i class="fab fa-facebook"></i>
      <span class="hover-text">GoK on facebook</span>
      </a>
      <a target="blank" href="https://www.youtube.com/@karnatakastatepolice6684" class="youtube social">
      <i class="fab fa-youtube"></i>
      <span class="hover-text">GoK on Youtube</span>
      </a>
      <a target="blank" href="https://www.instagram.com/karnatakacops/" class="instagram social">
      <i class="fab fa-instagram"></i>
      <span class="hover-text">GoK on Instagram</span>
      </a>
      <a target="blank" href="https://twitter.com/DgpKarnataka" class="twitter social">
      <i class="fab fa-twitter"></i>
      <span class="hover-text">GoK on Twitter</span>
      </a>
      <a target="blank" href="https://www.karnataka.gov.in/" class="home social">
      <i class="fas fa-home"></i>
      <span class="hover-text">GoK official Website</span>
      </a>

      <button className="top-right-button" onClick={handlesignin}>Sign-in</button>

      <center><b className="blinking">Emergency Number: 112</b></center>
      <center><div className="heading">
      <div className='heading-background'>
        <h1 className='creative-heading '>Karnataka State Police</h1>
        </div>
      </div></center>

      <div className="card-container">
        {showFeedback &&(
        <FeedbackForm/>
          )}
        {showHelplineList && (
          <div className='cardss'>
            <center><h2 style={{color:'green'}}>Emergency Helpline Numbers</h2></center>
            <ul class="helpline-list" style={{color:'grey'}}>
  <li><strong>State Helpline Number:</strong> <a href="tel:1902">1902</a></li>
  <li><strong>Department Helpline Numbers:</strong>
    <ul>
      <li><strong>Health & Family Welfare:</strong> <a href="tel:104">104</a></li>
      <li><strong>Food & Civil Suppliers:</strong> <a href="tel:1967">1967</a> / <a href="tel:180004259339">18000-425-9339</a></li>
      <li><strong>Agriculture:</strong> <a href="tel:08022212818">080-22212818</a> / <a href="tel:08022210237">080-22210237</a></li>
      <li><strong>Public Grievances:</strong> <a href="tel:08044554455">080-44554455</a></li>
      <li><strong>Ambulance:</strong> <a href="tel:102">102</a> / <a href="tel:108">108</a></li>
      <li><strong>Women:</strong> <a href="tel:181">181</a></li>
      <li><strong>Police:</strong> <a href="tel:100">100</a></li>
      <li><strong>BBMP:</strong> <a href="tel:08022660000">080-22660000</a></li>
      <li><strong>Labour:</strong> <a href="tel:155214">155214</a></li>
      <li><strong>BESCOM:</strong> <a href="tel:1912">1912</a></li>
      <li><strong>BWSSB:</strong> <a href="tel:1916">1916</a></li>
      <li><strong>Social Welfare Department:</strong> <a href="tel:155214">155214</a></li>
      <li><strong>MGNREGA:</strong> <a href="tel:18004258666">18004258666</a></li>
    </ul>
  </li>
</ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SampleHome;