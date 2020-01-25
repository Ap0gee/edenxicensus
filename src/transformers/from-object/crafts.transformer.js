function craftsTransformer(object, model) {
    window._.values(object.crafts).forEach(function(craft) {
        if (craft.level) {
            let craftKey = craft.name.toLowerCase();
            model.crafts[craftKey].total_levels += craft.level;
            model.crafts[craftKey].leveled += 1;
            model.crafts[craftKey].avg = (model.crafts[craftKey].total_levels / model.crafts[craftKey].leveled).toFixed(2);
        }
    });
}
module.exports = { craftsTransformer };