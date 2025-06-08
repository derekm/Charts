class FormattedChart extends Chart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    beforeSeriesData() {
        this.formatByColumns();
    }

    afterSeriesData() {
        this.formatBySeries();
    }

    formatByColumns() {
        var formatters = this.options.format.columns;
        if (formatters) {
            this.chartData = Object.assign(new ChartData(), structuredClone(this.origData));
            var data = this.chartData;
            var indexes = [];
            for (var i in data.columns) {
                var name = data.columns[i];
                if (formatters.hasOwnProperty(name)) {
                    indexes.push({
                        index: i,
                        fn: formatters[name]
                    });
                }
            }
            for (var j in data.data) {
                for (var i in indexes) {
                    var index = indexes[i].index;
                    var format = indexes[i].fn;
                    data.data[j][index] = format(data.data[j][index]);
                }
            }
        }
    }

    formatBySeries() {
        var formatters = this.options.format.series;
        if (formatters) {
            var data = this.seriesData;
            for (var i in data.series) {
                var series = data.series[i];
                if (formatters.hasOwnProperty(series.name)) {
                    series.data = series.data.map(formatters[series.name]);
                }
            }
        }
    }
}
