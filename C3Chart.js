class C3Chart extends Chart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    afterSeriesData() {
        this.columns = this.seriesData.series.map(function (serie, i) {
            return ["serie" + i].concat(serie.data);
        });
        this.names = this.seriesData.series.reduce(function (names, serie, i) {
            names["serie" + i] = serie.name;
            return names;
        }, {});
    }

    createChildContainer(selector) {
        var container = document.createElement("div");
        container.style.height = selector.offsetHeight + "px";
        selector.appendChild(container);
        return container;
    }
}
