function characterAveragesChartTransformer(model) {
/*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';
    let colorAccentRgba = 'rgba(255, 63, 128, .4285714)';

    let daysOfWeek = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let avgDataset = {
        backgroundColor: colorAccentRgba,
        borderColor: colorAccentRgba,
        fill: false,
        hoverBackgroundColor: colorAccentRgba,
        hoverBorderColor: colorAccentRgba,
        label: "average",
        data: []
    };
    let minDataset = {
        backgroundColor: colorPrimaryRgba,
        borderColor: colorPrimaryRgba,
        fill: false,
        hoverBackgroundColor: colorPrimaryRgba,
        hoverBorderColor: colorPrimaryRgba,
        label: "min",
        data: []
    };
    let maxDataset = {
        backgroundColor: colorSecondaryRgba,
        borderColor: colorSecondaryRgba,
        fill: false,
        hoverBackgroundColor: colorSecondaryRgba,
        hoverBorderColor: colorSecondaryRgba,
        label: "max",
        data: []
    };

    let labels = [];

    if (window._.keys(model).length) {
        let modelObjects = window._.values(model);
        let latest = modelObjects[modelObjects.length - 1];
        let modelKeys;

        if ( ! latest.hasOwnProperty('computed') ) {
            modelKeys = window._.keys(model).slice(0, 7);
        } else {
            modelKeys = window._.keys(model).slice(1, 8);
        }

        modelKeys.forEach(function (key) {
            let dayOfWeek = daysOfWeek[window.moment(key, 'Y-M-D').day()];
            labels.push(dayOfWeek);
            let data = model[key];

            if ( ! data.hasOwnProperty('calculated') ) {
                let items = window._.values(data);
                let latest = items[items.length-1];
                if (latest.hasOwnProperty('total')) {
                    maxDataset.data.push(latest.total);
                } else {
                    maxDataset.data.push(latest.online);
                }
            } else {
                let calculated = data['calculated'];
                if (calculated.hasOwnProperty('total')) {
                    avgDataset.data.push(calculated.total);
                    minDataset.data.push(calculated['total-min']);
                    maxDataset.data.push(calculated['total-max']);
                } else {
                    avgDataset.data.push(calculated.online);
                    minDataset.data.push(calculated['online-min']);
                    maxDataset.data.push(calculated['online-max']);
                }
            }
        });

    }

    return {
        labels: labels,
        datasets: [
            avgDataset,
            minDataset,
            maxDataset
        ]
    }
}
module.exports = { characterAveragesChartTransformer };