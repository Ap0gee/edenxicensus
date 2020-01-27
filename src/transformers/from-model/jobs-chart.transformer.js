function jobsChartTransformer(model) {
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

    let leveledDataset = {
        backgroundColor: colorPrimaryRgba,
        borderColor: colorPrimaryRgba,
        hoverBackgroundColor: colorPrimaryRgba,
        hoverBorderColor: colorPrimaryRgba,
        label: 'Leveled',
        data: []
    };

    let maxedDataset = {
        backgroundColor: colorSecondaryRgba,
        borderColor: colorSecondaryRgba,
        hoverBackgroundColor: colorSecondaryRgba,
        hoverBorderColor: colorSecondaryRgba,
        label: 'Maxed',
        data: []
    };

    window._.keys(model.jobs).forEach(function (jobKey) {
        let jobName = jobs[jobKey];
        labels.push(jobName);
        leveledDataset.data.push(model.jobs[jobKey].leveled);
        maxedDataset.data.push(model.jobs[jobKey].maxed);
    });

    return {
        labels: labels,
        datasets: [
            leveledDataset,
            maxedDataset
        ]
    };
}
module.exports = { jobsChartTransformer };