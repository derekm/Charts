class GridChartImpl extends FormattedChart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    render(selector) {
        var table = d3.select(selector).append("table");
        var thead = table.append("thead");
        var tbody = table.append("tbody");

        if (this.options.title) {
            table.append("caption")
                .text(this.options.title);
        }

        if (this.options.showColumnLabels) {
            thead.append("tr")
                .selectAll("th")
                .data([""].concat(this.seriesData.series.map(s => s.name)))
                .enter()
                .append("th")
                .text(d => d);
        }

        var rows = tbody
            .selectAll("tr")
            .data(this.seriesData.categories.map((cat, i) => {
                var row = {};
                row.name = cat;
                row.values = this.seriesData.series.map(serie => serie.data[i]);
                return row;
            }))
            .enter()
            .append("tr")
            .attr("class", (cat, i) =>
                i < this.chartData.rowClasses.length ? this.chartData.rowClasses[i] : ''
            );

        if (this.options.showRowLabels) {
            rows
                .selectAll("th")
                .data(row => [row.name])
                .enter()
                .append("th")
                .text(d => d);
        }

        rows
            .selectAll("td")
            .data(row => row.values)
            .enter()
            .append("td")
            .text(d => d);

        return table;
    }
}
window.GridChartImpl = GridChartImpl;
