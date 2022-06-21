type GenericURLBuilder<T> = (arg: T) => string;

const getOccupantsOfUser: GenericURLBuilder<number | string> = (userId: number | string) =>
    `${API_ROOT}/users/${userId}/occupants`;

const sharedAPIUrls = {
    getOccupantsOfUser,
};

export default sharedAPIUrls;
