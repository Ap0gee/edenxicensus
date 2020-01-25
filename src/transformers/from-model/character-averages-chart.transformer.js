function characterAveragesChartTransformer(model) {
/*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';
    let colorAccentRgba = 'rgba(255, 63, 128, .4285714)';

    let daysOfWeek = ['', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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

    window._.keys(model).forEach(function (key) {
        let dayOfWeek = daysOfWeek[window.moment(key, 'Y-M-D').day()];
        labels.push(dayOfWeek);
        let data = model[key];

        if ( ! data.hasOwnProperty('calculated') ) {
            let items = window._.values(data);
            let latest = items[items.length-1];
            if (latest.hasOwnProperty('total')) {
                avgDataset.data.push(latest.total);
                minDataset.data.push(latest.total);
                maxDataset.data.push(latest.total);
            } else {
                avgDataset.data.push(latest.online);
                minDataset.data.push(latest.online);
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