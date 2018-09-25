import { schema } from 'normalizr';
import $schemas from '@components/utils/$schemas';



const channel = new schema.Entity('channel', {}, {
    idAttribute(entity) {
        return `${entity.location.country}-${entity.location.city}`;
    }
});

export default Object.assign({
    channel
}, $schemas);
