function sizesTransformer(object, model) {
    let size = 'large';

    switch(object.size) {
        case 0:
            size = 'small';
            break;
        case 1:
            size = 'medium';
            break;
    }

    model.sizes[size] += 1;
}
module.exports = { sizesTransformer };