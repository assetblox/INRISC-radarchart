import { ChartData, ChartOptions } from 'chart.js';
import scales from './scales';
import capitalize from './capitalize';

function parseData(radardata: any) {
  /**
   * Accepts a JSON object with spider data and returns a ChartData object
   *
   **/

  let converted_data: ChartData;
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

  for (const [p] of Object.entries(radardata[Object.keys(radardata)[0]])) {
    labels.push(p);
  }

  for (const key of Object.keys(radardata)) {
    // let scalesInUse[key] = scales[key];
    const values = [];

    let defaultLabelKey: any;
    for (defaultLabelKey of Object.keys(defaultLabels)) {
      values.push(radardata[key][defaultLabels[defaultLabelKey]]);
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

  converted_data = {
    labels: defaultLabels.map(function (x) {
      return capitalize(x.replace(/_/, ' '));
    }),
    datasets: datasets,
  };
  return converted_data;
}

function getRadarOptions(): ChartOptions {
  /**
   * Returns the options for the radar chart
   **/

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
