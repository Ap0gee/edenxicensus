function jobsTotalsChartTransformer(model) {
    /*    let computedStyle = getComputedStyle(document.documentElement);
    let colorSecondaryHex = computedStyle.getPropertyValue('--color-secondary');
    let colorPrimaryHex = computedStyle.getPropertyValue('--color-primary');*/
    let colorSecondaryRgba = 'rgba(3, 218, 198, .4285714)';
    let colorPrimaryRgba = 'rgba(187, 134, 252, .4285714)';
    let colorAccentRgba = 'rgba(255, 63, 128, .4285714)';

    let jobs = {
        war: "Warrior",
        mnk: "Monk",
        whm: "White Mage",
        blm: "Black Mage",
        rdm: "Red Mage",
        thf: "Thief",
        pld: "Paladin",
        drk: "Dark Knight",
        rng: "Ranger",
        bst: "Beastmaster",
        brd: "Bard",
        smn: "Summoner",
        drg: "Dragoon",
        sam: "Samurai",
        nin: "Ninja",
        cor: "Corsair",
        pup: "Puppetmaster",
        blu: "Blue Mage",
    };

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
        backgroundColor: colorSecondaryRgba,
        borderColor: colorSecondaryRgba,
        hoverBackgroundColor: colorSecondaryRgba,
        hoverBorderColor: colorSecondaryRgba,
        label: 'Average Levels',
        data: []
    };


    window._.keys(model.jobs).forEach(function (jobKey) {
        let jobName = jobs[jobKey];
        labels.push(jobName);
        totalLevelsDataset.data.push(model.jobs[jobKey].total_levels);
        avgLevelsDataset.data.push(model.jobs[jobKey].avg);
    });

    return {
        labels: labels,
        datasets: [
            totalLevelsDataset,
            avgLevelsDataset
        ]
    };
}
module.exports = { jobsTotalsChartTransformer };