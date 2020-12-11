import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";

function LineGraph() {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then(response => response.json())
            .then(data => {
                console.log(data)

            });
        // logic her})


    }, []);
    const buildChatData = (data, casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        data[casesType].cases.array.forEach(date => {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint

                }

                chartData.push(newDataPoint);

            }
            lastDataPoint = data[casesType][date];

        })
        return chartData;
    }

    return (
        <div className="linegraph">
            <h1>I am graph</h1>
        </div>

    );
}

export default LineGraph;
