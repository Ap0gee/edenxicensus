const _ = require('lodash');

function jobsTransformer(object, model) {
    _.values(object.jobs).forEach(function(job) {
        if (job.level && job.name !== "") {
            let jobKey = job.name.toLowerCase();
            model.jobs[jobKey].total_levels += job.level;
            model.jobs[jobKey].leveled += 1;
            model.jobs[jobKey].avg = (model.jobs[jobKey].total_levels / model.jobs[jobKey].leveled).toFixed(2);
            if (job.level === 75) {
                model.jobs[jobKey].maxed += 1;
            }
        }
    });
}
module.exports = { jobsTransformer };