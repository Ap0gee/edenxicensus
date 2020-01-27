function gendersChartTransformer(model) {
/*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';

    let genders = ['Male', 'Female'];
    let colors = [colorSecondaryRgba, colorPrimaryRgba];

    let genderDataset = {
        backgroundColor: colors,
        borderColor: colors,
        hoverBackgroundColor: colors,
        hoverBorderColor: colors,

        data: []
    };

    if (model.hasOwnProperty('genders')) {
        genderDataset.data.push(model.genders.male);
        genderDataset.data.push(model.genders.female)
    }

    return {
        labels: genders,
        datasets: [
            genderDataset
        ]
    }
}
module.exports = { gendersChartTransformer };