export function facesTransformer(object, model) {
    let face = object.face + 1;
    let type = face > 8 ? 'B' : 'A';
    face = face > 8 ? face - 8 : face;
    let faceKey = `${face}${type}`;
    model.faces[faceKey] += 1;
}