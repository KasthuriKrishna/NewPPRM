//npm install react-simple-chatbot
//npm install semantic-ui-react

import React from 'react'
import ChatBot from 'react-simple-chatbot';
import {Segment} from 'semantic-ui-react';
import { ThemeProvider } from 'styled-components';

function Chatbox()
{
  const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
const config = {
  botAvatar: "https://cdn-icons-png.flaticon.com/128/6584/6584942.png",
  floating: true,
};


const steps = [
  {
    id: 'Greet',
    message: 'Hello, welcome to our website support chat. How can we assist you today?',
    trigger: 'SelectIssue',
  },
  {
    id: 'SelectIssue',
    message: 'Please select the type of issue you are experiencing:',
    trigger: 'IssueOptions',
  },
  {
    id: 'IssueOptions',
    options: [
      { value: 'Login', label: 'Login Issue', trigger: 'LoginSteps' },
      { value: 'Navigation', label: 'Navigation Problem', trigger: 'NavigationSteps' },
      { value: 'Functionality', label: 'Functionality Issue', trigger: 'FunctionalitySteps' },
      { value: 'Performance', label: 'Performance Problem', trigger: 'PerformanceSteps' },
      { value: 'Compatibility', label: 'Compatibility Issue', trigger: 'CompatibilitySteps' },
      { value: 'Security', label: 'Security Concern', trigger: 'SecuritySteps' },
      { value: 'Other', label: 'Other', trigger: 'OtherIssue' },
    ],
  },
  {
    id: 'LoginSteps',
    message: 'Are you having trouble logging in? Please provide details:',
    trigger: 'UserInput',
  },
  {
    id: 'NavigationSteps',
    message: 'Could you specify where you are experiencing navigation problems?',
    trigger: 'UserInput',
  },
  {
    id: 'FunctionalitySteps',
    message: 'What feature or functionality is causing issues for you?',
    trigger: 'UserInput',
  },
  {
    id: 'PerformanceSteps',
    message: 'In which areas of the website are you experiencing performance issues?',
    trigger: 'UserInput',
  },
  {
    id: 'CompatibilitySteps',
    message: 'Please specify the devices or browsers where you are encountering compatibility issues:',
    trigger: 'UserInput',
  },
  {
    id: 'SecuritySteps',
    message: 'Can you provide more details about the security concern you have?',
    trigger: 'UserInput',
  },
  {
    id: 'OtherIssue',
    message: 'Please briefly describe the issue you are facing:',
    trigger: 'UserInput',
  },
  {
    id: 'UserInput',
    user: true,
    trigger: 'EndMessage',
  },
  {
    id: 'EndMessage',
    message: 'Thank you for reaching out to us. Our team will check it out and update soon.',
    end: true,
  },
];

  return (
  <>
  <Segment floated="right">
  <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="SupportBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
  </Segment>
  </>
  );
}

export default Chatbox;