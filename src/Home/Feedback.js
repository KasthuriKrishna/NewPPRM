import React, { useState } from 'react';
import './Feedback.css'; // Import CSS file for styling
import feedbackData from './Feedback.json'; // Import JSON file containing feedback data

function FeedbackForm() {
  const [feedbackType, setFeedbackType] = useState('');
  const [subFeedbackType, setSubFeedbackType] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // To handle hover effect
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackTypeChange = (e) => {
    setFeedbackType(e.target.value);
    setFeedback('');
    setSubFeedbackType('');
    setRating(0);
  };

  const handleSubFeedbackTypeChange = (e) => {
    setSubFeedbackType(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleStarClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleStarHover = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }); // Get current month name

    const feedbackDataObj = {
      feedbackType,
      subFeedbackType,
      feedback,
      rating,
      month: currentMonth // Include current month in feedback data
    };

    // Determine the endpoint based on feedback type
    const endpoint = feedbackType === 'Rating' ? 'ratings' : 'public';

    // Add the feedback data to the corresponding array in the JSON
    feedbackData[endpoint].push(feedbackDataObj);

    // Set submitted state to true
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFeedbackType('');
    setSubFeedbackType('');
    setFeedback('');
    setRating(0);
    setHoverRating(0);
  };

  return (
    <div className="feedback-container">
      <h2>Police Department Performance Review</h2>
      {submitted ? (
        <div>
          <p className="submission-message">Thank you for your review!</p>
          <button onClick={handleResetForm} className="submit-another-button">Submit Another Response</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="feedback-type" className="feedback-label">Select Feedback Type:</label>
            <select
              id="feedback-type"
              value={feedbackType}
              onChange={handleFeedbackTypeChange}
              required
              className="feedback-select"
            >
              <option value="">Select Feedback Type</option>
              <option value="Feedback">Feedback</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
          {feedbackType === 'Feedback' && (
            <div>
              <div className="form-group">
                <label htmlFor="feedback-category" className="feedback-label">Select Feedback Category:</label>
                <select
                  id="feedback-category"
                  value={subFeedbackType}
                  onChange={handleSubFeedbackTypeChange}
                  required
                  className="feedback-select"
                >
                  <option value="">Select Feedback Category</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Appreciation">Appreciation</option>
                </select>
              </div>
              {subFeedbackType && (
                <div className="form-group">
                  <h3>{subFeedbackType}</h3>
                  <textarea
                    id="feedback-text"
                    name="feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    required
                    className="feedback-textarea"
                  />
                </div>
              )}
            </div>
          )}
          {feedbackType === 'Rating' && (
            <div className="form-group">
              <label htmlFor="rating" className="feedback-label">Rating:</label>
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <svg
                      key={index}
                      className="star"
                      height="50"
                      width="50"
                      viewBox="0 0 24 24"
                      fill={ratingValue <= (hoverRating || rating) ? "#ffdd00" : "#ddd"}
                      onClick={() => handleStarClick(ratingValue)}
                      onMouseEnter={() => handleStarHover(ratingValue)}
                      onMouseLeave={handleStarHoverLeave}
                    >
                      <polygon points="12,2 15,9 23,9 17,14 19,21 12,17 5,21 7,14 1,9 9,9" />
                    </svg>
                  );
                })}
              </div>
            </div>
          )}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
