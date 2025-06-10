import {LitElement, html, css} from 'https://esm.run/lit-element@4.2.0';
import {when} from 'https://esm.run/lit@3.3.0/directives/when.js';

export class ChartElement extends LitElement {
    static get properties() {
        return {
            data: {type: String},
            options: {type: String},
            useCsvIcon:  {type: String},
        }
    }
    static get styles() {
        return css`
        @keyframes flipContent {
            0% { transform: scaleX(1); }
            50% { transform: scaleX(-1); }
            100% { transform: scaleX(1); }
        }
        .loader {
            display: inline-block;
            animation: flipContent 2s infinite steps(3);
        }
        `;
    }

    createRenderRoot() { return this; }

    render() {
        return when(!this.options, () => html`
            <div class="loader">👀</div>
        `, () => html`
            <div class="chart"></div>
        `);
    }

    firstUpdate() {
        this.renderChart();
    }

    updated() {
        this.renderChart();
    }

    renderChart() {
        const element = this.querySelector('.chart');
        element.textContent = undefined;
        const type = this.options?.type;
        const downloadFileName = this.options?.fileName ? this.options.fileName : 'download';
        const useCsvIcon = this.useCsvIcon ? this.useCsvIcon : true;
        if (typeof type == "string" && type.length > 0) {
            const ChartImpl = window[type.at(0).toUpperCase() + type.substr(1).toLowerCase() + "ChartImpl"];
            if (typeof ChartImpl == "function") {
                const chart = new ChartImpl(this.data, this.options);
                chart.render(element);
                chart.appendCSV(element, downloadFileName, useCsvIcon);
            } else {
                element.textContent = "chart type not found";
            }
        } else {
            element.textContent = "chart type not specified";
        }
    }
}
window.customElements.define('chart-element', ChartElement);
