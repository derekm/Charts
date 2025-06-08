class BarChartImpl extends C3Chart {
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
                names: this.names,
                type: "bar",
                axes: {
                    count: "y"
                },
                color: function (color, d) {
                    var colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896'];
                    return colors[d.index % colors.length];
                }
            },
            axis: {
                rotated: true,
                x: {
                    type: "category",
                    categories: this.seriesData.categories
                },
                y: {
                    tick: {
                        format: function (x) {
                            return (x == Math.floor(x)) ? x : "";
                        }
                    }
                }
            },
            legend: {
                hide: true
            }
        };

        if (this.options.yAxis) {
            config.axis.y.label = {
                text: this.options.yAxis,
                position: "outer-center"
            };
        }

        var chart = c3.generate(config);

        return chart;
    }
}
window.BarChartImpl = BarChartImpl;
