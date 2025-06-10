class DatumChartImpl extends FormattedChart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    render(selector) {
        const container = d3.select(selector);

        const article = container.append("article");

        article.selectAll("h4")
            .data([this.options.title])
            .enter()
            .append("h4")
            .text(d => d);

        const sections = article.append("div")
            .classed("sections", true)
            .style("display", "flex")
            .selectAll("section")
            .data(this.seriesData.series.map(serie => serie.name))
            .enter()
            .append("section")
            .style("padding-right", "1em");

        sections.append("h5")
            .text(d => d);

        sections.each((d, i,  n) => {
            const rows = d3.select(n[i])
                .append("dl")
                .selectAll("div")
                .data(this.seriesData.categories.map((cat, j) => {
                    const row = {};
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
                .append("dt")
                .classed("datum-label", true)
                .text(d => d);

            var continuation = rows
                .selectAll(".datum-value")
                .data(row => [row.value])
                .enter();
            // this is now technically incorrect to do for <dl> description lists
            if (this.options.renderDatumLabelFirst) {
                continuation = continuation.append("dd");
            } else {
                continuation = continuation.insert("dd", ":first-child");
            }
            continuation
                .classed("datum-value", true)
                .text(d => d);
        });

        return container;
    }
}
window.DatumChartImpl = DatumChartImpl;
