function facesTransformer(object, model) {
    let face = object.face + 1;
    let type = face <= 8 ? 'A' : 'B';
    face = face <= 8 ? face : face - 8;
    let faceKey = `${face}${type}`;
    model.faces[faceKey] += 1;
}
module.exports = { facesTransformer };