function raceGendersChartTransformer(model) {
    let computedStyle = getComputedStyle(document.documentElement);
    let colorMaleHex = computedStyle.getPropertyValue('--color-secondary');
    let colorFemaleHex = computedStyle.getPropertyValue('--color-primary');
    let colorMaleRgba = 'rgba(3, 218, 198, .4285714)';
    let colorFemaleRgba = 'rgba(187, 134, 252, .4285714)';

    let races = ['Hume', 'Elvaan', 'Tarutaru', 'Mithra', 'Galka'];

    let maleDataset =  {
        label: "Male",
        backgroundColor: colorMaleRgba,
        borderColor: colorMaleRgba,
        hoverBackgroundColor: colorMaleRgba,
        hoverBorderColor: colorMaleRgba,
        data: []
    };

    let femaleDataset = {
        label: "Female",
        backgroundColor: colorFemaleRgba,
        borderColor: colorFemaleRgba,
        hoverBackgroundColor: colorFemaleRgba,
        hoverBorderColor: colorFemaleRgba,
        data: []
    };

    races.forEach(function (race) {
        if (model.hasOwnProperty('race_genders')) {
            let raceKey = race.toLowerCase();
            let genderData = model.race_genders[raceKey];
            if (genderData.hasOwnProperty('male')) {
                maleDataset.data.push(genderData.male);
            } else {
                maleDataset.data.push(0);
            }
            if (genderData.hasOwnProperty('female')) {
                femaleDataset.data.push(genderData.female);
            } else {
                femaleDataset.data.push(0);
            }
        }
    });

    return {
        labels: races,
        datasets: [
            maleDataset,
            femaleDataset
        ]
    }
}
module.exports = { raceGendersChartTransformer };