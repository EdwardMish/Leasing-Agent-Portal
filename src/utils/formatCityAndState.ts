import { Address } from "../State/Shared/Types/Address";
import { UserAddress } from "../API/Users/UsersTypes/UserAddress";
import { OccupantAddress } from "../State/Shared/Types/OccupantAddress";

export const formatCityAndState = (address: OccupantAddress | UserAddress | Address): string => {
    const { city = "", state = "" } = address;

    const hasCity: boolean = city.length > 0;
    const hasState: boolean = state.length > 0;

    if (hasCity && hasState) return `${city}, ${state}`;

    if (hasCity && !hasState) return city;

    if (!hasCity && hasState) return state;

    return "";
};
