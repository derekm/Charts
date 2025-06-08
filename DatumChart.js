class DatumChartImpl extends FormattedChart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    render(selector) {
        var container = d3.select(selector);

        var rows = container
            .selectAll("div")
            .data(this.seriesData.categories.map((cat, i) => {
                var row = {};
                row.name = cat;
                row.value = this.seriesData.series[0].data[i];
                return row;
            }))
            .enter()
            .append("div")
            .classed("datum", true);

        rows
            .selectAll(".datum-label")
            .data(row => [row.name])
            .enter()
            .append("div")
            .classed("datum-label", true)
            .text(d => d);

        var continuation = rows
            .selectAll(".datum-value")
            .data(row => [row.value])
            .enter();
        if (this.options.renderDatumLabelFirst) {
            continuation = continuation.append("div");
        } else {
            continuation = continuation.insert("div", ":first-child");
        }
        continuation
            .classed("datum-value", true)
            .text(d => d);

        return container;
    }
}
window.DatumChartImpl = DatumChartImpl;
