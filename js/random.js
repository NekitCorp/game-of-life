import { createAgent } from "./agent.js";
function range(size) {
    return Array.from({ length: size }, (_, index) => index);
}
export function populateRandom(rows, columns) {
    const population = {};
    range(columns).forEach((_, i) => {
        range(rows).forEach((_, j) => {
            if (Math.random() <= 0.5)
                return;
            population[`${i}:${j}`] = createAgent(i, j);
        });
    });
    return population;
}
