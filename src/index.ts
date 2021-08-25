import { Drawer } from "./drawer.js";
import { World } from "./world.js";

const drawer = new Drawer(10);
const world = new World(drawer.rows, drawer.columns);

function liveGeneration() {
    drawer.reset();
    world.evolve();
    drawer.drawWorld(world);
}

(function gameLoop() {
    liveGeneration();
    setTimeout(() => window.requestAnimationFrame(gameLoop), 100);
})();
