import React, { useState,useEffect } from 'react';
import'./Form.css'
import { useNavigate } from 'react-router-dom';
import { useMessage2 } from '../MessageContext2';
import TableComponent from './Newcases';
import Fileupload from './Fileupload';

const FormComponent = () => {
  const [message2,setMessage2]=useState('');
  const{addMessage2}=useMessage2();
  const [formData, setFormData] = useState({
    District_Name: '',
    UnitName: '',
    FIRNo: '',
    RI: '',
    Year: '',
    Month: '',
    Offence_From_Date: '',
    Offence_To_Date: '',
    FIR_Reg_DateTime: '',
    FIR_start_date: '',
    FIR_Type: '',
    FIR_Stage: '',
    Complaint_Mode: '',
    CrimeGroup_Name: '',
    CrimeHead_Name: '',
    Latitude: '',
    Longitude: '',
    ActSection: '',
    IOName: '',
    KGID: '',
    IOAssigned_Date: '',
    Internal_IO: '',
    'Place_of_Offence': '',
    'Distance_from_PS': '',
    Beat_Name: '',
    Village_Area_Name: '',
    Male: '',
    Female: '',
    Boy: '',
    Girl: '',
    'Age_0': '',
    'VICTIM_COUNT': '',
    Accused_Count: '',
    'Arrested_Male': '',
    'Arrested_Female': '',
    'Arrested_Count_No': '',
    'Accused_ChargeSheeted_Count': '',
    'Conviction_Count': '',
    FIR_ID: '',
    Unit_ID: '',
    Crime_No: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    setFormData({
      ...formData,
      FIR_start_date: getCurrentDate() // Set FIR_start_date to current date
    });
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleback=()=>{
    navigate('/InspectorDashboard');
}
const alertmsg=(msg)=>{
 alert(msg);
}
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form Data:', formData); // Ensure formData is correctly logged

  try {
    const response = await fetch('https://policedashboard.000webhostapp.com/submitFormData.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        const { CrimeGroup_Name } = formData;
        console.log('CrimeGroup_Name:', CrimeGroup_Name); // Log to ensure correct value is used

        const crimeDataResponse = await fetch(`https://policedashboard.000webhostapp.com/crime.php?CrimeGroup_Name=${encodeURIComponent(CrimeGroup_Name)}`);
        const crimeData = await crimeDataResponse.json();

        console.log('Crime Data:', crimeData); // Log crime data to debug

        if (crimeData.length > 0) {
          const matchingCrime = crimeData.find(crime => crime.CrimeGroup_Name === CrimeGroup_Name);
          if(matchingCrime){
          const {max_duration, min_duration, avg_duration } = matchingCrime;
          const message = `Crime Group: ${CrimeGroup_Name}\nMin Duration: ${min_duration}\nMax Duration: ${max_duration}\nAvg Duration: ${avg_duration}`;
          alertmsg(message);
          }
        } else {
          alertmsg('Crime data not found for the specified group.');
        }
        alert('Form submitted successfully!');
        window.location.reload();
      } else {
        console.error('Error:', responseData.error);
      }
    } else {
      const errorMessage = await response.text();
      console.error('Error:', errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    try {
      const response = await fetch('http://localhost/upload.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const responseData = await response.json();
      console.log(responseData);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
    <h2>ADD NEW FIR</h2>
    <h4>Sample input values are provided</h4>
    <div style={{marginLeft:"1300px",marginBottom:"20px"}}>
    <button onClick={handleback} style={{width:"100px",height:"50px"}}><h2>Back</h2></button>
    </div>
    <form className="form-container" onSubmit={handleSubmit}>
    <div className="form-field">
    <label htmlFor="District_Name">District Name:(Bengaluru)</label>
    <input type="text" id="District_Name" name="District_Name" value={formData.District_Name} onChange={handleChange} />
  </div>
  <div className="form-field">
    <label htmlFor="UnitName">Unit Name:(Anekal PS)</label>
    <input type="text" id="UnitName" name="UnitName" value={formData.UnitName} onChange={handleChange} />
  </div>
  <div className="form-field">
  <label htmlFor="FIRNo">FIR No:(0102/2024)</label>
  <input type="text" id="FIRNo" name="FIRNo" value={formData.FIRNo} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="RI">RI:(2)</label>
  <input type="text" id="RI" name="RI" value={formData.RI} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Year">Year:(2024)</label>
  <input type="text" id="Year" name="Year" value={formData.Year} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Month">Month:(10)</label>
  <input type="text" id="Month" name="Month" value={formData.Month} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Offence_From_Date">Offence From Date:(dd-mm-yyyy)</label>
  <input type="text" id="Offence_From_Date" name="Offence_From_Date" value={formData.Offence_From_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Offence_To_Date">Offence To Date:(dd-mm-yyyy)</label>
  <input type="text" id="Offence_To_Date" name="Offence_To_Date" value={formData.Offence_To_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Reg_DateTime">FIR Reg DateTime:(12:00)</label>
  <input type="text" id="FIR_Reg_DateTime" name="FIR_Reg_DateTime" value={formData.FIR_Reg_DateTime} onChange={handleChange} />
</div>
<div className="form-field">
    <label htmlFor="FIR_start_date">FIR Date:</label>
    <input
      type="text"
      id="FIR_start_date"
      name="FIR_start_date"
      value={getCurrentDate()} // Call the function to get the current date
      onChange={handleChange}
    />
  </div>
<div className="form-field">
  <label htmlFor="FIR_Type">FIR Type:(Henious/Non Henious)</label>
  <input type="text" id="FIR_Type" name="FIR_Type" value={formData.FIR_Type} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="FIR_Stage">FIR Stage:(Traced,Un Traced..)</label>
  <input type="text" id="FIR_Stage" name="FIR_Stage" value={formData.FIR_Stage} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Complaint_Mode">Complaint Mode:(Written...)</label>
  <input type="text" id="Complaint_Mode" name="Complaint_Mode" value={formData.Complaint_Mode} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="CrimeGroup_Name">CrimeGroup Name:(MURDER,THEFT...(*uppercase))</label>
  <input type="text" id="CrimeGroup_Name" name="CrimeGroup_Name" value={formData.CrimeGroup_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="CrimeHead_Name">CrimeHead Name:(xxx..)</label>
  <input type="text" id="CrimeHead_Name" name="CrimeHead_Name" value={formData.CrimeHead_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Latitude">Latitude:(20)</label>
  <input type="text" id="Latitude" name="Latitude" value={formData.Latitude} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Longitude">Longitude:(20)</label>
  <input type="text" id="Longitude" name="Longitude" value={formData.Longitude} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="ActSection">Act Section:(IPC 1860 U/s: 00MP )</label>
  <input type="text" id="ActSection" name="ActSection" value={formData.ActSection} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="IOName">IO Name:(name)</label>
  <input type="text" id="IOName" name="IOName" value={formData.IOName} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="KGID">KGID:(2282203)</label>
  <input type="text" id="KGID" name="KGID" value={formData.KGID} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="IOAssigned_Date">IO Assigned Date:(dd/mm/yyyy)</label>
  <input type="text" id="IOAssigned_Date" name="IOAssigned_Date" value={formData.IOAssigned_Date} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Internal_IO">Internal IO:(37700027)</label>
  <input type="text" id="Internal_IO" name="Internal_IO" value={formData.Internal_IO} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Place_of_Offence">Place of Offence:(place)</label>
  <input type="text" id="Place_of_Offence" name="Place_of_Offence" value={formData["Place of Offence"]} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Distance_from_PS">Distance from PS:(4 km)</label>
  <input type="text" id="Distance_from_PS" name="Distance_from_PS" value={formData["Distance from PS"]} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Beat_Name">Beat Name:(AKL TOWN BEAT 2 & 3)</label>
  <input type="text" id="Beat_Name" name="Beat_Name" value={formData.Beat_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Village_Area_Name">Village Area Name:(area)</label>
  <input type="text" id="Village_Area_Name" name="Village_Area_Name" value={formData.Village_Area_Name} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Male">Male:(1)</label>
  <input type="text" id="Male" name="Male" value={formData.Male} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Female">Female:(2)</label>
  <input type="text" id="Female" name="Female" value={formData.Female} onChange={handleChange} />
</div>
<div className="form-field">
  <label htmlFor="Boy">Boy:(1)</label>
  <input type="text" id="Boy" name="Boy" value={formData.Boy} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Girl">Girl:(1)</label>
<input type="text" id="Girl" name="Girl" value={formData.Girl} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Age_0">Age:(20)</label>
<input type="text" id="Age_0" name="Age_0" value={formData["Age 0"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="VICTIM_COUNT">VICTIM COUNT:(2)</label>
<input type="text" id="VICTIM_COUNT" name="VICTIM_COUNT" value={formData["VICTIM COUNT"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Accused_Count">Accused Count:(2)</label>
<input type="text" id="Accused_Count" name="Accused_Count" value={formData.Accused_Count} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Male">Arrested Male:(1)</label>
<input type="text" id="Arrested_Male" name="Arrested_Male" value={formData["Arrested Male"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Female">Arrested Female:(1)</label>
<input type="text" id="Arrested_Female" name="Arrested_Female" value={formData["Arrested Female"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Arrested_Count_No">Arrested Count No:(2)</label>
<input type="text" id="Arrested_Count_No" name="Arrested_Count_No" value={formData["Arrested_Count_No"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Accused_ChargeSheeted_Count">Accused ChargeSheeted Count:(2)</label>
<input type="text" id="Accused_ChargeSheeted_Count" name="Accused_ChargeSheeted_Count" value={formData["Accused ChargeSheeted_Count"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Conviction_Count">Conviction Count:(1)</label>
<input type="text" id="Conviction_Count" name="Conviction_Count" value={formData["Conviction_Count"]} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="FIR_ID">FIR ID:(2016000007)</label>
<input type="text" id="FIR_ID" name="FIR_ID" value={formData.FIR_ID} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Unit_ID">Unit ID:(209)</label>
<input type="text" id="Unit_ID" name="Unit_ID" value={formData.Unit_ID} onChange={handleChange} />
</div>
<div className="form-field">
<label htmlFor="Crime_No">Crime No:(1222)</label>
<input type="text" id="Crime_No" name="Crime_No" value={formData.Crime_No} onChange={handleChange} />
</div>
<div className="form-field">
<label><h3>Evidence:</h3></label>
<input type="file" onChange={handleFileChange} />
  <button onClick={handleUpload}>Upload</button>
  </div>
<div className="submit-button-container">
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
    <TableComponent/>
    </div>
  );
};

export default FormComponent;
