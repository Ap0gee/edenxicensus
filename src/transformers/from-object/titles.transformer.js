function titlesTransformer(object, model) {
    if ( ! model.titles.hasOwnProperty(object.title) ) {
        model.titles[object.title] = 0;
    } else {
        model.titles[object.title] += 1;
    }
}
module.exports = { titlesTransformer };