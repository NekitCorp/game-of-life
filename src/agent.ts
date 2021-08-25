export type IAgent = {
    x: number;
    y: number;
};

export type IPopulation = Record<string, IAgent>;

export function createAgent(x: number, y: number): IAgent {
    return { x, y };
}

export function isAlive(agent: IAgent, population: IPopulation): boolean {
    return !!population[`${agent.x}:${agent.y}`];
}

export function neighborsOf({ x, y }: IAgent): IAgent[] {
    return [
        // Соседи сверху:
        { x: x - 1, y: y - 1 },
        { x, y: y - 1 },
        { x: x + 1, y: y - 1 },

        // ...С каждой стороны:
        { x: x - 1, y },
        { x: x + 1, y },

        // ...И под указанной клеткой:
        { x: x - 1, y: y + 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y + 1 },
    ];
}

export function countAliveAround(agent: IAgent, population: IPopulation): number {
    return neighborsOf(agent).reduce((total, agent) => {
        return total + (isAlive(agent, population) ? 1 : 0);
    }, 0);
}
