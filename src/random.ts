import { createAgent, IPopulation } from "./agent.js";

function range(size: number) {
    return Array.from({ length: size }, (_, index) => index);
}

export function populateRandom(rows: number, columns: number) {
    const population: IPopulation = {};

    range(columns).forEach((_, i) => {
        range(rows).forEach((_, j) => {
            if (Math.random() <= 0.4) return;
            population[`${i}:${j}`] = createAgent(i, j);
        });
    });

    return population;
}
