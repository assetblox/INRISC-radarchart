import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import Chart, { ChartData } from 'chart.js/auto';
import scales from './scales';
import spiderData from './spider_data.json' assert { type: 'json' };

// import {
// 		Chart as ChartJS,
// 		Title,
// 		Tooltip,
// 		Legend,
// 		PointElement,
// 		RadialLinearScale,
// 		LineElement
// } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

function parseData(radardata: any) {
  let converted_data: ChartData;
	let labels = [];
	let datasets = [];
  // const scalesInUse = {};

	const defaultLabels = [
		'score',
		'operations',
		'cashflow',
		'capital_structure',
		'liquidity',
		'size'
  ];
 

  for (const [p] of Object.entries(radardata[Object.keys(radardata)[0]])) {
      labels.push(p);
  }

  for (const key of Object.keys(radardata)) {
    // let scalesInUse[key] = scales[key];
    const values = [];

    let defaultLabelKey: any
    for ( defaultLabelKey of Object.keys(defaultLabels)) {
        values.push(radardata[key][defaultLabels[defaultLabelKey]]);
    }

    datasets.push({
      label: scales[key].title,
      pointBackgroundColor: scales[key].pointColor,
      pointBorderColor: '#fff',
      backgroundColor: scales[key].color,
      borderColor: scales[key].color,
      data: values
    });
  }
  datasets = datasets.reverse();

  converted_data = {
    labels: defaultLabels.map(function (x) {
      return x.replace(/_/, ' ');
    }),
    datasets: datasets
  };

  console.log(converted_data);
  return converted_data;

}

export class InriscRadar extends LitElement {
  
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--inrisc-radar-text-color, #000);
    }
  `;

  @property({ type: String }) header = 'Hey there';

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
      <div style="width: auto; height: auto;"><canvas id="chart"></canvas></div>
    `;
  }

  firstUpdated() {
    const radarCanvas = this.renderRoot.querySelector('#chart') as HTMLCanvasElement
    const ctx = radarCanvas.getContext("2d");

    if (ctx === null) {
      return;
    }

    const parsedData = parseData(spiderData);

    // eslint-disable-next-line no-new
    new Chart(ctx, {
      type: 'radar',
      data: parsedData,
      options: {
        responsive: true,

		plugins: {
			// 'legend' now within object 'plugins {}'
			legend: {
				display: false
			}
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
						weight: 'normal'
					}
				},
				angleLines: {
					display: false
				},
				grid: {
					// borderDash: [5, 5],
					// borderDashOffset: 0.4,
					// max: 5,
					// circular: true,
					lineWidth: 1,
					color: '#e1e4e8'
				},
				pointLabels: {
					color: '#0B243F',
					backdropColor: '#fff',
					font: {
						family: 'Suisse, sans-serif',
						weight: 'bold',
						size: 15,
					},
					backdropPadding: 3
				}
			}
		}
      }
    });

  }
}
