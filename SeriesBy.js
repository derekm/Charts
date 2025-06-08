var SeriesBy = Object.freeze({
    ROW: "row",
    COLUMN: "column"
});

/**
 * seriesByRowOrColumn takes a data object (having an array of row
 * labels, an array of column labels, and a grid of data points as an
 * array of arrays) and returns categories and series by row or by
 * column.
 *
 * @param seriesBy
 * @param data
 * @returns {{categories: Array, series: Array}}
 */
function seriesByRowOrColumn(seriesBy, data) {
    var result = {
        categories: [],
        series: []
    };
    var serie;
    if (seriesBy == "column") {
        result.categories = data.columns;
        for (var i in data.rows) {
            serie = {
                name: data.rows[i],
                data: data.data[i]
            };
            result.series.push(serie);
        }
    } else {
        result.categories = data.rows;
        for (var i in data.columns) {
            serie = {
                name: data.columns[i],
                data: []
            };
            for (var ii in data.data) {
                serie.data.push(data.data[ii][i]);
            }
            result.series.push(serie);
        }
    }
    return result;
}
