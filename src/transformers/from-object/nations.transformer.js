function nationsTransformer(object, model) {
    let nations = ['sandoria', 'bastok', 'windurst'];
    let home = nations[object.nation];

    if (object.rank_sandoria) {
        model.nations['sandoria'].ranked += 1;
        model.nations['sandoria'].total_ranks += object.rank_sandoria;
        model.nations['sandoria'].avg = (model.nations['sandoria'].total_ranks / model.nations['sandoria'].ranked).toFixed(2);
        if (object.rank_sandoria === 10) {
            model.nations['sandoria'].maxed += 1;
        }
    }

    if (object.rank_bastok) {
        model.nations['bastok'].ranked += 1;
        model.nations['bastok'].total_ranks += object.rank_bastok;
        model.nations['bastok'].avg = (model.nations['bastok'].total_ranks / model.nations['bastok'].ranked).toFixed(2);
        if (object.rank_bastok === 10) {
            model.nations['bastok'].maxed += 1;
        }
    }

    if (object.rank_windurst) {
        model.nations['windurst'].ranked += 1;
        model.nations['windurst'].total_ranks += object.rank_windurst;
        model.nations['windurst'].avg = (model.nations['windurst'].total_ranks / model.nations['windurst'].ranked).toFixed(2);
        if (object.rank_windurst === 10) {
            model.nations['windurst'].maxed += 1;
        }
    }

    model.nations[home].home += 1;
}
module.exports = { nationsTransformer };