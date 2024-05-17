import React, { useEffect, useState } from 'react';
import './FeedbackDashboard.css'; // Import CSS file for styling
import feedbackData from './Feedback.json'; // Import feedback data
import { useNavigate } from 'react-router-dom';

function FeedbackDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [feedbackByMonth, setFeedbackByMonth] = useState({});
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Group feedback by month
      const groupFeedbackByMonth = () => {
        const feedbackByMonthObj = {};

        feedbackData.public.forEach(({ feedbackType, subFeedbackType, feedback, month }) => {
          if (!feedbackByMonthObj[month]) {
            feedbackByMonthObj[month] = { appreciation: [], suggestion: [], complaint: [] };
          }

          if (feedbackType === 'Feedback') {
            feedbackByMonthObj[month][subFeedbackType.toLowerCase()].push(feedback);
          }
        });

        return feedbackByMonthObj;
      };

      // Extract ratings data
      const ratings = feedbackData.ratings.map(({ rating, month }) => ({ rating, month }));
      setRatingData(ratings);

      // Set feedback by month
      setFeedbackByMonth(groupFeedbackByMonth());

      // Set loading to false after data is fetched and processed
      setLoading(false);
    };

    fetchData();
  }, []);

  // Function to calculate average rating for each month
  const calculateAverageRatings = () => {
    const averageRatings = {};

    ratingData.forEach(({ month, rating }) => {
      if (averageRatings[month]) {
        averageRatings[month].count++;
        averageRatings[month].totalRating += rating;
      } else {
        averageRatings[month] = {
          count: 1,
          totalRating: rating
        };
      }
    });

    for (let month in averageRatings) {
      averageRatings[month].averageRating =
        averageRatings[month].totalRating / averageRatings[month].count;
    }

    return averageRatings;
  };

  // Function to format data for bar chart
  const formatBarChartData = (averageRatings) => {
    return Object.entries(averageRatings).map(([month, { averageRating }]) => (
      <div className="bar-chart-row" key={month}>
        <div className="bar-label">{month}</div>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${averageRating * 20}%`, backgroundColor: '#ff4500' }} // Assuming 5 is the max rating
          >
            <span className="bar-value">{averageRating.toFixed(2)}</span>
          </div>
        </div>
      </div>
    ));
  };

  const handleChangeMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const averageRatings = calculateAverageRatings();
  const barChartData = formatBarChartData(averageRatings);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <center><h1 className="main-heading" style={{paddingTop:"20px"}}>FEEDBACK</h1></center>
      <div className="dashboard-container">
        <div className="card chart-card">
          <h2>Average Ratings</h2>
          <div className="chart-container">
            <div className="bar-chart">
              {barChartData}
            </div>
          </div>
        </div>
        <div className="card feedback-card">
          <div className="feedback-section">
            <select className="month-dropdown" onChange={handleChangeMonth}>
              <option value="">Select Month</option>
              {Object.keys(feedbackByMonth).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {selectedMonth && feedbackByMonth[selectedMonth] && (
              <table className="feedback-table">
                <thead>
                  <tr>
                    <th className="feedback-heading">Appreciation</th>
                    <th className="feedback-heading">Suggestion</th>
                    <th className="feedback-heading">Complaints</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {feedbackByMonth[selectedMonth].appreciation.map((item, index) => (
                        <div className="feedback-item" key={index}>{item}</div>
                      ))}
                    </td>
                    <td>
                      {feedbackByMonth[selectedMonth].suggestion.map((item, index) => (
                        <div className="feedback-item" key={index}>{item}</div>
                      ))}
                    </td>
                    <td>
                      {feedbackByMonth[selectedMonth].complaint.map((item, index) => (
                        <div className="feedback-item" key={index}>{item}</div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackDashboard;
