function nationsChartTransformer(model) {
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

    let homeDataset = {
        backgroundColor: colorAccentRgba,
        borderColor: colorAccentRgba,
        hoverBackgroundColor: colorAccentRgba,
        hoverBorderColor: colorAccentRgba,
        label: 'Home',
        data: []
    };

    let maxedDataset = {
        backgroundColor: colorPrimaryRgba,
        borderColor: colorPrimaryRgba,
        hoverBackgroundColor: colorPrimaryRgba,
        hoverBorderColor: colorPrimaryRgba,
        label: 'Maxed',
        data: []
    };

    let rankedDataset = {
        backgroundColor: colorSecondaryRgba,
        borderColor: colorSecondaryRgba,
        hoverBackgroundColor: colorSecondaryRgba,
        hoverBorderColor: colorSecondaryRgba,
        label: 'Ranked',
        data: []
    };

    window._.keys(model.nations).forEach(function(nationKey) {
        labels.push(nations[nationKey]);
        homeDataset.data.push(model.nations[nationKey].home);
        maxedDataset.data.push(model.nations[nationKey].maxed);
        rankedDataset.data.push(model.nations[nationKey].ranked);
    });

    return {
        labels: labels,
        datasets: [
            homeDataset,
            maxedDataset,
            rankedDataset
        ]
    };
}
module.exports = { nationsChartTransformer };