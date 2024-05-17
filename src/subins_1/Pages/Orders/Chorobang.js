import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import choroplethData from './Mapchoro.json';
import mapData from './Mapjson.json';

const KarnatakaChoropleth = () => {
  const styleFeature = (feature) => {
    const districtData = choroplethData.ksp.find(item => item.UnitName === feature.properties.area_name);

    const defaultStyle = {
      fillColor: 'gray',
      fillOpacity: 0.7,
      color: 'black',
      weight: 1,
    };

    if (districtData) {
      const value = districtData.Count;
      const colorScale = ['#00FF00', '#006600', '#FFFF66', '#FFFF00', '#FFA500', '#FF6600', '#FF0000', '#B30000'];
      const thresholds = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000];
      let colorIndex = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (value <= thresholds[i]) {
          colorIndex = i;
          break;
        }
      }
      defaultStyle.fillColor = colorScale[colorIndex];
    }

    return defaultStyle;
  };

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={11} style={{ height: '800px' }}>
      <GeoJSON
        data={mapData}
        style={(feature) => styleFeature(feature)}
        onEachFeature={(feature, layer) => {
          const districtName = feature.properties.area_name;
          const districtData = choroplethData.ksp.find((item) => item.UnitName === districtName);

          if (districtData) {
            const popupContent = `
              <div>
                <strong>District:</strong> ${districtName}<br>
                <strong>Police Station:</strong> ${districtData.UnitName}<br>
                <strong>Number of Cases:</strong> ${districtData.Count}
              </div>
            `;
            layer.bindPopup(popupContent);
          } else {
            layer.bindPopup(`<div><strong>District:</strong> ${districtName}</div>`);
          }
        }}
      />
    </MapContainer>
  );
};

export default KarnatakaChoropleth;
