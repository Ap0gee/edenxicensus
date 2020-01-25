function gendersChartTransformer(model) {
    let computedStyle = getComputedStyle(document.documentElement);
    let colorMaleHex = computedStyle.getPropertyValue('--color-secondary');
    let colorFemaleHex = computedStyle.getPropertyValue('--color-primary');
    let colorMaleRgba = 'rgba(3, 218, 198, .4285714)';
    let colorFemaleRgba = 'rgba(187, 134, 252, .4285714)';

    let genders = ['Male', 'Female'];
    let colors = [colorMaleRgba, colorFemaleRgba];
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