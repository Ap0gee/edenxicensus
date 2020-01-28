function craftsChartTransformer(model) {
/*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';
    let colorAccentRgba = 'rgba(255, 63, 128, .4285714)';

    let labels = [];

    let totalLevelsDataset = {
        backgroundColor: colorAccentRgba,
        borderColor: colorAccentRgba,
        hoverBackgroundColor: colorAccentRgba,
        hoverBorderColor: colorAccentRgba,
        label: 'Total Levels',
        data: []
    };

    let avgLevelsDataset = {
        backgroundColor: colorPrimaryRgba,
        borderColor: colorPrimaryRgba,
        hoverBackgroundColor: colorPrimaryRgba,
        hoverBorderColor: colorPrimaryRgba,
        label: 'Average Levels',
        data: []
    };

    window._.keys(model.crafts).forEach(function (craftKey) {
        let craftCapitalized = craftKey.charAt(0).toUpperCase() + craftKey.slice(1);
        labels.push(craftCapitalized);
        totalLevelsDataset.data.push(model.crafts[craftKey].total_levels);
        avgLevelsDataset.data.push(model.crafts[craftKey].avg);
    });

    return {
        labels: labels,
        datasets: [
            totalLevelsDataset,
            avgLevelsDataset
        ]
    };
}
module.exports = { craftsChartTransformer };