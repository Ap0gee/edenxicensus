function namesTransformer(object, model) {
    let first_letter = object.charname.charAt(0).toLowerCase();
    model.names[first_letter] += 1;
}
module.exports = { namesTransformer };