export const storage = {
    saveFavoriteCities: (cities) => {
        localStorage.setItem("favorites", cities);
    },
    getFavoriteCities: () =>
        localStorage.getItem("favorites") === null
            ? []
            : localStorage.getItem("favorites").split(","),

    saveCurrentCity: (city) => {
        localStorage.setItem("currentCity", city);
    },
    getCurrentCity: () => localStorage.getItem("currentCity"),
};
