import React from "react";
import numeral from "numeral"

import { Circle, Popup } from "react-leaflet";


export const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 100
    },
    recovered: {
        hex: "#7dd71d",
       half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 100
    },
    deaths: {
        hex: "#fb4443",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000
    }
}
export const prettyPrintStat = (stat => (
    stat ? `${numeral(stat).format("+0.0a")}` : "+0"
))


export const showDataOnMap = (data, casesType="cases") =>{
    const colorOptions = {color: casesTypeColor[casesType].hex,fillColor: casesTypeColor[casesType].hex}
    return(
      data.map(country => (
        <Circle
         center={[country.countryInfo.lat, country.countryInfo.long]}
         fillOpacity={0.4}
         pathOptions={colorOptions}
         radius= {
            Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
         }          
        >

       
            <Popup>
               <div className="info-container">
                    <div className="info-flag" style={{backgroundImage: `URL(${country.countryInfo.flag})`}}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: { numeral(country.cases).format("0,0") }</div>
                    <div className="info-recovered">Recovered: { numeral(country.recovered).format("0,0") }</div>
                    <div className="info-deaths">Deaths: { numeral(country.deaths).format("0,0") }</div>
               </div>
            </Popup>
        </Circle>
    ))
)}