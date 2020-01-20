function mentorsTransformer(object, model) {
    model.mentors += object.mentor;
}
module.exports = { mentorsTransformer };