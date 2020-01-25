function raceGendersTransformer(object, model) {
    let race = 'galka';
    let gender = [1, 3, 5, 8].includes(object.race) ? 'male' : 'female';

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

    model.race_genders[race][gender] += 1;
}
module.exports = { raceGendersTransformer };