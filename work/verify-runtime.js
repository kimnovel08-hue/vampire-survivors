const fs = require("fs");
const vm = require("vm");

class MockClassList {
  constructor(initial = "") {
    this.items = new Set(initial.split(/\s+/).filter(Boolean));
  }

  add(name) {
    this.items.add(name);
  }

  remove(name) {
    this.items.delete(name);
  }

  contains(name) {
    return this.items.has(name);
  }

  toggle(name, force) {
    if (force === true) {
      this.add(name);
      return true;
    }

    if (force === false) {
      this.remove(name);
      return false;
    }

    if (this.contains(name)) {
      this.remove(name);
      return false;
    }

    this.add(name);
    return true;
  }
}

class MockElement {
  constructor(id = "") {
    this.id = id;
    this.children = [];
    this.listeners = {};
    this.classList = new MockClassList();
    this.style = {};
    this.dataset = {};
    this.textContent = "";
    this.type = "";
    this.width = 0;
    this.height = 0;
  }

  set className(value) {
    this._className = value;
    this.classList = new MockClassList(value);
  }

  get className() {
    return this._className || "";
  }

  set innerHTML(value) {
    this._innerHTML = value;
    this.children = [];
  }

  get innerHTML() {
    return this._innerHTML || "";
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  addEventListener(type, callback) {
    this.listeners[type] = this.listeners[type] || [];
    this.listeners[type].push(callback);
  }

  getBoundingClientRect() {
    return {
      left: 800,
      top: 360,
      width: 132,
      height: 132,
      right: 932,
      bottom: 492,
    };
  }

  getContext() {
    return mockContext;
  }
}

const mockContext = {
  setTransform() {},
  fillRect() {},
  strokeRect() {},
  beginPath() {},
  arc() {},
  fill() {},
  stroke() {},
  moveTo() {},
  lineTo() {},
  save() {},
  restore() {},
  translate() {},
  rotate() {},
  fillText() {},
  strokeStyle: "",
  fillStyle: "",
  lineWidth: 1,
  font: "",
  textAlign: "",
  globalAlpha: 1,
};

const elements = new Map();
const requiredIds = [...fs.readFileSync("index.html", "utf8").matchAll(/id="([^"]+)"/g)]
  .map((match) => match[1]);

for (const id of requiredIds) {
  elements.set(id, new MockElement(id));
}

elements.get("levelUpScreen").classList.add("hidden");
elements.get("gameOverScreen").classList.add("hidden");
elements.get("rerollButton").classList.add("hidden");

const context = {
  console,
  document: {
    getElementById(id) {
      return elements.get(id);
    },
    createElement() {
      return new MockElement();
    },
  },
  window: {
    innerWidth: 960,
    innerHeight: 540,
    devicePixelRatio: 1,
    addEventListener() {},
    localStorage: {
      storage: {},
      getItem(key) {
        return this.storage[key] ?? null;
      },
      setItem(key, value) {
        this.storage[key] = String(value);
      },
    },
  },
  performance: {
    now() {
      return 0;
    },
  },
  requestAnimationFrame(callback) {
    context.__nextFrame = callback;
    return 1;
  },
  cancelAnimationFrame() {},
};

vm.createContext(context);
vm.runInContext(fs.readFileSync("game.js", "utf8"), context);

context.addExperience(25);

const levelUpScreen = elements.get("levelUpScreen");
const upgradeChoices = elements.get("upgradeChoices");

if (levelUpScreen.classList.contains("hidden")) {
  throw new Error("Level-up screen did not open.");
}

if (upgradeChoices.children.length !== 3) {
  throw new Error(`Expected 3 augment cards, got ${upgradeChoices.children.length}.`);
}

const firstCard = upgradeChoices.children[0];

if (!firstCard.className.includes("augment-card")) {
  throw new Error("Augment card class was not applied.");
}

if (!firstCard.innerHTML.includes("augment-type")) {
  throw new Error("Card type label was not rendered.");
}

if (!firstCard.innerHTML.includes("효과:")) {
  throw new Error("Card effect text was not rendered.");
}

firstCard.listeners.click[0]();

if (!levelUpScreen.classList.contains("hidden")) {
  throw new Error("Level-up screen did not close after choosing a card.");
}

const extraChecks = `
  resetGame();
  gameState.elapsedTime = 59.9;
  updateGame(0.2);
  if (bosses.length !== 1 || bosses[0].bossType !== "mini") {
    throw new Error("Mini boss did not spawn at 01:00.");
  }

  resetGame();
  gameState.elapsedTime = 179.9;
  updateGame(0.2);
  if (bosses.length !== 1 || bosses[0].bossType !== "mid") {
    throw new Error("Mid boss did not spawn at 03:00.");
  }

  resetGame();
  gameState.elapsedTime = 299.9;
  updateGame(0.2);
  if (bosses.length !== 1 || bosses[0].bossType !== "big") {
    throw new Error("Big boss did not spawn at 05:00.");
  }

  resetGame();
  gameState.supplyTimer = 44.9;
  updateGame(0.2);
  if (supplyBoxes.length !== 1) {
    throw new Error("Supply box did not spawn after 45 seconds.");
  }

  damagePlayer(999, false);
  if (!document.getElementById("resultStats").innerHTML.includes("생존 시간")) {
    throw new Error("Result stats were not rendered on game over.");
  }

  resetGame();
  handleJoystickStart({
    preventDefault() {},
    touches: [{ clientX: 920, clientY: 426 }],
  });
  if (!joystickActive || joystickDeltaX <= 0) {
    throw new Error("Joystick touch did not activate movement input.");
  }
  handleJoystickEnd({ preventDefault() {} });
  if (joystickActive || joystickDeltaX !== 0 || joystickDeltaY !== 0) {
    throw new Error("Joystick did not reset after touch end.");
  }
`;

vm.runInContext(extraChecks, context);

console.log("runtime smoke test passed");
