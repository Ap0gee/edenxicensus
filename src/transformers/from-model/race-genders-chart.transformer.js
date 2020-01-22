function raceGendersChartTransformer(model) {
    console.log(model);
    return {
        labels: [],
        datasets: [
            {
                label: "blah",
                backgroundColor: [],
                hoverBackgroundColor: [],
                data: [[100,200], [200,300], [222,444]],
                borderWidth: 1
            }
        ]
    }
}
module.exports = { raceGendersChartTransformer };