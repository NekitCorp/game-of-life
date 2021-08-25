export class Drawer {
    canvas;
    context;
    kernel;
    width;
    height;
    rows;
    columns;
    constructor(kernelSize) {
        // Находим элемент:
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const [width, height] = [canvas.offsetWidth, canvas.offsetHeight];
        // Сохраняем ссылки на контекст и настройки:
        this.canvas = canvas;
        this.context = context;
        this.kernel = kernelSize;
        this.width = width;
        this.height = height;
        // Рассчитываем количество колонок и рядов на поле:
        this.rows = Math.floor(height / this.kernel);
        this.columns = Math.floor(width / this.kernel);
        // Нормализуем отображение на экранах с высокой плотностью пикселей:
        this.normalizeScale();
    }
    normalizeScale = () => {
        const { devicePixelRatio: pixelRatio } = window;
        if (pixelRatio > 1) {
            this.canvas.width = this.width * pixelRatio;
            this.canvas.height = this.height * pixelRatio;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.context.scale(pixelRatio, pixelRatio);
        }
    };
    drawGrid = () => {
        this.context.strokeStyle = "rgba(0,0,0,0.3)";
        // Вертикальные линии:
        for (let i = 0; i < this.width + this.kernel; i += this.kernel) {
            this.context.beginPath();
            this.context.moveTo(i, 0);
            this.context.lineTo(i, this.height);
            this.context.stroke();
        }
        // Горизонтальные линии:
        for (let j = 0; j < this.height + this.kernel; j += this.kernel) {
            this.context.beginPath();
            this.context.moveTo(0, j);
            this.context.lineTo(this.width, j);
            this.context.stroke();
        }
    };
    drawWorld = (world) => {
        this.context.fillStyle = "#000000";
        world.agents.forEach((agent) => {
            this.context.fillRect(agent.x * this.kernel, agent.y * this.kernel, this.kernel, this.kernel);
        });
    };
    reset = () => {
        this.context.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
    };
}
