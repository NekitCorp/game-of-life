import { countAliveAround, createAgent, neighborsOf } from "./agent.js";
import { populateRandom } from "./random.js";
export class World {
    rows;
    columns;
    population;
    constructor(rows, columns, population = populateRandom(rows, columns)) {
        this.rows = rows;
        this.columns = columns;
        this.population = population;
    }
    get agents() {
        return Object.values(this.population);
    }
    evolve = () => {
        const evolved = {};
        const checked = {};
        Object.values(this.population).forEach((agent) => {
            const alive = countAliveAround(agent, this.population);
            if (alive === 2 || alive === 3) {
                const { x, y } = agent;
                evolved[`${x}:${y}`] = agent;
            }
            neighborsOf(agent).forEach((neighbor) => {
                const { x, y } = neighbor;
                if (checked[`${x}:${y}`])
                    return;
                checked[`${x}:${y}`] = true;
                if (countAliveAround(neighbor, this.population) !== 3)
                    return;
                evolved[`${x}:${y}`] = createAgent(x, y);
            });
        });
        this.population = evolved;
    };
}
