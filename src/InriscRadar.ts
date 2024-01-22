import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import {
  Chart as ChartJS,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  RadialLinearScale,
  LineElement,
} from 'chart.js';
import { parseData, getRadarOptions } from './spiderData.js';
import spiderData from './spider_data.json' assert { type: 'json' };
import styles from './styles.js';

ChartJS.register(
  RadarController,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler
);

export class InriscRadar extends LitElement {
  static styles = css`
    :host {
      position: relative;
      height: 100%;
      width: 100%;
    }

    .debug {
      outline: 3px dotted pink;
    }

    .wrap {
      -webkit-text-size-adjust: 100%;
      tab-size: 4;
      font-feature-settings: normal;
      font-variation-settings: normal;
      line-height: inherit;
      font-size: 16px;
      font-family: Suisse, sans-serif;
      --tw-text-opacity: 1;
      color: rgb(11 36 63 / var(--tw-text-opacity));
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: #e5e7eb;
      display: flex;
      aspect-ratio: 1 / 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 0.375rem;
      --tw-bg-opacity: 1;
      background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    }

    .labels {
      text-size-adjust: 100%;
      tab-size: 4;
      font-feature-settings: normal;
      font-variation-settings: normal;
      line-height: inherit;
      font-size: 14px;
      font-family: Suisse, sans-serif;
      color: rgb(11 36 63);
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      border-width: 0px;
      border-style: solid;
      border-color: rgb(229, 231, 235);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }

    .label {
      color: rgb(11 36 63 / var(--tw-text-opacity));
      box-sizing: border-box;
      border-style: solid;
      border-radius: 0.25rem;
      border-width: 1px;
      padding: 0.5rem;
      padding-top: 3px;
      padding-bottom: 3px;
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      background-color: rgba(167, 215, 96, 1);
      border-color: rgba(167, 215, 96, 0);
      position: relative;
    }

    .years {
      -webkit-text-size-adjust: 100%;
      tab-size: 4;
      font-feature-settings: normal;
      font-variation-settings: normal;
      -webkit-tap-highlight-color: transparent;
      font-family: Suisse, sans-serif;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: #e5e7eb;
      margin: 0;
      margin-bottom: 0.0rem;
      margin-top: 2rem;
      text-align: center;
      font-size: 0.75rem;
      line-height: 1rem;
      text-transform: uppercase;
      color: rgb(11 36 63 / 0.9);
      position: relative;
    }
  `;

  // This is the property definition. It expects stringified JSON data
  @property({
    type: String,
    hasChanged(newVal: string, oldVal: string) {
      return newVal === oldVal;
    },
  })
  data = '';

  @property({ type: Boolean }) testMode = false;

  @property({ type: String }) usedYears = '';

  render() {
    const testModeWarning =
      this.testMode === true ? 'Graph test mode is enabled' : '';

    const labels = Object.keys(JSON.parse(this.data));
    const legenda: string[] = [];
    const options = ['realized', 'projected', 'combined'];

    options.forEach((option: string) => {
      if (labels.includes(option)) {
        legenda.push(option);
      }
    });

    return html`
      ${testModeWarning}
      <div class="wrap">
      
        <canvas id="chart" class="chart"></canvas>
      
      <div class="legend" style="">
        <div class="labels">
          ${legenda.map(
            label =>
              html`<div
                class="label"
                style="background-color: ${styles[label].color}"
              >
                ${styles[label].title}
              </div>`
          )}
        </div>
        <p class="years">${this.usedYears}</p>
      </div>
      </div>
    `;
  }

  async renderInriscSpider(data: any) {
    const parsedData = parseData(JSON.parse(data));

    const radarCanvas = this.renderRoot.querySelector(
      '#chart'
    ) as HTMLCanvasElement;
    const ctx = radarCanvas.getContext('2d');

    if (ctx === null) {
      return;
    }

    const graphOptions = getRadarOptions();

    // eslint-disable-next-line no-new
    new ChartJS(ctx, {
      type: 'radar',
      data: parsedData,
      options: graphOptions,
    });
  }

  updated() {
    if (this.data === '') {
      return;
    }

    this.renderInriscSpider(this.data);
  }

  firstUpdated() {
    if (this.testMode === true) {
      this.renderInriscSpider(JSON.stringify(spiderData));
    }
  }
}
