class LineChartImpl extends C3Chart {
    constructor(chartData, options) {
        super(chartData, options);
    }

    render(selector) {
        var config = {
            bindto: this.createChildContainer(selector),
            color: {
                pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896']
            },
            data: {
                columns: this.columns,
                names: this.names
            },
            axis: {
                x: {
                    type: "category",
                    categories: this.seriesData.categories,
                    tick: {
                        rotate: -30,
                        multiline: false
                    },
                    height: 85
                },
                y: {
                    tick: {
                        format: function (x) {
                            return (x == Math.floor(x)) ? x : "";
                        }
                    },
                    padding: {
                        bottom: 0
                    }
                }
            }
        };

        if (this.options.yAxis) {
            config.axis.y.label = {
                text: this.options.yAxis,
                position: "outer-middle"
            };
        }

        var chart = c3.generate(config);

        return chart;
    }
}
window.LineChartImpl = LineChartImpl;
