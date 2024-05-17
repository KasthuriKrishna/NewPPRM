import React, { useState, useEffect, useRef } from 'react';
import './DutyTable.css'; // Import CSS file
import WeekNum from './Weeknum';
import { useNavigate } from 'react-router-dom';
import pic_1 from "./PI_flowchart.png";
import html2canvas from 'html2canvas';

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to generate duty assignments for a week
function generateDutyAssignments(weekNumber, officers) {
  const duties = {
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': [],
    'Saturday': [],
    'Sunday': []
  };

  // Determine the number of officers needed for each duty
  const numDayDuty = 2;
  const numNightDuty = 2;
  const numMorningPatrol = 2;
  const numNightPatrol = 2;
  const numCourtDuty = 2;
  const numGeneralShift = 3;
  const numRest = 2;

  // Assign duties for each day
  Object.keys(duties).forEach((day, index) => {
    const shuffledOfficers = shuffleArray([...officers]);

    // Allocate duties based on the specified numbers
    duties[day] = [
      ...shuffledOfficers.slice(0, numDayDuty).map(officer => ({ name: officer, duty: 'Day Duty' })),
      ...shuffledOfficers.slice(numDayDuty, numDayDuty + numNightDuty).map(officer => ({ name: officer, duty: 'Night Duty' })),
      ...shuffledOfficers.slice(numDayDuty + numNightDuty, numDayDuty + numNightDuty + numMorningPatrol).map(officer => ({ name: officer, duty: 'Morning Patrol' })),
      ...shuffledOfficers.slice(numDayDuty + numNightDuty + numMorningPatrol, numDayDuty + numNightDuty + numMorningPatrol + numNightPatrol).map(officer => ({ name: officer, duty: 'Night Patrol' })),
      ...shuffledOfficers.slice(numDayDuty + numNightDuty + numMorningPatrol + numNightPatrol, numDayDuty + numNightDuty + numMorningPatrol + numNightPatrol + numCourtDuty).map(officer => ({ name: officer, duty: 'Court Duty' })),
      ...shuffledOfficers.slice(numDayDuty + numNightDuty + numMorningPatrol + numNightPatrol + numCourtDuty, numDayDuty + numNightDuty + numMorningPatrol + numNightPatrol + numCourtDuty + numGeneralShift).map(officer => ({ name: officer, duty: 'General Shift' })),
      ...shuffledOfficers.slice(-numRest).map(officer => ({ name: officer, duty: 'Rest' }))
    ];
  });

  return duties;
}

const DutyTable = () => {
  const [dutyAssignments, setDutyAssignments] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const officers = [
    'Officer 1', 'Officer 2', 'Officer 3', 'Officer 4', 'Officer 5',
    'Officer 6', 'Officer 7', 'Officer 8', 'Officer 9', 'Officer 10',
    'Officer 11', 'Officer 12', 'Officer 13', 'Officer 14', 'Officer 15'
  ];

  useEffect(() => {
    const today = new Date();
    const todayStr = today.toLocaleDateString();
    const savedDutyAssignmentsStr = localStorage.getItem('dutyAssignments');
    const savedDateStr = localStorage.getItem('dutyAssignmentsDate');
    
    // Check if duty assignments exist in local storage and if they were generated today
    if (savedDutyAssignmentsStr && savedDateStr === todayStr) {
      setDutyAssignments(JSON.parse(savedDutyAssignmentsStr));
    } else {
      const dayIndex = today.getDay();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDay = days[dayIndex];
      setCurrentDate(today.toLocaleDateString());
      const weekNumber = WeekNum(); // Generate week number using WeekNum component
  
      const newDutyAssignments = generateDutyAssignments(weekNumber, officers);
      setDutyAssignments({ [currentDay]: newDutyAssignments[currentDay] });
      
      // Save duty assignments and current date to local storage
      localStorage.setItem('dutyAssignments', JSON.stringify({ [currentDay]: newDutyAssignments[currentDay] }));
      localStorage.setItem('dutyAssignmentsDate', todayStr);
    }
    
  }, []);

  const todays = new Date();
  const todayStrs = todays.toLocaleDateString();
  const navigate = useNavigate();
  const handleclose=()=>{
    navigate('/InspectorDashboard');
  };

  const chartRef = useRef(null);

  const handleDownload = () => {
    html2canvas(chartRef.current)
      .then(canvas => {
        const dataUrl = canvas.toDataURL(); // Convert canvas to data URL
        const link = document.createElement('a');
        link.download = 'duty.png';
        link.href = dataUrl;
        link.click();
      });
  };
  const handleShuffle = () => {
    const weekNumber = WeekNum(); // Generate week number using WeekNum component
    const shuffledOfficers = shuffleArray([...officers]);
    const newDutyAssignments = generateDutyAssignments(weekNumber, shuffledOfficers);
    setDutyAssignments(newDutyAssignments);
  };
  return (
    <div>
      <div>
      <div style={{paddingLeft:"100px",paddingTop:"50px"}}>
        <button onClick={handleclose}><h3>Back</h3></button><br/>
        </div>
        <h1 style={{paddingLeft:"100px"}}>Organizational Chart:</h1>
        <img src={pic_1} width={900} height={450} style={{paddingLeft:"400px"}}/><br/>
        <h1 style={{paddingLeft:"100px"}}>Duty for {todayStrs}</h1>
        <h2 style={{paddingLeft:"100px"}}><button  onClick={handleDownload} >Download</button></h2>
        <h2 style={{paddingLeft:"100px"}}>
          <button onClick={handleShuffle}>Shuffle</button>
        </h2>
      </div>
      <div ref={chartRef}>
        <table className="duty-table">
          <thead>
            <tr className="duty-table-tr">
              <th className="duty-table-th">S.No</th>
              <th className="duty-table-th">Officer Image</th>
              <th className="duty-table-th">Officer Name</th>
              <th className="duty-table-th">Duty</th>
            </tr>
          </thead>
          <tbody>
            {dutyAssignments && Object.keys(dutyAssignments).map((day, index) => (
              <React.Fragment key={index}>
                {dutyAssignments[day].map((assignment, idx) => (
                  <tr key={idx} className="duty-table-tr">
                    <td className="duty-table-td">{idx + 1}</td>
                    <td className="duty-table-td"><img className="pcimage" src="https://st.depositphotos.com/14768666/53978/v/450/depositphotos_539789962-stock-illustration-policeman-cop-icon-flat-isolated.jpg" alt="Officer" /></td>
                    <td className="duty-table-td">{assignment.name}</td>
                    <td className="duty-table-td">{assignment.duty}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DutyTable;
