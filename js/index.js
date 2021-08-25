import { Drawer } from "./drawer.js";
import { World } from "./world.js";
const drawer = new Drawer(10);
const world = new World(30, 40);
function liveGeneration() {
    drawer.reset();
    world.evolve();
    drawer.drawWorld(world);
}
(function gameLoop() {
    liveGeneration();
    setTimeout(() => window.requestAnimationFrame(gameLoop), 100);
})();
