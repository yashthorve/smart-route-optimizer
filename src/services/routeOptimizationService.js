const optimizeRoute = (locations) => {

    if (locations.length <= 1) {
        return locations;
    }

    const warehouse = locations.find(
        loc => loc.name.toLowerCase() === "warehouse"
    );

    const deliveries = locations.filter(
        loc => loc.name.toLowerCase() !== "warehouse"
    );

    deliveries.sort((a, b) => a.latitude - b.latitude);

    return [warehouse, ...deliveries];
};

module.exports = optimizeRoute;