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
  `;

  // This is the property definition. It expects stringified JSON data
  @property({ type: String }) data = '';
  
  @property({ type: Boolean }) testMode = false;
  

  render() {
    const testModeWarning = (this.testMode === true) ? 'Graph test mode is enabled' : '';
    return html`<div style="position: relative; height: 100%; width: 100%">
        ${testModeWarning}
        <canvas id="chart"></canvas>
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
      options: graphOptions
    });
  }

  updated() {
    if (this.data === "") {
      return
    }

    this.renderInriscSpider(this.data)
  }

  firstUpdated() {
    if (this.testMode === true) {
      this.renderInriscSpider(JSON.stringify(spiderData));
    }
   
  }
}
