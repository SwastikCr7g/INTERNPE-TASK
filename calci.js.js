let display = document.getElementById("display");

function appendChar(char) {
  if (display.innerText === "0") {
    display.innerText = char;
  } else {
    display.innerText += char;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteChar() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function calculate() {
  try {
    display.innerText = eval(display.innerText.replace('%', '/100'));
  } catch (e) {
    display.innerText = "Error";
  }
}
