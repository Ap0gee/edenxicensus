function racesChartTransformer(models) {
/*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';

    let races = ['Hume', 'Elvaan', 'Tarutaru', 'Mithra', 'Galka'];

    let racesDatasets = [];

    models.forEach(function (model, index) {
        let label = "All Characters";
        let color = colorSecondaryRgba;
        if (index) {
            label = "Online Characters";
            color = colorPrimaryRgba;
        }
        let dataset = {
            label: label,
            backgroundColor: color,
            borderColor: color,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: color,
            data: []
        };
        if (model.hasOwnProperty('races')) {
            races.forEach(function(race) {
                let raceKey = race.toLowerCase();
                dataset.data.push(model.races[raceKey]);
            });
            racesDatasets.push(dataset);
        }
    });

    return {
        labels: races,
        datasets: racesDatasets
    }
}
module.exports = { racesChartTransformer };