import { ChartOptions } from 'chart.js';
import scales from './scales.js';
import type { Scales } from './scales.js';
import capitalize from './capitalize.js';

function parseData(radarData: any) {
  /**
   * Accepts a JSON object with spider data and returns a ChartData object
   *
   * */

  let labels = [];
  let datasets = [];

  const defaultLabels = [
    'score',
    'operations',
    'cashflow',
    'capital_structure',
    'liquidity',
    'size',
  ];

  for (const [p] of Object.entries(radarData[Object.keys(radarData)[0]])) {
    labels.push(p);
  }

  // define a list of Scale
  const scalesInUse: Scales = {};
  for (const key of Object.keys(radarData)) {
    scalesInUse[key] = scales[key];
  }

  for (const key of Object.keys(radarData)) {
    // let scalesInUse[key] = scales[key];
    const values = [];

    let defaultLabelKey: any;
    for (defaultLabelKey of Object.keys(defaultLabels)) {
      values.push(radarData[key][defaultLabels[defaultLabelKey]]);
    }

    datasets.push({
      label: scales[key].title,
      pointBackgroundColor: scales[key].pointColor,
      pointBorderColor: '#fff',
      backgroundColor: scales[key].backgroundColor,
      borderColor: scales[key].color,
      data: values,
    });
  }
  datasets = datasets.reverse();

  labels = defaultLabels.map(x => capitalize(x.replace(/_/, ' ')));

  const convertedData = {
    labels,
    datasets,
    scalesInUse
  };

  return convertedData;
}

function getRadarOptions(): ChartOptions {
  /**
   * Returns the options for the radar chart
   * */

  return {
    responsive: true,

    plugins: {
      // 'legend' now within object 'plugins {}'
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        // stepSize: 20,
        ticks: {
          // fontSize: 22,
          count: 6,
          color: '#95999e',
          // backdropColor: '#0B243F',
          backdropPadding: 2,
          font: {
            size: 9,
            family: 'Suisse, sans-serif',
            weight: 'normal',
          },
        },
        angleLines: {
          display: false,
        },
        grid: {
          // borderDash: [5, 5],
          // borderDashOffset: 0.4,
          // max: 5,
          // circular: true,
          lineWidth: 1,
          color: '#e1e4e8',
        },
        pointLabels: {
          color: '#0B243F',
          //   backdropColor: '#fff',
          font: {
            family: 'Suisse, sans-serif',
            weight: 'bold',
            size: 15,
          },
          backdropPadding: 3,
        },
      },
    },
  };
}

export { parseData, getRadarOptions };
