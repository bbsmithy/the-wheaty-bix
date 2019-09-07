const terminalContainer = document.getElementById("terminal-container");
const terminal = document.getElementById("terminal-code");
const runButton = document.getElementById("run-btn");
let terminalCode = terminal.value || "";

dragElement(terminalContainer);

terminal.addEventListener("input", () => {
  terminalCode = terminal.value;
});

runButton.addEventListener("click", () => {
  parseCode(terminalCode);
});

function parseCode(code) {
  eval(code);
}
