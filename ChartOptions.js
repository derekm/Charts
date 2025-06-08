class ChartOptions {
    constructor(options) {
        if (!options) options = {};

        Object.assign(this, options);
    }
}
ChartOptions.prototype.type = null;
ChartOptions.prototype.showRowLabels = true;
ChartOptions.prototype.showColumnLabels = true;
ChartOptions.prototype.format = {};
ChartOptions.prototype.renderDatumLabelFirst = true;
ChartOptions.prototype.fileName = 'download';
