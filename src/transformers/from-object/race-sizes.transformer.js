function raceSizesTransformer(object, model) {
    let race = 'galka';
    let size = 'large';

    switch(object.size) {
        case 0:
            size = 'small';
            break;
        case 1:
            size = 'medium';
            break;
    }

    switch(true) {
        case [1, 2].includes(object.race):
            race = 'hume';
            break;
        case [3, 4].includes(object.race):
            race = 'elvaan';
            break;
        case [5, 6].includes(object.race):
            race = 'tarutaru';
            break;
        case object.race === 7:
            race = 'mithra';
            break;
    }

    model.race_sizes[race][size] += 1;
}
module.exports = { raceSizesTransformer };