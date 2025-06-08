var ChartTypes = Object.freeze({
    GRID: "grid",
    DATUM: "datum",
    BAR: "bar",
    LINE: "line"
});

class Chart {
    constructor(chartData, options) {
        this.origData = structuredClone(chartData);
        this.chartData = Object.assign(new ChartData(), chartData);
        this.options = new ChartOptions(options);
        this.dataGridCache = undefined;

        this.beforeSeriesData();

        this.initSeriesData();

        this.afterSeriesData();
    }

    beforeSeriesData() { }

    initSeriesData() {
        if (this.options.seriesBy == SeriesBy.ROW) {
            this.seriesData = this.chartData.getDataSeriesByRow();
        } else if (this.options.seriesBy == SeriesBy.COLUMN) {
            this.seriesData = this.chartData.getDataSeriesByColumn();
        }
    }

    afterSeriesData() { }

    get dataGrid() {
        if (!this.dataGridCache) {
            this.dataGridCache = this.#getDataGrid();
        }
        return this.dataGridCache;
    }

    #getDataGrid() {
        var grid = [];

        grid.push([""].concat(this.seriesData.series.map(s => {
            return s.name;
        }))); // header row

        var rows = this.seriesData.categories.map((cat, i) => {
            return [cat].concat(this.seriesData.series.map(serie => {
                return serie.data[i];
            }));
        });

        return grid.concat(
            rows.map(row => {
                return row;
            })
        );
    }

    getCSV() {
        return this.dataGrid.map(row => {
            return row.map(val => {
                if (typeof (val) === "string") {
                    val.replace(/"/g, '""');
                }
                return /[\r\n,"]/.test(val) ? '"' + val + '"' : val;
            }).join(",");
        }).join("\r\n");
    }

    appendCSV(element, filename, useCsvIcon) {
        var csv = this.getCSV();
        var blob = new Blob([csv], { type: "text/csv" });
        var a = document.createElement("a");
        if (!useCsvIcon) {
            a.className += " csvWords";
        }
        a.download = filename + ".csv";
        a.href = URL.createObjectURL(blob);
        a.innerHTML = useCsvIcon ? '<i class="icon i-download"></i>' : 'Download csv';
        a.title = filename;
        element.appendChild(a);
    }
}
