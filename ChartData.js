class ChartData {
    constructor(rows, columns, data) {
        this.rows = rows || [];
        this.columns = columns || [];
        this.data = data || [];
        this.validated = false;
        this.rowClasses = [];
    }

    validateDataAndFillInLabels() {
        var longestDataRow = this.data.reduce((prev, curr) => {
            return prev.length > curr.length ? prev.length : curr.length;
        }, 0);
        var deepestDataCol = this.data.length;
        for (var i = 0; i < longestDataRow; ++i) {
            if (!this.columns[i]) {
                this.columns[i] = "Column " + (i + 1);
            }
        }
        for (var i = 0; i < deepestDataCol; ++i) {
            if (!this.rows[i]) {
                this.rows[i] = "Row " + (i + 1);
            }
        }
    }

    getDataSeriesByRow() {
        if (!this.validated) {
            this.validateDataAndFillInLabels();
        }
        return seriesByRowOrColumn(SeriesBy.ROW, this);
    }

    getDataSeriesByColumn() {
        if (!this.validated) {
            this.validateDataAndFillInLabels();
        }
        return seriesByRowOrColumn(SeriesBy.COLUMN, this);
    }
}
