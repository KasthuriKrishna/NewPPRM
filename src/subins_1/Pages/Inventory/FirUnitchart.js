import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = () => {
    // Fetch data from the API
    fetch('http://ticklesksp.c1.is/unit.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        // Check if the data is in the expected format
        if (Array.isArray(data.query_1)) {
          formatData(data.query_1); // Pass the array to formatData function
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const formatData = rawData => {
    // Filter out objects with null values for 'UnitName' and 'FIR_Stage'
    const filteredData = rawData.filter(item => item.UnitName !== null && item.FIR_Stage !== null);
  
    // Group data by UnitName
    const groupedData = {};
    filteredData.forEach(item => {
      const unitName = item.UnitName;
      const firStage = item.FIR_Stage;
      const totalCases = parseInt(item.Total_Cases);
  
      // Initialize the grouped data for the UnitName if it doesn't exist
      if (!groupedData[unitName]) {
        groupedData[unitName] = {};
      }
  
      // Initialize the FIR_Stage data for the UnitName if it doesn't exist
      if (!groupedData[unitName][firStage]) {
        groupedData[unitName][firStage] = totalCases;
      } else {
        groupedData[unitName][firStage] += totalCases;
      }
    });
  
    // Convert the grouped data into an array of objects
    const formattedData = Object.keys(groupedData).map(unitName => {
      const unitData = groupedData[unitName];
      return {
        UnitName: unitName,
        ...unitData
      };
    });
  
    // Set the formatted data to state
    setData(formattedData);
  };
  
  return (
    <div className="stacked-bar-chart-container">
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }} // Adjust bottom margin for better x-axis label visibility
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="UnitName" angle={-45} textAnchor="end" interval={0} height={100} />
          <YAxis />
          <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
          <Legend wrapperStyle={{ paddingTop: '70px' }} />
          {Object.keys(data[0] || {}).filter(key => key !== 'UnitName').map((stage, index) => (
            <Bar key={index} dataKey={stage} stackId="a" fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
