import React,{useEffect, useState} from 'react';
import "chart.js/auto"
import { Line } from 'react-chartjs-2';
import { casesTypeColor } from './util';
import numeral from 'numeral';
import 'chartjs-adapter-date-fns';

  const options = { aspectRatio: 1,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins:{legend:{display: false}},
                    scales: {
                              x: {
                                  
                                    type: "time",
                                    time: {
                                     unit: "month",
                                     parser: "MM/dd/yy"
                                    }
                                    
                                 },
                              y: {
                                    grid: {
                                            display: false
                                          },
                                    ticks: {
                                      callback: function(value) {
                                        return numeral(value).format("0.0a")
                                      }
                                    }
                                 }
                            },
                    elements: {
                      point:{
                          radius: 0
                      }
                  }
                  }

  const buildChartData = (data, casesType = "cases") => {
   
    const chartData = [];
    let lastDataPoint;
    for(let date in data[casesType]) {
      if(lastDataPoint !== undefined) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDataPoint);
      }
      
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  }

function LineGraph({casesType}) {

  const [data, setData] = useState({});
  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then(response => response.json())
    .then(data => {
      
      const chartData = buildChartData( data, casesType );
      setData(chartData);
    })
  },[casesType]);

 


  return (
    <div className="lineGraph" style={{width: "99%"}}>
    {data?.length > 0 && (
      <Line data={{
          datasets: [
            {
              data: data,
              borderColor: casesTypeColor[casesType].hex,
              fill: true
            }
          ]
        }} 
        options={options}
        />
    )}
        
    </div>
  )
}

export default LineGraph