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
      display: block;
      padding: 25px;
      color: var(--inrisc-radar-text-color, #000);
    }
  `;

  // This is the property definition. It expects JSON data
  @property({ type: Object }) spiderData = {};

  render() {
    return html`
      <div style="position: relative; height:100vh; width:90vw"><canvas id="chart"></canvas></div>
    `;
  }

  firstUpdated() {
    const radarCanvas = this.renderRoot.querySelector(
      '#chart'
    ) as HTMLCanvasElement;
    const ctx = radarCanvas.getContext('2d');

    if (ctx === null) {
      return;
    }

    const parsedData = parseData(this.spiderData);
    const graphOptions = getRadarOptions();

    // eslint-disable-next-line no-new
    new ChartJS(ctx, {
      type: 'radar',
      data: parsedData,
      options: graphOptions
    });
  }
}
