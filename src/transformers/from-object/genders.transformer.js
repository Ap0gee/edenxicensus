function gendersTransformer(object, model) {
    let gender = [1, 3, 5, 8].includes(object.race) ? 'male' : 'female';
    model.genders[gender] += 1;
}
module.exports = { gendersTransformer };