class DatumChartImpl extends FormattedChart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    render(selector) {
        var container = d3.select(selector);

        var article = container.append("article");

        article.selectAll("h4")
            .data([this.options.title])
            .enter()
            .append("h4")
            .text(d => d);

        var sectionsDiv = article.append("div")
            .classed("sections", true)
            .style("display", "flex");

        var sections = sectionsDiv.selectAll("section")
            .data(this.seriesData.series.map(serie => serie.name))
            .enter()
            .append("section")
            .style("padding-right", "1em");

        sections.append("h5")
            .text(d => d);

        sections.each((d, i,  n) => {
            var rows = d3.select(n[i])
                .selectAll("div")
                .data(this.seriesData.categories.map((cat, j) => {
                    var row = {};
                    row.name = cat;
                    row.value = this.seriesData.series[i].data[j];
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
        });

        return container;
    }
}
window.DatumChartImpl = DatumChartImpl;
