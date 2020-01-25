function racesTransformer(object, model) {
    let race = 'galka';

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

    model.races[race] += 1;
}
module.exports = { racesTransformer };