import React from 'react';
import { useNavigate } from 'react-router-dom';

const itemsData = [
  { id: 1, name: 'Patrol Jeep', quantity: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3m6m76XrfPzmONknEI8NSYJRKDk-TtubnMGJZqIqbAA&s' },
  { id: 2, name: 'Van', quantity: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXqKF0a4V7NgpNYC7SR1djcyQHblXlcynNrQ&s' },
  { id: 3, name: 'Rifles', quantity: 7, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZMGHtKvvcg1rotHIWuOrP67pJ0fs4-LglpvtJ2TA1ow&s' },
  { id: 4, name: 'Pistols', quantity: 3, imageUrl: 'https://bsmedia.business-standard.com/_media/bs/img/article/2017-12/25/full/1514170543-4982.jpg?im=FeatureCrop,size=(826,465)' },
  { id: 5, name: 'Baton/stick', quantity: 20, imageUrl: 'https://4.imimg.com/data4/KG/DM/MY-6793284/police-lathi-250x250.png' },
  { id: 6, name: 'Smoke Bombs', quantity: 10, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21xvnGWn1X-pVuMoh9VWPiVCnX1v98rS5WQ&s' },
  { id: 7, name: 'Protective Shields', quantity: 20, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5GT_eHiIe3uUXLnztu6yU13cAva37ZrFbw&s' },
  { id: 8, name: 'Helmets', quantity: 20, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTsdPmhCBGxAachFPRkyZBDBA-YtPeAc-OsA&s' },
  { id: 9, name: 'Vests', quantity: 20, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGK6iM5u9wYEO5tXznLX6b10u96zJ40TvVQ&s' },
];

const ItemTable = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/InspectorDashboard');
  };
  return (
    <div>
      <button onClick={handleBack} style={{ marginLeft: "100px", marginTop: "30px", width: "150px" }}><h3>Back</h3></button><br/><br/>
      <table style={{backgroundColor:"beige",border:"1px solid black",marginLeft:"200px"}}>
        <thead>
          <tr >
            <th style={{paddingLeft:"80px",border:"1px solid black"}}><h2>Item Image</h2></th>
            <th style={{paddingLeft:"80px",border:"1px solid black"}}><h2>Item Name</h2></th>
            <th style={{paddingLeft:"80px",border:"1px solid black"}}><h2>Quantity</h2></th>
          </tr>
        </thead>
        <tbody >
          {itemsData.map(item => (
            <tr key={item.id} >
              <td style={{ width: '300px',border:"1px solid black"}}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '200px', height: '150px',paddingLeft:"80px"}} />
              </td>
              <td style={{ width: '400px',paddingLeft:"80px",border:"1px solid black"}}><h2>{item.name}</h2></td>
              <td style={{ width: '300px',paddingLeft:"100px",border:"1px solid black" }}><h2>{item.quantity}</h2></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
