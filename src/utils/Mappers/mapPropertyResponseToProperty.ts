import { PropertyTypes } from 'API/Property';
import { Property } from '../../State/Shared/Types';

export const mapPropertyResponseToProperty = ({ id, name }: PropertyTypes.PropertyResponse): Property => ({
    id,
    name,
});

