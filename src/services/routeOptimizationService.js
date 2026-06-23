const calculateDistance = (loc1, loc2) => {
    const lat1 = Number(loc1.latitude);
    const lon1 = Number(loc1.longitude);
    const lat2 = Number(loc2.latitude);
    const lon2 = Number(loc2.longitude);

    const latDiff = lat1 - lat2;
    const lonDiff = lon1 - lon2;

    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
};

const optimizeRoute = (locations) => {
    if (!locations || locations.length <= 1) {
        return locations;
    }

    const warehouses = locations.find(
        loc => loc.name.toLowerCase() === "warehouses"
    );

    if (!warehouses) {
        throw new Error("Warehouses not found");
    }

    const unvisited = locations.filter(
        loc => loc.id !== warehouses.id
    );

    const optimizedRoute = [warehouses];
    let totalDistance = 0;
    let currentLocation = warehouses;

    while (unvisited.length > 0) {
        let nearestIndex = 0;
        let shortestDistance = calculateDistance(
            currentLocation,
            unvisited[0]
        );

        for (let i = 1; i < unvisited.length; i++) {
            const distance = calculateDistance(
                currentLocation,
                unvisited[i]
            );

            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestIndex = i;
            }
        }

        totalDistance += shortestDistance;

        currentLocation = unvisited.splice(nearestIndex, 1)[0];
        optimizedRoute.push(currentLocation);
    }

    return {
        optimizedRoute,
        totalDistance: Number(totalDistance.toFixed(4))
    };
};

module.exports = optimizeRoute;