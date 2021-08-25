import { countAliveAround, createAgent, IPopulation, neighborsOf } from "./agent.js";
import { populateRandom } from "./random.js";

export class World {
    constructor(
        private rows: number,
        private columns: number,
        private population = populateRandom(rows, columns)
    ) {}

    get agents() {
        return Object.values(this.population);
    }

    evolve = () => {
        const evolved: IPopulation = {};
        const checked: Record<string, boolean> = {};

        Object.values(this.population).forEach((agent) => {
            const alive = countAliveAround(agent, this.population);

            if (alive === 2 || alive === 3) {
                const { x, y } = agent;
                evolved[`${x}:${y}`] = agent;
            }

            neighborsOf(agent).forEach((neighbor) => {
                const { x, y } = neighbor;

                if (checked[`${x}:${y}`]) return;
                checked[`${x}:${y}`] = true;

                if (countAliveAround(neighbor, this.population) !== 3) return;
                evolved[`${x}:${y}`] = createAgent(x, y);
            });
        });

        this.population = evolved;
    };
}
