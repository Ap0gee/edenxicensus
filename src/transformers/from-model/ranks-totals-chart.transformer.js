function ranksTotalsChartTransformer(model) {
    /*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';
    let colorAccentRgba = 'rgba(255, 63, 128, .4285714)';

    let nations = {
        bastok: "Bastok",
        windurst: "Windurst",
        sandoria: "San d'Oria"
    };

    let labels = [];

    let colors = [colorPrimaryRgba, colorAccentRgba, colorSecondaryRgba];

    let ranksDataset = {
        backgroundColor: colors,
        borderColor: colors,
        HoverBackgroundColor: colors,
        HoverBorderColor: colors,
        data: []
    };

    window._.keys(model.nations).forEach(function(nationKey) {
        labels.push(nations[nationKey]);
        ranksDataset.data.push(model.nations[nationKey].total_ranks);
    });

    return {
        labels: labels,
        datasets: [
            ranksDataset
        ]
    };
}
module.exports = { ranksTotalsChartTransformer };