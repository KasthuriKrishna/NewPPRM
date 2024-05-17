// WeekNum.js
import React from 'react';

function getWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    return weekNumber;
}

const WeekNum = () => {
    return getWeekNumber();
};

export default WeekNum;
