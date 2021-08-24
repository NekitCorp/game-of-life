import { hello } from "./hello.js";

const root = document.getElementById("root");

if (root) {
    root.innerText = hello("John");
}
