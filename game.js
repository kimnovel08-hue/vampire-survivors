const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameShell = document.querySelector ? document.querySelector(".game-shell") : null;
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const soundStartButton = document.getElementById("soundStartButton");
const soundHudButton = document.getElementById("soundHudButton");
const pauseButton = document.getElementById("pauseButton");
const pauseScreen = document.getElementById("pauseScreen");
const resumeButton = document.getElementById("resumeButton");
const pausePermanentButton = document.getElementById("pausePermanentButton");
const pauseSynergyButton = document.getElementById("pauseSynergyButton");
const pauseSoundButton = document.getElementById("pauseSoundButton");
const pauseMainMenuButton = document.getElementById("pauseMainMenuButton");
const difficultyNormalButton = document.getElementById("difficultyNormalButton");
const difficultyHardButton = document.getElementById("difficultyHardButton");
const difficultyHellButton = document.getElementById("difficultyHellButton");
const difficultyMessage = document.getElementById("difficultyMessage");
const hpValue = document.getElementById("hpValue");
const levelValue = document.getElementById("levelValue");
const expValue = document.getElementById("expValue");
const scoreValue = document.getElementById("scoreValue");
const timeValue = document.getElementById("timeValue");
const levelUpScreen = document.getElementById("levelUpScreen");
const upgradeChoices = document.getElementById("upgradeChoices");
const rerollButton = document.getElementById("rerollButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const resultStats = document.getElementById("resultStats");
const restartButton = document.getElementById("restartButton");
const clearScreen = document.getElementById("clearScreen");
const clearTitle = document.getElementById("clearTitle");
const clearMessage = document.getElementById("clearMessage");
const clearStats = document.getElementById("clearStats");
const hellClearCodeBox = document.getElementById("hellClearCodeBox");
const hellClearCodeValue = document.getElementById("hellClearCodeValue");
const copyClearCodeButton = document.getElementById("copyClearCodeButton");
const copyClearCodeMessage = document.getElementById("copyClearCodeMessage");
const clearRestartButton = document.getElementById("clearRestartButton");
const clearPermanentButton = document.getElementById("clearPermanentButton");
const clearSynergyButton = document.getElementById("clearSynergyButton");
const clearMainMenuButton = document.getElementById("clearMainMenuButton");
const joystick = document.getElementById("joystick");
const joystickKnob = document.getElementById("joystickKnob");
const startSoulValue = document.getElementById("startSoulValue");
const startSoulCtaValue = document.getElementById("startSoulCtaValue");
const startPermanentBadge = document.getElementById("startPermanentBadge");
const openPermanentButton = document.getElementById("openPermanentButton");
const openPermanentGameOverButton = document.getElementById("openPermanentGameOverButton");
const mainMenuButton = document.getElementById("mainMenuButton");
const permanentUpgradeScreen = document.getElementById("permanentUpgradeScreen");
const permanentSoulValue = document.getElementById("permanentSoulValue");
const permanentUpgradeList = document.getElementById("permanentUpgradeList");
const permanentMessage = document.getElementById("permanentMessage");
const closePermanentButton = document.getElementById("closePermanentButton");
const newRunPermanentButton = document.getElementById("newRunPermanentButton");
const resetSaveButton = document.getElementById("resetSaveButton");
const permanentGuideScreen = document.getElementById("permanentGuideScreen");
const guidePermanentButton = document.getElementById("guidePermanentButton");
const guideLaterButton = document.getElementById("guideLaterButton");
const openSynergyCollectionButton = document.getElementById("openSynergyCollectionButton");
const synergyPopupScreen = document.getElementById("synergyPopupScreen");
const synergyPopupName = document.getElementById("synergyPopupName");
const synergyPopupCondition = document.getElementById("synergyPopupCondition");
const synergyPopupDescription = document.getElementById("synergyPopupDescription");
const closeSynergyPopupButton = document.getElementById("closeSynergyPopupButton");
const synergyCollectionScreen = document.getElementById("synergyCollectionScreen");
const synergyCollectionList = document.getElementById("synergyCollectionList");
const closeSynergyCollectionButton = document.getElementById("closeSynergyCollectionButton");

// ===== 설정/상수 =====
const keys = new Set();
const TAU = Math.PI * 2;
const RECORD_KEY = "neon-survivor-records-v2";
const SOUND_KEY = "neon-survivor-sound-enabled";
const SAVE_KEY = "survivorGameSave_v1";
const joystickMaxDistance = 46;
const SYNERGY_COLLECTION_SIZE = 20;
// 배포 기본값은 false다. true로 바꾸면 10분 대신 30초에 메인보스가 나와 테스트가 쉬워진다.
const DEBUG_FAST_FINAL_BOSS = false;
const FINAL_BOSS_TIME = DEBUG_FAST_FINAL_BOSS ? 30 : 600;

const difficultyConfigs = {
  normal: {
    label: "노멀",
    enemyHpMultiplier: 1,
    enemySpeedMultiplier: 1,
    spawnRateMultiplier: 1,
    maxEnemyMultiplier: 1,
    bossHpMultiplier: 1,
    bossDamageMultiplier: 1,
    soulMultiplier: 1,
    fastWeightMultiplier: 1,
    tankWeightMultiplier: 1,
    eliteWeightMultiplier: 1,
    finalBossLabel: "메인보스",
    finalBossColor: "#ffd447",
    finalBossGlow: "rgba(255, 212, 71, 0.36)",
  },
  hard: {
    label: "어려움",
    enemyHpMultiplier: 1.25,
    enemySpeedMultiplier: 1.1,
    spawnRateMultiplier: 1.15,
    maxEnemyMultiplier: 1.15,
    bossHpMultiplier: 1.3,
    bossDamageMultiplier: 1.1,
    soulMultiplier: 1.2,
    fastWeightMultiplier: 1.08,
    tankWeightMultiplier: 1.16,
    eliteWeightMultiplier: 1.18,
    finalBossLabel: "강화 메인보스",
    finalBossColor: "#b46cff",
    finalBossGlow: "rgba(180, 108, 255, 0.42)",
  },
  hell: {
    label: "헬",
    enemyHpMultiplier: 1.6,
    enemySpeedMultiplier: 1.18,
    spawnRateMultiplier: 1.3,
    maxEnemyMultiplier: 1.35,
    bossHpMultiplier: 1.8,
    bossDamageMultiplier: 1.2,
    soulMultiplier: 1.5,
    fastWeightMultiplier: 1.24,
    tankWeightMultiplier: 1.38,
    eliteWeightMultiplier: 1.65,
    finalBossLabel: "지옥의 메인보스",
    finalBossColor: "#ff5d73",
    finalBossGlow: "rgba(255, 93, 115, 0.5)",
  },
};

const finalBossBase = {
  radius: 78,
  hp: 3200,
  speed: 27,
  damage: 38,
  score: 3000,
  exp: 48,
  expOrbs: 18,
  supplyDrops: 3,
  shockwaveDelay: 5.6,
  shockwaveRadius: 190,
  shockwaveDamage: 18,
};

const assetPaths = {
  player: "assets/player.jpg",
  enemy: "assets/enemy.jpg",
  miniboss: "assets/miniboss.jpg",
  midboss: "assets/midboss.jpg",
  bigboss: "assets/bigboss.jpg",
};
const loadedImages = {};

// ===== 실행 중 상태 =====
let hasStartedGame = false;
let soundEnabled = loadSoundPreference();
let audioContext = null;
let masterGain = null;
let bgmTimer = null;
let bgmStep = 0;
let lastSoundTimes = {};
let joystickActive = false;
let joystickStartX = 0;
let joystickStartY = 0;
let joystickDeltaX = 0;
let joystickDeltaY = 0;
let permanentMenuReadOnly = false;

const playerStart = {
  radius: 16,
  speed: 250,
  maxHp: 110,
  magnetRadius: 104,
};

const desktopBalance = {
  entityScale: 1,
  playerScale: 1,
  enemyScale: 1,
  miniBossScale: 1,
  midBossScale: 1,
  bigBossScale: 1,
  playerSpeedMultiplier: 1,
  joystickDeadzone: 0,
};

const mobileBalance = {
  entityScale: 0.7,
  playerScale: 0.7,
  enemyScale: 0.7,
  miniBossScale: 0.8,
  midBossScale: 0.8,
  bigBossScale: 0.8,
  playerSpeedMultiplier: 0.7,
  joystickDeadzone: 0.08,
  minPlayerRadius: 10,
  minEnemyRadius: 9,
  minBossRadius: 24,
};

const permanentUpgradeDefinitions = {
  maxHp: {
    name: "생명력 강화",
    maxLevel: 10,
    baseCost: 20,
    costGrowth: 12,
    costCurve: 3,
    description: "시작 최대 체력이 증가합니다.",
    currentText(level) {
      return `시작 최대 체력 +${level * 10}`;
    },
    nextText() {
      return "다음 레벨: 최대 체력 +10 추가";
    },
  },
  attackPower: {
    name: "공격력 강화",
    maxLevel: 10,
    baseCost: 28,
    costGrowth: 15,
    costCurve: 4,
    description: "모든 기본 공격 피해가 조금 증가합니다.",
    currentText(level) {
      return `공격력 +${level * 5}%`;
    },
    nextText() {
      return "다음 레벨: 공격력 +5% 추가";
    },
  },
  moveSpeed: {
    name: "민첩성 강화",
    maxLevel: 8,
    baseCost: 24,
    costGrowth: 13,
    costCurve: 3,
    description: "시작 이동 속도가 증가합니다.",
    currentText(level) {
      return `이동 속도 +${level * 3}%`;
    },
    nextText() {
      return "다음 레벨: 이동 속도 +3% 추가";
    },
  },
  expGain: {
    name: "빠른 성장",
    maxLevel: 8,
    baseCost: 22,
    costGrowth: 12,
    costCurve: 3,
    description: "경험치 획득량이 증가합니다.",
    currentText(level) {
      return `EXP 획득량 +${level * 4}%`;
    },
    nextText() {
      return "다음 레벨: EXP 획득량 +4% 추가";
    },
  },
  magnetRange: {
    name: "자석 감각",
    maxLevel: 8,
    baseCost: 22,
    costGrowth: 12,
    costCurve: 3,
    description: "경험치 구슬을 끌어오는 범위가 증가합니다.",
    currentText(level) {
      return `자석 범위 +${level * 5}%`;
    },
    nextText() {
      return "다음 레벨: 자석 범위 +5% 추가";
    },
  },
  startShield: {
    name: "시작 보호막",
    maxLevel: 3,
    baseCost: 42,
    costGrowth: 24,
    costCurve: 10,
    description: "게임 시작 시 피해를 막는 보호막을 얻습니다.",
    currentText(level) {
      if (level <= 0) return "시작 보호막 없음";
      if (level === 1) return "시작 보호막 1회";
      if (level === 2) return "시작 보호막 1회, 재생 시간 감소";
      return "시작 보호막 2회, 재생 시간 감소";
    },
    nextText(level) {
      if (level <= 0) return "다음 레벨: 시작 보호막 1회";
      if (level === 1) return "다음 레벨: 보호막 재생 시간 감소";
      return "다음 레벨: 시작 보호막 2회";
    },
  },
  weaponMastery: {
    name: "무기 숙련",
    maxLevel: 5,
    baseCost: 34,
    costGrowth: 18,
    costCurve: 7,
    description: "기본 무기의 피해와 공격 속도가 조금 좋아집니다.",
    currentText(level) {
      return `탄환 피해 +${level * 4}%, 공격 속도 소폭 증가`;
    },
    nextText() {
      return "다음 레벨: 탄환 피해 +4%, 공격 속도 추가 증가";
    },
  },
  luck: {
    name: "행운",
    maxLevel: 5,
    baseCost: 40,
    costGrowth: 22,
    costCurve: 8,
    description: "희귀 이상 증강이 나올 확률이 아주 조금 증가합니다.",
    currentText(level) {
      return `희귀 이상 확률 +${(level * 1.1).toFixed(1)}%p`;
    },
    nextText() {
      return "다음 레벨: 희귀 이상 확률 소폭 증가";
    },
  },
};

const rarityInfo = {
  common: { label: "일반", chance: 0.55 },
  rare: { label: "희귀", chance: 0.28 },
  epic: { label: "영웅", chance: 0.13 },
  legendary: { label: "전설", chance: 0.04 },
};

const synergyDefinitions = {
  bloodCounter: {
    id: "bloodCounter",
    name: "피의 반격",
    hiddenName: "???",
    conditionText: "체력 증가 계열 + 흡혈",
    description: "피해를 받을 때마다 피의 힘으로 주변 적에게 반격 피해를 줍니다.",
    condition() {
      return hasAnyUpgrade(["sturdy-body"]) && hasUpgrade("vampire");
    },
  },
  rapidPierce: {
    id: "rapidPierce",
    name: "고속 관통",
    hiddenName: "???",
    conditionText: "관통탄 + 공격 속도 증가 계열",
    description: "관통탄의 흐름이 빨라져 주기적으로 공격속도가 크게 증가합니다.",
    condition() {
      return hasUpgrade("piercing-shot") && hasAnyUpgrade(["quick-hands", "infinite-barrage"]);
    },
  },
  rupturePierce: {
    id: "rupturePierce",
    name: "파열 관통탄",
    hiddenName: "???",
    conditionText: "관통탄 + 폭발탄",
    description: "관통탄이 마지막 지점에서 파열되어 작은 폭발을 일으킵니다.",
    condition() {
      return hasUpgrade("piercing-shot") && hasUpgrade("explosive-bullets");
    },
  },
  chainPierce: {
    id: "chainPierce",
    name: "연쇄 관통",
    hiddenName: "???",
    conditionText: "관통탄 + 번개 연쇄",
    description: "관통된 적들 사이로 번개가 더 멀리 퍼져나갑니다.",
    condition() {
      return hasUpgrade("piercing-shot") && hasUpgrade("chain-lightning");
    },
  },
  shrapnelBomb: {
    id: "shrapnelBomb",
    name: "파편 폭탄",
    hiddenName: "???",
    conditionText: "폭탄 강화 + 폭탄 주머니",
    description: "폭탄이 터진 뒤 작은 파편 폭탄들이 흩어져 추가 폭발을 일으킵니다.",
    condition() {
      return weapons?.bomb?.unlocked && hasUpgrade("bomb-pocket");
    },
  },
  flameBomb: {
    id: "flameBomb",
    name: "화염 폭탄",
    hiddenName: "???",
    conditionText: "폭탄 강화 + 화염 폭발",
    description: "폭탄이 터진 자리에 불길이 남아 적을 계속 불태웁니다.",
    condition() {
      return weapons?.bomb?.unlocked && hasUpgrade("flame-burst");
    },
  },
  frostAura: {
    id: "frostAura",
    name: "빙결 오라",
    hiddenName: "???",
    conditionText: "냉기 오라 + 수호 오라",
    description: "차가운 수호 오라가 적을 느리게 만들고, 오래 머문 적을 잠시 얼립니다.",
    condition() {
      return hasUpgrade("cold-aura") && hasUpgrade("guardian-aura");
    },
  },
  knowledgeSurge: {
    id: "knowledgeSurge",
    name: "지식 폭주",
    hiddenName: "???",
    conditionText: "경험치 증가 계열 + 자석",
    description: "지식을 빠르게 흡수할수록 잠시 동안 공격력이 폭주합니다.",
    condition() {
      return hasAnyUpgrade(["fast-learning"]) && hasUpgrade("magnet");
    },
  },
};

const enemyTypes = {
  normal: {
    name: "normal",
    radius: 17,
    hp: 3,
    speed: 97,
    damage: 14,
    score: 10,
    exp: 7,
    fill: "#f0525f",
    stroke: "#ff9aa5",
  },
  fast: {
    name: "fast",
    radius: 13,
    hp: 2,
    speed: 167,
    damage: 10,
    score: 12,
    exp: 8,
    fill: "#ff7043",
    stroke: "#ffb199",
  },
  tank: {
    name: "tank",
    radius: 24,
    hp: 9,
    speed: 63,
    damage: 22,
    score: 26,
    exp: 18,
    fill: "#b73345",
    stroke: "#ff6b81",
  },
  elite: {
    name: "elite",
    radius: 20,
    hp: 8,
    speed: 136,
    damage: 20,
    score: 38,
    exp: 22,
    fill: "#d948ff",
    stroke: "#f2b6ff",
  },
};

const bossTypes = {
  mini: {
    label: "미니보스",
    warning: "미니보스 등장!",
    radius: 34,
    hp: 95,
    speed: 46,
    damage: 22,
    score: 150,
    exp: 14,
    expOrbs: 5,
    supplyDrops: 0,
    fill: "#ff8c42",
    stroke: "#ffd0a6",
  },
  mid: {
    label: "중간보스",
    warning: "중간보스 등장!",
    radius: 45,
    hp: 240,
    speed: 38,
    damage: 26,
    score: 420,
    exp: 20,
    expOrbs: 8,
    supplyDrops: 1,
    summonDelay: 6,
    fill: "#b46cff",
    stroke: "#ead5ff",
  },
  big: {
    label: "빅보스",
    warning: "빅보스 등장!",
    radius: 58,
    hp: 567,
    speed: 31,
    damage: 32,
    score: 980,
    exp: 32,
    expOrbs: 12,
    supplyDrops: 2,
    shockwaveDelay: 7,
    fill: "#ffd447",
    stroke: "#fff2a8",
  },
};

let player;
let gameState;
let weapons;
let weaponStats;
let bullets;
let orbitOrbs;
let bombs;
let enemies;
let bosses;
let expOrbs;
let supplyBoxes;
let flameZones;
let meteors;
let clones;
let floatingTexts;
let effects;
let lightningLines;
let lastTime;
let animationFrameId;
let resizeFrameId = null;
let nextEnemyId;
let nextBossId;
let permanentSave = loadPermanentSave();
let selectedDifficulty = "normal";

const upgrades = [
  {
    id: "weapon-bullet",
    name: "자동 탄환 강화",
    rarity: "common",
    type: "무기 강화",
    description: "가장 가까운 적에게 발사되는 기본 무기의 레벨을 올립니다.",
    effectText: "피해 증가, 공격 속도 증가, 3레벨마다 관통 +1",
    isAvailable() {
      return weapons.bullet.level < weapons.bullet.maxLevel;
    },
    apply() {
      upgradeWeapon("bullet");
    },
  },
  {
    id: "weapon-orbit",
    name: "회전 구체 강화",
    rarity: "common",
    type: "무기 강화",
    description: "플레이어 주변을 도는 구체 무기의 레벨을 올립니다.",
    effectText: "구체 개수, 회전 속도, 피해, 반경 증가",
    isAvailable() {
      return weapons.orbit.level < weapons.orbit.maxLevel;
    },
    apply() {
      upgradeWeapon("orbit");
    },
  },
  {
    id: "weapon-bomb",
    name: "폭탄 강화",
    rarity: "rare",
    type: "무기 강화",
    description: "가까운 적 위치에 폭탄을 던지는 무기의 레벨을 올립니다.",
    effectText: "처음 선택하면 폭탄 해금, 이후 범위/피해/쿨타임/개수 강화",
    isAvailable() {
      return weapons.bomb.level < weapons.bomb.maxLevel;
    },
    apply() {
      upgradeWeapon("bomb");
    },
  },
  {
    id: "sharp-bullets",
    name: "날카로운 탄환",
    rarity: "common",
    type: "증강",
    description: "모든 무기의 기본 공격력이 조금 증가합니다.",
    effectText: "공격력 +10%",
    apply() {
      weapons.globalDamageMultiplier *= 1.1;
    },
  },
  {
    id: "quick-hands",
    name: "빠른 손놀림",
    rarity: "common",
    type: "증강",
    description: "자동 탄환을 더 자주 발사합니다.",
    effectText: "공격 속도 +10%",
    apply() {
      weapons.bullet.fireDelay = Math.max(0.08, weapons.bullet.fireDelay / 1.1);
    },
  },
  {
    id: "light-steps",
    name: "가벼운 발걸음",
    rarity: "common",
    type: "증강",
    description: "플레이어 이동 속도가 증가합니다.",
    effectText: "이동 속도 +10%",
    apply() {
      player.runSpeedMultiplier = (player.runSpeedMultiplier ?? 1) * 1.1;
      refreshPlayerSpeed();
    },
  },
  {
    id: "sturdy-body",
    name: "튼튼한 몸",
    rarity: "common",
    type: "증강",
    description: "최대 체력이 늘어나고 즉시 조금 회복합니다.",
    effectText: "최대 체력 +15, 현재 체력 +15",
    apply() {
      player.maxHp += 15;
      player.hp = Math.min(player.maxHp, player.hp + 15);
    },
  },
  {
    id: "fast-learning",
    name: "빠른 학습",
    rarity: "common",
    type: "증강",
    description: "경험치 구슬을 먹을 때 얻는 EXP가 증가합니다.",
    effectText: "EXP 획득량 +10%",
    apply() {
      gameState.expGainMultiplier *= 1.1;
    },
  },
  {
    id: "bomb-pocket",
    name: "폭탄 주머니",
    rarity: "rare",
    type: "증강",
    maxStacks: 2,
    description: "폭탄 무기가 해금된 뒤 폭탄 시너지를 강화합니다.",
    effectText: "파편 폭탄 시너지의 파편 수 증가",
    isAvailable() {
      return weapons.bomb.unlocked;
    },
    apply() {
      gameState.bombPocket.stacks = Math.min(2, (gameState.upgradeCounts["bomb-pocket"] ?? 0) + 1);
    },
  },
  {
    id: "piercing-shot",
    name: "관통탄",
    rarity: "rare",
    type: "증강",
    description: "총알이 적을 맞힌 뒤에도 한 번 더 지나갈 수 있습니다.",
    effectText: "총알 관통 수 +1",
    apply() {
      weapons.bullet.pierce += 1;
    },
  },
  {
    id: "magnet",
    name: "자석",
    rarity: "rare",
    type: "증강",
    description: "주변 경험치 구슬을 끌어오는 범위가 넓어집니다.",
    effectText: "경험치 획득 범위 +30%",
    apply() {
      player.magnetRadius *= 1.3;
    },
  },
  {
    id: "vampire",
    name: "흡혈",
    rarity: "rare",
    type: "증강",
    description: "적을 처치할 때 낮은 확률로 체력을 회복합니다.",
    effectText: "적 처치 시 10% 확률로 체력 1 회복",
    apply() {
      gameState.killHealChance += 0.1;
    },
  },
  {
    id: "shield",
    name: "보호막",
    rarity: "rare",
    type: "증강",
    maxStacks: 1,
    description: "일정 시간마다 피해를 한 번 막아주는 보호막을 얻습니다.",
    effectText: "30초마다 피해 1회 방어",
    apply() {
      gameState.shield.enabled = true;
      gameState.shield.ready = true;
      gameState.shield.timer = 0;
    },
  },
  {
    id: "weak-spot",
    name: "약점 포착",
    rarity: "rare",
    type: "증강",
    maxStacks: 1,
    description: "약해진 적을 정확히 노려 마무리 피해를 높입니다.",
    effectText: "체력 40% 이하 적에게 피해 +35%",
    apply() {
      gameState.weakSpotEnabled = true;
    },
  },
  {
    id: "shockwave",
    name: "충격파",
    rarity: "rare",
    type: "증강",
    maxStacks: 1,
    description: "피격될 때 주변 적을 밀쳐내고 약한 피해를 줍니다.",
    effectText: "피격 시 주변 적 밀쳐냄 + 피해, 쿨타임 8초",
    apply() {
      gameState.onHitShockwave.enabled = true;
    },
  },
  {
    id: "cold-aura",
    name: "냉기 오라",
    rarity: "rare",
    type: "증강",
    maxStacks: 1,
    description: "플레이어 주변 적들이 조금 느려집니다.",
    effectText: "주변 적 이동 속도 15% 감소",
    apply() {
      gameState.coldAura.enabled = true;
    },
  },
  {
    id: "double-shot",
    name: "더블 샷",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "자동 탄환이 두 갈래로 발사되지만 탄환 하나의 위력은 줄어듭니다.",
    effectText: "한 번에 총알 2발 발사, 총알 피해 -10%",
    apply() {
      weapons.bullet.shots = Math.max(weapons.bullet.shots, 2);
      weapons.bullet.spread = Math.max(weapons.bullet.spread, 0.18);
      weapons.bullet.damageMultiplier *= 0.9;
    },
  },
  {
    id: "explosive-bullets",
    name: "폭발탄",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "총알이 적중할 때 주변에 작은 폭발 피해를 줍니다.",
    effectText: "총알 적중 시 작은 범위 피해",
    apply() {
      weapons.bullet.explosion.enabled = true;
    },
  },
  {
    id: "flame-burst",
    name: "화염 폭발",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "적을 처치하면 확률적으로 잠시 불길 장판이 남습니다.",
    effectText: "적 처치 시 20% 확률로 불길 장판 생성",
    apply() {
      gameState.flameBurst.enabled = true;
    },
  },
  {
    id: "chain-lightning",
    name: "번개 연쇄",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "총알 적중 시 근처 적들에게 번개가 튑니다.",
    effectText: "총알 적중 시 근처 적 3명에게 번개 피해",
    apply() {
      gameState.chainLightning.enabled = true;
    },
  },
  {
    id: "guardian-aura",
    name: "수호 오라",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "플레이어 주변에 지속 피해를 주는 오라가 생깁니다.",
    effectText: "플레이어 주변 적에게 지속 피해",
    apply() {
      gameState.aura.enabled = true;
    },
  },
  {
    id: "force-push",
    name: "강제 밀쳐내기",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "주변에 적이 너무 많아지면 자동으로 충격파를 발생시킵니다.",
    effectText: "주변 적 10마리 이상이면 충격파 발생, 쿨타임 12초",
    apply() {
      gameState.forcePush.enabled = true;
    },
  },
  {
    id: "blood-pact",
    name: "피의 계약",
    rarity: "epic",
    type: "증강",
    maxStacks: 1,
    description: "생명력을 대가로 강력한 공격력을 얻습니다.",
    effectText: "최대 체력 -30, 공격력 +60%",
    apply() {
      player.maxHp = Math.max(1, player.maxHp - 30);
      player.hp = Math.min(player.hp, player.maxHp);
      weapons.globalDamageMultiplier *= 1.6;
    },
  },
  {
    id: "reroll",
    name: "재선택",
    rarity: "epic",
    type: "증강",
    description: "다음 증강 선택 화면에서 선택지를 한 번 다시 뽑을 수 있습니다.",
    effectText: "증강 선택지를 한 번 다시 뽑을 수 있음",
    apply() {
      gameState.rerolls += 1;
    },
  },
  {
    id: "meteor",
    name: "메테오",
    rarity: "legendary",
    type: "증강",
    maxStacks: 1,
    description: "하늘에서 큰 운석이 떨어져 넓은 지역에 피해를 줍니다.",
    effectText: "8초마다 무작위 위치에 큰 운석 낙하",
    apply() {
      gameState.meteor.enabled = true;
      gameState.meteor.timer = 2;
    },
  },
  {
    id: "infinite-barrage",
    name: "무한 탄막",
    rarity: "legendary",
    type: "증강",
    maxStacks: 1,
    description: "압도적인 속도로 총알을 쏟아내지만 탄환 하나의 위력은 낮아집니다.",
    effectText: "공격 속도 +80%, 총알 피해 -35%",
    apply() {
      weapons.bullet.fireDelay = Math.max(0.05, weapons.bullet.fireDelay / 1.8);
      weapons.bullet.damageMultiplier *= 0.65;
    },
  },
  {
    id: "clone",
    name: "분신",
    rarity: "legendary",
    type: "증강",
    maxStacks: 1,
    description: "플레이어 주변을 도는 분신이 보조 사격을 합니다.",
    effectText: "플레이어 주변에 보조 공격 분신 생성",
    apply() {
      clones.push({
        angle: 0,
        orbitRadius: 54,
        orbitSpeed: 1.5,
        x: player.x,
        y: player.y,
        fireTimer: 0,
        fireDelay: 0.78,
        damageMultiplier: 0.7,
      });
    },
  },
  {
    id: "time-stop",
    name: "시간 정지",
    rarity: "legendary",
    type: "증강",
    maxStacks: 1,
    description: "주기적으로 적들의 움직임을 크게 늦춥니다.",
    effectText: "25초마다 2초간 적 둔화",
    apply() {
      gameState.timeSlow.enabled = true;
      gameState.timeSlow.timer = 3;
    },
  },
  {
    id: "devils-deal",
    name: "악마의 거래",
    rarity: "legendary",
    type: "증강",
    maxStacks: 1,
    description: "생존력을 크게 잃는 대신 엄청난 공격력을 얻습니다.",
    effectText: "공격력 +120%, 최대 체력 절반 감소",
    apply() {
      player.maxHp = Math.max(1, Math.floor(player.maxHp * 0.5));
      player.hp = Math.min(player.hp, player.maxHp);
      weapons.globalDamageMultiplier *= 2.2;
    },
  },
];

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(window.innerWidth * pixelRatio);
  canvas.height = Math.floor(window.innerHeight * pixelRatio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  // 고해상도 화면에서도 좌표 계산은 CSS 픽셀 기준으로 유지한다.
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function handleResize() {
  if (resizeFrameId !== null) {
    cancelAnimationFrame(resizeFrameId);
  }

  resizeFrameId = requestAnimationFrame(() => {
    resizeFrameId = null;
    resizeCanvas();
    applyResponsiveEntityScales();
  });
}

function resetGame(startImmediately = hasStartedGame) {
  const records = loadRecords();
  ensureSelectedDifficultyUnlocked();

  player = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: getScaledRadius(playerStart.radius, "player"),
    baseRadius: playerStart.radius,
    baseSpeed: playerStart.speed,
    permanentSpeedMultiplier: 1,
    runSpeedMultiplier: 1,
    speed: playerStart.speed,
    maxHp: playerStart.maxHp,
    hp: playerStart.maxHp,
    magnetRadius: playerStart.magnetRadius,
  };

  gameState = {
    score: 0,
    kills: 0,
    bossKills: 0,
    bossKillCounts: {
      mini: 0,
      mid: 0,
      big: 0,
      final: 0,
    },
    level: 1,
    exp: 0,
    expToNext: 20,
    elapsedTime: 0,
    enemySpawnTimer: 0,
    supplyTimer: 0,
    isGameOver: false,
    isGameCleared: false,
    isPaused: false,
    pauseReason: null,
    isLevelingUp: false,
    isChoosingUpgrade: false,
    isStarted: startImmediately,
    selectedDifficulty,
    finalBossSpawned: false,
    finalBossDefeated: false,
    clearCode: "",
    clearUnlockMessage: "",
    currentUpgrades: [],
    earnedSoul: 0,
    soulAwarded: false,
    upgradeCounts: {},
    selectedUpgradeCount: 0,
    selectedLegendaryCount: 0,
    activeSynergies: new Set(),
    pendingSynergyPopups: [],
    isSynergyPopupOpen: false,
    spawnedBossMinutes: new Set(),
    expGainMultiplier: 1,
    killHealChance: 0,
    weakSpotEnabled: false,
    rerolls: 0,
    attackBuffTimer: 0,
    speedBuffTimer: 0,
    magnetBoostTimer: 0,
    screenShakeTimer: 0,
    screenShakeDuration: 0,
    screenShakeStrength: 0,
    hitStopTimer: 0,
    hitStopCooldown: 0,
    bombPocket: {
      stacks: 0,
    },
    synergy: {
      bloodCounterCooldown: 0,
      rapidPierceCooldown: 10,
      rapidPierceActiveTimer: 0,
      knowledgeOrbCount: 0,
      knowledgeCooldown: 0,
      knowledgeBuffTimer: 0,
    },
    bestScore: records.bestScore,
    bestTime: records.bestTime,
    weaponDamage: {},
    shield: {
      enabled: false,
      ready: false,
      cooldown: 30,
      timer: 0,
      charges: 0,
      maxCharges: 1,
    },
    onHitShockwave: {
      enabled: false,
      cooldown: 8,
      timer: 0,
      radius: 110,
      damage: 1.5,
      force: 48,
    },
    forcePush: {
      enabled: false,
      cooldown: 12,
      timer: 0,
      radius: 150,
      damage: 1.2,
      force: 58,
      triggerCount: 10,
    },
    coldAura: {
      enabled: false,
      radius: 128,
      slow: 0.15,
    },
    flameBurst: {
      enabled: false,
      chance: 0.2,
      radius: 64,
      duration: 3.2,
      damagePerSecond: 1.15,
    },
    chainLightning: {
      enabled: false,
      maxTargets: 3,
      range: 120,
      damageRatio: 0.5,
    },
    aura: {
      enabled: false,
      radius: 95,
      damagePerSecond: 1.7,
    },
    meteor: {
      enabled: false,
      timer: 0,
      interval: 8,
      warningTime: 0.9,
      radius: 98,
      damage: 7.5,
    },
    timeSlow: {
      enabled: false,
      timer: 0,
      cooldown: 25,
      activeTimer: 0,
      duration: 2,
      multiplier: 0.2,
    },
  };

  weapons = {
    globalDamageMultiplier: 1,
    bullet: {
      level: 1,
      maxLevel: 8,
      timer: 0,
      fireDelay: 0.42,
      speed: 520,
      baseDamage: 1,
      damageMultiplier: 1,
      shots: 1,
      spread: 0,
      pierce: 0,
      explosion: {
        enabled: false,
        radius: 54,
        damageRatio: 0.45,
      },
    },
    orbit: {
      level: 1,
      maxLevel: 8,
      spawnTimer: 4.6,
      spawnDelay: 4.6,
      maxOrbs: 1,
      duration: 6,
      damage: 1,
      radius: 8,
      orbitRadius: 62,
      angularSpeed: 2.8,
    },
    bomb: {
      level: 0,
      maxLevel: 7,
      unlocked: false,
      timer: 0,
      cooldown: 10,
      count: 1,
      radius: 66,
      damage: 3.1,
      fuseTime: 0.55,
    },
  };
  weaponStats = weapons;
  applyPermanentUpgrades();

  bullets = [];
  orbitOrbs = [];
  bombs = [];
  enemies = [];
  bosses = [];
  expOrbs = [];
  supplyBoxes = [];
  flameZones = [];
  meteors = [];
  clones = [];
  floatingTexts = [];
  effects = [];
  lightningLines = [];
  nextEnemyId = 1;
  nextBossId = 1;
  lastTime = performance.now();

  levelUpScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  clearScreen?.classList.add("hidden");
  pauseScreen?.classList.add("hidden");
  permanentGuideScreen?.classList.add("hidden");
  permanentUpgradeScreen?.classList.add("hidden");
  synergyPopupScreen?.classList.add("hidden");
  synergyCollectionScreen?.classList.add("hidden");
  startScreen?.classList.toggle("hidden", startImmediately);
  setUiBlocking(!startImmediately);
  updateSoundButtons();
  updatePermanentSummary();
  updatePauseUi();
  updateHud();

  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(gameLoop);

  if (startImmediately) {
    startBgm();
  } else {
    stopBgm();
  }
}

function updateHud() {
  hpValue.textContent = `${Math.max(0, Math.ceil(player.hp))} / ${player.maxHp}`;
  levelValue.textContent = gameState.level;
  expValue.textContent = `${gameState.exp} / ${gameState.expToNext}`;
  scoreValue.textContent = gameState.score;
  timeValue.textContent = gameState.elapsedTime.toFixed(1);
}

function setUiBlocking(isBlocking) {
  gameShell?.classList.toggle("ui-blocking", isBlocking);
}

// ===== 저장 시스템 =====
function createDefaultSynergyUnlocks() {
  const unlockedSynergies = {};

  for (const key of Object.keys(synergyDefinitions)) {
    unlockedSynergies[key] = false;
  }

  return unlockedSynergies;
}

function createDefaultDifficultyUnlocks() {
  return {
    normal: true,
    hard: false,
    hell: false,
  };
}

function createDefaultDifficultyRecords() {
  return {
    normal: {
      cleared: false,
      bestTime: 0,
      bestScore: 0,
      bestKills: 0,
    },
    hard: {
      cleared: false,
      bestTime: 0,
      bestScore: 0,
      bestKills: 0,
    },
    hell: {
      cleared: false,
      bestTime: 0,
      bestScore: 0,
      bestKills: 0,
      lastClearCode: "",
    },
  };
}

function createDefaultPermanentSave() {
  const permanentUpgrades = {};

  for (const key of Object.keys(permanentUpgradeDefinitions)) {
    permanentUpgrades[key] = 0;
  }

  return {
    version: 1,
    soul: 0,
    bestScore: 0,
    bestSurvivalTime: 0,
    permanentUpgrades,
    unlockedSynergies: createDefaultSynergyUnlocks(),
    difficultyUnlocks: createDefaultDifficultyUnlocks(),
    difficultyRecords: createDefaultDifficultyRecords(),
    hasSeenPermanentUpgradeGuide: false,
    totalRuns: 0,
    totalKills: 0,
    totalBossKills: 0,
  };
}

function loadLegacyRecords() {
  try {
    const raw = window.localStorage?.getItem(RECORD_KEY);
    return raw ? JSON.parse(raw) : { bestScore: 0, bestTime: 0 };
  } catch {
    return { bestScore: 0, bestTime: 0 };
  }
}

function migrateSaveData(data) {
  const defaults = createDefaultPermanentSave();
  const source = data && typeof data === "object" ? data : {};
  const upgrades = source.permanentUpgrades && typeof source.permanentUpgrades === "object"
    ? source.permanentUpgrades
    : {};
  const unlockedSynergies = source.unlockedSynergies && typeof source.unlockedSynergies === "object"
    ? source.unlockedSynergies
    : {};
  const difficultyUnlocks = source.difficultyUnlocks && typeof source.difficultyUnlocks === "object"
    ? source.difficultyUnlocks
    : {};
  const difficultyRecords = source.difficultyRecords && typeof source.difficultyRecords === "object"
    ? source.difficultyRecords
    : {};

  for (const [key, definition] of Object.entries(permanentUpgradeDefinitions)) {
    const level = Number(upgrades[key] ?? 0);
    defaults.permanentUpgrades[key] = clamp(Math.floor(Number.isFinite(level) ? level : 0), 0, definition.maxLevel);
  }

  for (const key of Object.keys(synergyDefinitions)) {
    defaults.unlockedSynergies[key] = Boolean(unlockedSynergies[key]);
  }

  for (const key of Object.keys(difficultyConfigs)) {
    defaults.difficultyUnlocks[key] = key === "normal" ? true : Boolean(difficultyUnlocks[key]);

    const sourceRecord = difficultyRecords[key] && typeof difficultyRecords[key] === "object"
      ? difficultyRecords[key]
      : {};
    const targetRecord = defaults.difficultyRecords[key];

    targetRecord.cleared = Boolean(sourceRecord.cleared);
    targetRecord.bestTime = Math.max(0, Number(sourceRecord.bestTime ?? 0) || 0);
    targetRecord.bestScore = Math.max(0, Math.floor(Number(sourceRecord.bestScore ?? 0) || 0));
    targetRecord.bestKills = Math.max(0, Math.floor(Number(sourceRecord.bestKills ?? 0) || 0));

    if (key === "hell") {
      targetRecord.lastClearCode = String(sourceRecord.lastClearCode ?? "");
    }
  }

  defaults.version = 1;
  defaults.soul = Math.max(0, Math.floor(Number(source.soul ?? defaults.soul) || 0));
  defaults.bestScore = Math.max(0, Math.floor(Number(source.bestScore ?? defaults.bestScore) || 0));
  defaults.bestSurvivalTime = Math.max(0, Number(source.bestSurvivalTime ?? defaults.bestSurvivalTime) || 0);
  defaults.totalRuns = Math.max(0, Math.floor(Number(source.totalRuns ?? defaults.totalRuns) || 0));
  defaults.totalKills = Math.max(0, Math.floor(Number(source.totalKills ?? defaults.totalKills) || 0));
  defaults.totalBossKills = Math.max(0, Math.floor(Number(source.totalBossKills ?? defaults.totalBossKills) || 0));
  defaults.hasSeenPermanentUpgradeGuide = Boolean(source.hasSeenPermanentUpgradeGuide);

  return defaults;
}

function loadPermanentSave() {
  const legacyRecords = loadLegacyRecords();

  try {
    const raw = window.localStorage?.getItem(SAVE_KEY);
    const save = migrateSaveData(raw ? JSON.parse(raw) : null);

    save.bestScore = Math.max(save.bestScore, Number(legacyRecords.bestScore ?? 0) || 0);
    save.bestSurvivalTime = Math.max(save.bestSurvivalTime, Number(legacyRecords.bestTime ?? 0) || 0);
    return save;
  } catch {
    const save = createDefaultPermanentSave();
    save.bestScore = Math.max(0, Number(legacyRecords.bestScore ?? 0) || 0);
    save.bestSurvivalTime = Math.max(0, Number(legacyRecords.bestTime ?? 0) || 0);
    return save;
  }
}

function savePermanentSave() {
  try {
    window.localStorage?.setItem(SAVE_KEY, JSON.stringify(permanentSave));
  } catch {
    // 저장이 실패해도 현재 판은 계속 진행한다.
  }
}

function getPermanentLevel(id) {
  return permanentSave.permanentUpgrades[id] ?? 0;
}

function getPermanentUpgradeCost(definition, level) {
  return definition.baseCost + level * definition.costGrowth + level * level * definition.costCurve;
}

function applyPermanentUpgrades() {
  const upgrades = permanentSave.permanentUpgrades;
  const maxHpLevel = upgrades.maxHp ?? 0;
  const attackLevel = upgrades.attackPower ?? 0;
  const moveLevel = upgrades.moveSpeed ?? 0;
  const expLevel = upgrades.expGain ?? 0;
  const magnetLevel = upgrades.magnetRange ?? 0;
  const shieldLevel = upgrades.startShield ?? 0;
  const masteryLevel = upgrades.weaponMastery ?? 0;

  player.maxHp = playerStart.maxHp + maxHpLevel * 10;
  player.hp = player.maxHp;
  player.permanentSpeedMultiplier = Math.min(1 + moveLevel * 0.03, 1.28);
  refreshPlayerSpeed();
  player.magnetRadius = playerStart.magnetRadius * (1 + magnetLevel * 0.05);
  gameState.expGainMultiplier *= 1 + expLevel * 0.04;
  weapons.globalDamageMultiplier *= 1 + attackLevel * 0.05;
  weapons.bullet.baseDamage *= 1 + masteryLevel * 0.04;
  weapons.bullet.fireDelay = Math.max(0.32, weapons.bullet.fireDelay * (1 - masteryLevel * 0.025));

  if (shieldLevel > 0) {
    gameState.shield.enabled = true;
    gameState.shield.ready = true;
    gameState.shield.cooldown = shieldLevel >= 2 ? 24 : 30;
    gameState.shield.maxCharges = shieldLevel >= 3 ? 2 : 1;
    gameState.shield.charges = gameState.shield.maxCharges;
  }
}

function getEffectiveRarityChances() {
  const luckLevel = getPermanentLevel("luck");
  const rare = rarityInfo.rare.chance + luckLevel * 0.006;
  const epic = rarityInfo.epic.chance + luckLevel * 0.0035;
  const legendary = rarityInfo.legendary.chance + luckLevel * 0.0015;
  const common = Math.max(0.35, 1 - rare - epic - legendary);

  return {
    common,
    rare,
    epic,
    legendary,
  };
}

function getCurrentDifficultyConfig() {
  return difficultyConfigs[gameState?.selectedDifficulty || selectedDifficulty] ?? difficultyConfigs.normal;
}

function isDifficultyUnlocked(difficultyKey) {
  return Boolean(permanentSave.difficultyUnlocks?.[difficultyKey]);
}

function ensureSelectedDifficultyUnlocked() {
  if (!isDifficultyUnlocked(selectedDifficulty)) {
    selectedDifficulty = "normal";
  }
}

function getDifficultyLockMessage(difficultyKey) {
  if (difficultyKey === "hard") {
    return "노멀 모드를 클리어하면 어려움이 해금됩니다.";
  }

  if (difficultyKey === "hell") {
    return "어려움 모드를 클리어하면 헬모드가 해금됩니다.";
  }

  return "";
}

function selectDifficulty(difficultyKey) {
  if (!difficultyConfigs[difficultyKey]) {
    return;
  }

  if (!isDifficultyUnlocked(difficultyKey)) {
    if (difficultyMessage) {
      difficultyMessage.textContent = getDifficultyLockMessage(difficultyKey);
    }
    playHitSound();
    updateDifficultyMenu();
    return;
  }

  selectedDifficulty = difficultyKey;
  updateDifficultyMenu(`${difficultyConfigs[difficultyKey].label} 모드 선택됨`);
}

function updateDifficultyMenu(message = "") {
  ensureSelectedDifficultyUnlocked();

  const buttons = {
    normal: difficultyNormalButton,
    hard: difficultyHardButton,
    hell: difficultyHellButton,
  };

  for (const [key, button] of Object.entries(buttons)) {
    if (!button) {
      continue;
    }

    const config = difficultyConfigs[key];
    const unlocked = isDifficultyUnlocked(key);

    button.textContent = `${config.label}${unlocked ? "" : " 🔒"}`;
    button.classList.toggle("is-selected", selectedDifficulty === key);
    button.classList.toggle("is-locked", !unlocked);
    button.setAttribute?.("aria-disabled", String(!unlocked));
  }

  if (difficultyMessage) {
    difficultyMessage.textContent = message || `${difficultyConfigs[selectedDifficulty].label} 모드 선택됨`;
  }
}

function calculateSoulReward() {
  const survivalSoul = Math.floor(gameState.elapsedTime / 10);
  const killSoul = Math.floor(gameState.kills / 20);
  const bossSoul =
    (gameState.bossKillCounts.mini ?? 0) * 5 +
    (gameState.bossKillCounts.mid ?? 0) * 15 +
    (gameState.bossKillCounts.big ?? 0) * 30 +
    (gameState.bossKillCounts.final ?? 0) * 200;
  const levelSoul = gameState.level;
  const difficultyMultiplier = getCurrentDifficultyConfig().soulMultiplier;

  return Math.max(0, Math.floor((survivalSoul + killSoul + bossSoul + levelSoul) * difficultyMultiplier));
}

function canBuyAnyPermanentUpgrade() {
  return Object.entries(permanentUpgradeDefinitions).some(([id, definition]) => {
    const level = getPermanentLevel(id);

    if (level >= definition.maxLevel) {
      return false;
    }

    return permanentSave.soul >= getPermanentUpgradeCost(definition, level);
  });
}

function awardSoulForRun(bestScore, bestTime) {
  if (gameState.soulAwarded) {
    return gameState.earnedSoul;
  }

  const earnedSoul = calculateSoulReward();

  gameState.earnedSoul = earnedSoul;
  gameState.soulAwarded = true;
  permanentSave.soul += earnedSoul;
  permanentSave.bestScore = Math.max(permanentSave.bestScore, bestScore);
  permanentSave.bestSurvivalTime = Math.max(permanentSave.bestSurvivalTime, bestTime);
  permanentSave.totalRuns += 1;
  permanentSave.totalKills += gameState.kills;
  permanentSave.totalBossKills += gameState.bossKills;
  savePermanentSave();
  updatePermanentSummary();

  return earnedSoul;
}

function updatePermanentSummary() {
  if (startSoulValue) {
    startSoulValue.textContent = permanentSave.soul;
  }

  if (startSoulCtaValue) {
    startSoulCtaValue.textContent = permanentSave.soul;
  }

  if (permanentSoulValue) {
    permanentSoulValue.textContent = permanentSave.soul;
  }

  const canUpgrade = canBuyAnyPermanentUpgrade();

  openPermanentButton?.classList.toggle("has-upgrade", canUpgrade);
  openPermanentGameOverButton?.classList.toggle("has-upgrade", canUpgrade);
  startPermanentBadge?.classList.toggle("hidden", !canUpgrade);

  updateDifficultyMenu();
}

function loadRecords() {
  return {
    bestScore: permanentSave.bestScore,
    bestTime: permanentSave.bestSurvivalTime,
  };
}

function saveRecords(bestScore, bestTime) {
  try {
    permanentSave.bestScore = Math.max(permanentSave.bestScore, bestScore);
    permanentSave.bestSurvivalTime = Math.max(permanentSave.bestSurvivalTime, bestTime);
    savePermanentSave();
    window.localStorage?.setItem(RECORD_KEY, JSON.stringify({ bestScore, bestTime }));
  } catch {
    // 저장소가 막힌 환경에서도 게임은 그대로 진행한다.
  }
}

function loadSoundPreference() {
  try {
    return window.localStorage?.getItem(SOUND_KEY) !== "false";
  } catch {
    return true;
  }
}

function saveSoundPreference() {
  try {
    window.localStorage?.setItem(SOUND_KEY, String(soundEnabled));
  } catch {
    // localStorage를 쓸 수 없는 브라우저여도 사운드 토글은 현재 세션에서 동작한다.
  }
}

function updateSoundButtons() {
  const text = `Sound: ${soundEnabled ? "ON" : "OFF"}`;

  if (soundStartButton) soundStartButton.textContent = text;
  if (soundHudButton) soundHudButton.textContent = text;
  if (pauseSoundButton) pauseSoundButton.textContent = text;
}

// ===== 사운드 시스템 =====
function initAudioContext() {
  if (!soundEnabled || audioContext) {
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    soundEnabled = false;
    updateSoundButtons();
    return;
  }

  audioContext = new AudioContextClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.5;
  masterGain.connect(audioContext.destination);
}

function unlockAudio() {
  if (!soundEnabled) {
    stopBgm();
    return;
  }

  initAudioContext();

  if (audioContext?.state === "suspended") {
    audioContext.resume();
  }
}

function setSoundEnabled(nextValue, unlockNow = false) {
  soundEnabled = nextValue;
  saveSoundPreference();
  updateSoundButtons();

  if (!soundEnabled) {
    stopBgm();
    return;
  }

  if (unlockNow) {
    unlockAudio();
    startBgm();
  }
}

function toggleSound() {
  setSoundEnabled(!soundEnabled, gameState?.isStarted);
}

function canPauseGame() {
  if (!gameState?.isStarted || gameState.isGameOver || gameState.isGameCleared) {
    return false;
  }

  if (gameState.isLevelingUp || gameState.isSynergyPopupOpen) {
    return false;
  }

  const blockingOverlayOpen =
    (permanentUpgradeScreen && !permanentUpgradeScreen.classList.contains("hidden")) ||
    (synergyCollectionScreen && !synergyCollectionScreen.classList.contains("hidden")) ||
    (permanentGuideScreen && !permanentGuideScreen.classList.contains("hidden"));

  return !blockingOverlayOpen;
}

function togglePause() {
  if (!canPauseGame()) {
    return;
  }

  if (gameState.isPaused) {
    resumeGame();
  } else {
    pauseGame("manual");
  }
}

function pauseGame(reason = "manual") {
  if (!gameState?.isStarted || gameState.isPaused || gameState.isGameOver || gameState.isLevelingUp || gameState.isSynergyPopupOpen) {
    return;
  }

  gameState.isPaused = true;
  gameState.pauseReason = reason;
  pauseScreen?.classList.remove("hidden");
  setUiBlocking(true);
  resetJoystick();
  updatePauseUi();
}

function resumeGame() {
  if (!gameState?.isPaused) {
    return;
  }

  gameState.isPaused = false;
  gameState.pauseReason = null;
  pauseScreen?.classList.add("hidden");
  lastTime = performance.now();
  setUiBlocking(false);
  updatePauseUi();
}

function updatePauseUi() {
  const canShowPauseButton = Boolean(gameState?.isStarted && !gameState.isGameOver && !gameState.isGameCleared);

  pauseButton?.classList.toggle("hidden", !canShowPauseButton);
  pauseButton?.classList.toggle("is-paused", Boolean(gameState?.isPaused));

  if (pauseButton) {
    pauseButton.textContent = gameState?.isPaused ? "▶" : "⏸";
  }
}

function openPermanentFromPause() {
  openPermanentUpgradeMenu({
    readOnly: true,
    message: "영구 강화는 게임오버 후 또는 메인 메뉴에서 구매할 수 있습니다.",
  });
}

function maybeShowPermanentGuide() {
  if (permanentSave.hasSeenPermanentUpgradeGuide || gameState.earnedSoul <= 0) {
    return;
  }

  permanentGuideScreen?.classList.remove("hidden");
  setUiBlocking(true);
}

function closePermanentGuide(markSeen = true) {
  permanentGuideScreen?.classList.add("hidden");

  if (markSeen && !permanentSave.hasSeenPermanentUpgradeGuide) {
    permanentSave.hasSeenPermanentUpgradeGuide = true;
    savePermanentSave();
  }

  const shouldBlock = !gameState?.isStarted || gameState?.isGameOver || gameState?.isLevelingUp || gameState?.isPaused;
  setUiBlocking(shouldBlock);
}

function openPermanentFromGuide() {
  closePermanentGuide(true);
  openPermanentUpgradeMenu();
}

function canPlaySound(name, cooldown) {
  if (!soundEnabled || !audioContext || !masterGain) {
    return false;
  }

  const now = audioContext.currentTime;

  if ((lastSoundTimes[name] ?? -Infinity) + cooldown > now) {
    return false;
  }

  lastSoundTimes[name] = now;
  return true;
}

function playTone(frequency, duration, type, volume, when = 0, endFrequency = frequency) {
  if (!audioContext || !masterGain) return;

  const startTime = audioContext.currentTime + when;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), startTime + duration);
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function playNoise(duration, volume) {
  if (!audioContext || !masterGain) return;

  const sampleRate = audioContext.sampleRate;
  const buffer = audioContext.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < data.length; index++) {
    data[index] = Math.random() * 2 - 1;
  }

  const source = audioContext.createBufferSource();
  const gain = audioContext.createGain();

  source.buffer = buffer;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  source.connect(gain);
  gain.connect(masterGain);
  source.start();
  source.stop(audioContext.currentTime + duration);
}

function playShootSound() {
  if (!canPlaySound("shoot", 0.08)) return;
  playTone(760, 0.045, "square", 0.18, 0, 980);
}

function playHitSound() {
  if (!canPlaySound("hit", 0.05)) return;
  playTone(180, 0.06, "triangle", 0.22, 0, 110);
}

function playEnemyDeathSound() {
  if (!canPlaySound("death", 0.08)) return;
  playTone(480, 0.08, "sine", 0.24, 0, 760);
  playTone(760, 0.07, "sine", 0.18, 0.05, 980);
}

function playLevelUpSound() {
  if (!canPlaySound("level-up", 0.35)) return;
  playTone(420, 0.09, "sine", 0.25, 0, 620);
  playTone(620, 0.1, "sine", 0.24, 0.08, 920);
  playTone(920, 0.12, "sine", 0.22, 0.17, 1240);
}

function playUpgradeSelectSound() {
  if (!canPlaySound("upgrade", 0.12)) return;
  playTone(520, 0.07, "triangle", 0.22, 0, 780);
}

function playBossAppearSound() {
  if (!canPlaySound("boss", 1.0)) return;
  playTone(110, 0.5, "sawtooth", 0.24, 0, 70);
}

function playBoxOpenSound() {
  if (!canPlaySound("box", 0.2)) return;
  playTone(700, 0.08, "sine", 0.24, 0, 1040);
  playTone(1040, 0.08, "sine", 0.18, 0.07, 1320);
}

function playPlayerDamageSound() {
  if (!canPlaySound("player-damage", 0.25)) return;
  playTone(260, 0.12, "sawtooth", 0.28, 0, 120);
}

function playGameOverSound() {
  if (!canPlaySound("game-over", 1.0)) return;
  playTone(280, 0.22, "triangle", 0.28, 0, 150);
  playTone(150, 0.35, "triangle", 0.22, 0.2, 70);
}

function playExplosionSound() {
  if (!canPlaySound("explosion", 0.16)) return;
  playNoise(0.16, 0.25);
  playTone(90, 0.18, "sawtooth", 0.18, 0, 45);
}

function playSynergyUnlockSound() {
  if (!canPlaySound("synergy-unlock", 0.35)) return;
  playTone(520, 0.09, "triangle", 0.22, 0, 780);
  playTone(780, 0.11, "triangle", 0.2, 0.08, 1040);
  playTone(1040, 0.13, "sine", 0.18, 0.18, 1320);
}

function playSynergyActivateSound() {
  if (!canPlaySound("synergy-activate", 0.2)) return;
  playTone(640, 0.07, "sine", 0.16, 0, 920);
  playTone(920, 0.06, "sine", 0.12, 0.06, 1180);
}

function playFinalBossSound() {
  if (!canPlaySound("final-boss", 1.0)) return;
  playTone(80, 0.42, "sawtooth", 0.24, 0, 50);
  playTone(150, 0.28, "triangle", 0.18, 0.18, 95);
}

function playGameClearSound() {
  if (!canPlaySound("game-clear", 1.0)) return;
  playTone(420, 0.12, "sine", 0.22, 0, 640);
  playTone(640, 0.14, "sine", 0.2, 0.1, 920);
  playTone(920, 0.18, "triangle", 0.18, 0.24, 1260);
}

function playModeUnlockSound() {
  if (!canPlaySound("mode-unlock", 0.8)) return;
  playTone(520, 0.1, "triangle", 0.22, 0, 760);
  playTone(760, 0.12, "triangle", 0.2, 0.1, 1120);
}

function startBgm() {
  if (!soundEnabled || !gameState?.isStarted || gameState?.isGameOver || bgmTimer) {
    return;
  }

  unlockAudio();

  if (!audioContext) {
    return;
  }

  const melody = [196, 247, 262, 330, 294, 262, 247, 220];

  bgmTimer = window.setInterval(() => {
    if (!soundEnabled || !audioContext || gameState?.isGameOver || !gameState?.isStarted) {
      return;
    }

    const note = melody[bgmStep % melody.length];

    playTone(note, 0.18, "triangle", 0.045, 0, note * 1.01);
    bgmStep += 1;
  }, 280);
}

function stopBgm() {
  if (bgmTimer) {
    window.clearInterval(bgmTimer);
    bgmTimer = null;
  }
}

// ===== 게임 시작/재시작 =====
function startGame() {
  hasStartedGame = true;
  unlockAudio();
  resetGame(true);
}

function restartGame() {
  hasStartedGame = true;
  unlockAudio();
  resetGame(true);
}

function upgradeWeapon(weaponId) {
  // 무기 강화는 이 함수 한 곳에서 처리한다. 나중에 새 무기를 추가하기 쉽다.
  if (weaponId === "bullet") {
    const bullet = weapons.bullet;

    if (bullet.level >= bullet.maxLevel) return;

    bullet.level += 1;
    bullet.baseDamage *= 1.16;
    bullet.fireDelay = Math.max(0.12, bullet.fireDelay * 0.92);

    if (bullet.level % 3 === 0) {
      bullet.pierce += 1;
    }
  }

  if (weaponId === "orbit") {
    const orbit = weapons.orbit;

    if (orbit.level >= orbit.maxLevel) return;

    orbit.level += 1;
    orbit.damage *= 1.16;
    orbit.angularSpeed += 0.22;
    orbit.orbitRadius += 4;
    orbit.duration += 0.35;

    if (orbit.level % 2 === 0) {
      orbit.maxOrbs += 1;
    }
  }

  if (weaponId === "bomb") {
    const wasUnlocked = weapons.bomb.unlocked;

    unlockBombWeapon();

    const bomb = weapons.bomb;

    if (!wasUnlocked) return;
    if (bomb.level >= bomb.maxLevel) return;

    bomb.level += 1;
    bomb.damage *= 1.16;
    bomb.radius += 7;
    bomb.cooldown = Math.max(4.2, bomb.cooldown * 0.9);

    if (bomb.level % 3 === 0) {
      bomb.count += 1;
    }
  }
}

function unlockBombWeapon() {
  const bomb = weapons.bomb;

  if (!bomb.unlocked) {
    bomb.unlocked = true;
    bomb.level = 1;
    bomb.timer = bomb.cooldown;
  }
}

function getDifficulty() {
  const time = gameState.elapsedTime;
  const config = getCurrentDifficultyConfig();
  let spawnDelay = 0.86;
  let enemySpeedBonus = 0;
  let maxEnemies = 61;
  let maxEnemySpeed = 198;
  let enemyHpMultiplier = 1;

  if (time > 20) {
    const phaseTime = time - 20;
    spawnDelay -= Math.min(0.16, phaseTime * 0.00295);
    enemySpeedBonus += Math.min(12, phaseTime * 0.2);
  }

  if (time > 60) {
    const phaseTime = time - 60;
    spawnDelay -= Math.min(0.44, phaseTime * 0.00335);
    enemySpeedBonus += Math.min(43, phaseTime * 0.34);
    maxEnemies = 85;
    maxEnemySpeed = 221;
  }

  if (time > 180) {
    const phaseTime = time - 180;
    spawnDelay -= Math.min(0.36, phaseTime * 0.0025);
    enemySpeedBonus += Math.min(46, phaseTime * 0.31);
    enemyHpMultiplier += Math.min(0.35, phaseTime * 0.002);
    maxEnemies = 111;
    maxEnemySpeed = 250;
  }

  if (time > 300) {
    const phaseTime = time - 300;
    spawnDelay -= Math.min(0.33, phaseTime * 0.00215);
    enemySpeedBonus += Math.min(52, phaseTime * 0.23);
    enemyHpMultiplier += Math.min(0.85, phaseTime * 0.004);
    maxEnemies = 143;
    maxEnemySpeed = 280;
  }

  return {
    spawnDelay: Math.max(0.34, spawnDelay) / getBossSpawnMultiplier() / config.spawnRateMultiplier,
    enemySpeedBonus,
    enemyHpMultiplier: enemyHpMultiplier * config.enemyHpMultiplier,
    maxEnemies: Math.floor(maxEnemies * config.maxEnemyMultiplier),
    maxEnemySpeed: maxEnemySpeed * config.enemySpeedMultiplier,
  };
}

function getBossSpawnMultiplier() {
  if (bosses.some((boss) => boss.bossType === "big")) return 0.84;
  if (bosses.some((boss) => boss.bossType === "mid")) return 0.9;
  if (bosses.some((boss) => boss.bossType === "mini")) return 0.98;
  return 1;
}

function chooseEnemyType() {
  const time = gameState.elapsedTime;
  const config = getCurrentDifficultyConfig();
  const normalWeight = Math.max(22, 90 - Math.max(0, time - 20) * 0.35);
  const fastWeight = Math.min(55, 18 + Math.max(0, time - 20) * 0.25) * config.fastWeightMultiplier;
  const tankWeight = Math.min(34, Math.max(0, (time - 120) * 0.22)) * config.tankWeightMultiplier;
  const eliteWeight = Math.min(28, Math.max(0, (time - 180) * 0.16)) * config.eliteWeightMultiplier;
  const totalWeight = normalWeight + fastWeight + tankWeight + eliteWeight;
  const roll = Math.random() * totalWeight;

  if (roll < normalWeight) return enemyTypes.normal;
  if (roll < normalWeight + fastWeight) return enemyTypes.fast;
  if (roll < normalWeight + fastWeight + tankWeight) return enemyTypes.tank;
  return enemyTypes.elite;
}

function spawnEnemy() {
  const difficulty = getDifficulty();

  if (enemies.length >= difficulty.maxEnemies) {
    return;
  }

  const side = Math.floor(Math.random() * 4);
  const margin = 56;
  let x;
  let y;

  if (side === 0) {
    x = Math.random() * window.innerWidth;
    y = -margin;
  } else if (side === 1) {
    x = window.innerWidth + margin;
    y = Math.random() * window.innerHeight;
  } else if (side === 2) {
    x = Math.random() * window.innerWidth;
    y = window.innerHeight + margin;
  } else {
    x = -margin;
    y = Math.random() * window.innerHeight;
  }

  const type = chooseEnemyType();
  const speed = Math.min((type.speed + difficulty.enemySpeedBonus) * getCurrentDifficultyConfig().enemySpeedMultiplier, difficulty.maxEnemySpeed);
  const maxHp = Math.ceil(type.hp * difficulty.enemyHpMultiplier);

  enemies.push({
    kind: "enemy",
    id: nextEnemyId,
    type: type.name,
    x,
    y,
    radius: getScaledRadius(type.radius, "enemy"),
    baseRadius: type.radius,
    maxHp,
    hp: maxHp,
    speed,
    damage: type.damage,
    score: type.score,
    exp: type.exp,
    fill: type.fill,
    stroke: type.stroke,
    touchCooldown: 0,
    orbCooldown: 0,
  });

  nextEnemyId += 1;
}

function checkBossSpawn() {
  checkFinalBossSpawn();

  const minute = Math.floor(gameState.elapsedTime / 60);

  if (minute < 1 || gameState.spawnedBossMinutes.has(minute)) {
    return;
  }

  if (minute % 5 === 0) {
    spawnBoss("big", minute);
  } else if (minute % 3 === 0) {
    spawnBoss("mid", minute);
  } else {
    spawnBoss("mini", minute);
  }

  gameState.spawnedBossMinutes.add(minute);
}

function checkFinalBossSpawn() {
  if (gameState.finalBossSpawned || gameState.elapsedTime < FINAL_BOSS_TIME) {
    return;
  }

  gameState.finalBossSpawned = true;
  gameState.spawnedBossMinutes.add(10);
  spawnFinalBoss();
}

function spawnFinalBoss() {
  const config = getCurrentDifficultyConfig();
  const side = Math.floor(Math.random() * 4);
  const margin = 110;
  let x;
  let y;

  if (side === 0) {
    x = Math.random() * window.innerWidth;
    y = -margin;
  } else if (side === 1) {
    x = window.innerWidth + margin;
    y = Math.random() * window.innerHeight;
  } else if (side === 2) {
    x = Math.random() * window.innerWidth;
    y = window.innerHeight + margin;
  } else {
    x = -margin;
    y = Math.random() * window.innerHeight;
  }

  const maxHp = Math.ceil(finalBossBase.hp * config.bossHpMultiplier);

  bosses.push({
    kind: "boss",
    id: nextBossId,
    bossType: "final",
    isFinalBoss: true,
    difficultyKey: gameState.selectedDifficulty,
    label: config.finalBossLabel,
    x,
    y,
    radius: getScaledRadius(finalBossBase.radius, "boss", "final"),
    baseRadius: finalBossBase.radius,
    maxHp,
    hp: maxHp,
    speed: finalBossBase.speed,
    damage: Math.ceil(finalBossBase.damage * config.bossDamageMultiplier),
    score: finalBossBase.score,
    exp: finalBossBase.exp,
    expOrbs: finalBossBase.expOrbs,
    supplyDrops: finalBossBase.supplyDrops,
    fill: config.finalBossColor,
    stroke: config.finalBossColor,
    touchCooldown: 0,
    orbCooldown: 0,
    summonTimer: 0,
    shockwaveTimer: finalBossBase.shockwaveDelay,
    shockwaveRadius: finalBossBase.shockwaveRadius,
    shockwaveDamage: Math.ceil(finalBossBase.shockwaveDamage * config.bossDamageMultiplier),
    spawnAge: 0,
    spawnDuration: 0.9,
  });

  nextBossId += 1;
  showBanner(`${config.finalBossLabel} 등장!`, config.finalBossColor);
  addEffect({
    type: "screen-flash",
    duration: 0.34,
    color: gameState.selectedDifficulty === "hell" ? "rgba(255, 93, 115, 0.18)" : "rgba(255, 212, 71, 0.16)",
  });
  addScreenShake(gameState.selectedDifficulty === "hell" ? 11 : 8, 0.2);
  playFinalBossSound();
}

function spawnBoss(typeKey, minute) {
  const type = bossTypes[typeKey];
  const config = getCurrentDifficultyConfig();
  const side = Math.floor(Math.random() * 4);
  const margin = 90;
  let x;
  let y;

  if (side === 0) {
    x = Math.random() * window.innerWidth;
    y = -margin;
  } else if (side === 1) {
    x = window.innerWidth + margin;
    y = Math.random() * window.innerHeight;
  } else if (side === 2) {
    x = Math.random() * window.innerWidth;
    y = window.innerHeight + margin;
  } else {
    x = -margin;
    y = Math.random() * window.innerHeight;
  }

  const maxHp = Math.ceil((type.hp + Math.floor(minute * type.hp * 0.08)) * config.bossHpMultiplier);

  bosses.push({
    kind: "boss",
    id: nextBossId,
    bossType: typeKey,
    label: type.label,
    x,
    y,
    radius: getScaledRadius(type.radius, "boss", typeKey),
    baseRadius: type.radius,
    maxHp,
    hp: maxHp,
    speed: type.speed,
    damage: Math.ceil(type.damage * config.bossDamageMultiplier),
    score: type.score,
    exp: type.exp,
    expOrbs: type.expOrbs,
    supplyDrops: type.supplyDrops,
    fill: type.fill,
    stroke: type.stroke,
    touchCooldown: 0,
    orbCooldown: 0,
    summonTimer: type.summonDelay ?? 0,
    shockwaveTimer: type.shockwaveDelay ?? 0,
    spawnAge: 0,
    spawnDuration: typeKey === "big" ? 0.75 : 0.45,
  });

  nextBossId += 1;
  showBanner(type.warning, "#ffd447");
  if (typeKey === "big") {
    addEffect({
      type: "screen-flash",
      duration: 0.25,
      color: "rgba(255, 212, 71, 0.14)",
    });
  }
  addScreenShake(typeKey === "big" ? 7 : 5, 0.15);
  playBossAppearSound();
}

function spawnExpOrb(x, y, value) {
  expOrbs.push({
    x,
    y,
    value,
    radius: 7,
  });
}

function spawnExpBurst(x, y, count, value) {
  for (let index = 0; index < count; index++) {
    const angle = (TAU * index) / count;
    const distance = 18 + Math.random() * 26;

    spawnExpOrb(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance, value);
  }
}

function spawnSupplyBox(x = null, y = null) {
  const margin = 70;

  supplyBoxes.push({
    x: x ?? margin + Math.random() * Math.max(1, window.innerWidth - margin * 2),
    y: y ?? margin + Math.random() * Math.max(1, window.innerHeight - margin * 2),
    radius: 16,
    age: 0,
    lifetime: 34,
  });
}

function findNearestTargetFrom(x, y) {
  let nearestTarget = null;
  let nearestDistance = Infinity;

  for (const target of getAllTargets()) {
    const distance = getDistance(x, y, target.x, target.y);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestTarget = target;
    }
  }

  return nearestTarget;
}

function getAllTargets() {
  return [...enemies, ...bosses];
}

function getTargetKey(target) {
  return `${target.kind}-${target.id}`;
}

function getAttackMultiplier() {
  const supplyBuff = gameState.attackBuffTimer > 0 ? 1.3 : 1;
  const knowledgeBuff = isSynergyActive("knowledgeSurge") && gameState.synergy.knowledgeBuffTimer > 0 ? 1.12 : 1;

  return weapons.globalDamageMultiplier * supplyBuff * knowledgeBuff;
}

function getBulletFireDelay() {
  const rapidPierceBuff = isSynergyActive("rapidPierce") && gameState.synergy.rapidPierceActiveTimer > 0
    ? 1.8
    : 1;

  return weapons.bullet.fireDelay / rapidPierceBuff;
}

function shootAtNearestEnemy() {
  const target = findNearestTargetFrom(player.x, player.y);

  if (target) {
    shootFromPoint(player.x, player.y, target, 1);
    playShootSound();
  }
}

function shootFromPoint(sourceX, sourceY, target, damageScale) {
  const bullet = weapons.bullet;
  const baseAngle = Math.atan2(target.y - sourceY, target.x - sourceX);
  const spread = bullet.shots === 1 ? 0 : bullet.spread;
  const firstAngle = baseAngle - (spread * (bullet.shots - 1)) / 2;

  for (let index = 0; index < bullet.shots; index++) {
    const angle = firstAngle + spread * index;
    const damage =
      bullet.baseDamage *
      bullet.damageMultiplier *
      getAttackMultiplier() *
      damageScale;

    bullets.push({
      x: sourceX,
      y: sourceY,
      radius: 5,
      vx: Math.cos(angle) * bullet.speed,
      vy: Math.sin(angle) * bullet.speed,
      damage,
      pierceRemaining: bullet.pierce,
      hitTargetKeys: new Set(),
    });
  }
}

function spawnOrbitOrb() {
  const orbit = weapons.orbit;

  if (orbitOrbs.length >= orbit.maxOrbs) {
    return;
  }

  orbitOrbs.push({
    angle: Math.random() * TAU,
    age: 0,
    duration: orbit.duration,
    radius: orbit.radius,
    orbitRadius: orbit.orbitRadius,
    angularSpeed: orbit.angularSpeed,
    damage: orbit.damage,
    x: player.x,
    y: player.y,
  });
}

function throwBombsAtNearestEnemies() {
  if (!weapons.bomb.unlocked || getAllTargets().length === 0) {
    return;
  }

  const sortedTargets = getAllTargets()
    .sort((a, b) => getDistance(player.x, player.y, a.x, a.y) - getDistance(player.x, player.y, b.x, b.y))
    .slice(0, weapons.bomb.count);

  for (const target of sortedTargets) {
    const offsetX = (Math.random() - 0.5) * 24;
    const offsetY = (Math.random() - 0.5) * 24;

    bombs.push({
      x: target.x + offsetX,
      y: target.y + offsetY,
      radius: weapons.bomb.radius,
      damage: weapons.bomb.damage * getAttackMultiplier(),
      fuseTime: weapons.bomb.fuseTime,
      age: 0,
      exploded: false,
    });
  }
}

function spawnMeteor() {
  meteors.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: gameState.meteor.radius,
    age: 0,
    warningTime: gameState.meteor.warningTime,
    hasHit: false,
  });
}

function createFlameZone(x, y, options = {}) {
  flameZones.push({
    x,
    y,
    radius: options.radius ?? gameState.flameBurst.radius,
    age: 0,
    duration: options.duration ?? gameState.flameBurst.duration,
    damagePerSecond: options.damagePerSecond ?? gameState.flameBurst.damagePerSecond,
    bossDamageMultiplier: options.bossDamageMultiplier ?? 1,
    source: options.source ?? "화염 폭발",
  });

  if (flameZones.length > 24) {
    flameZones.splice(0, flameZones.length - 24);
  }
}

function addEffect(effect) {
  effects.push({ age: 0, ...effect });

  if (effects.length > 180) {
    effects.splice(0, effects.length - 180);
  }
}

function addFloatingText(text, x, y, color = "#ffffff", size = 18, duration = 0.9, options = {}) {
  floatingTexts.push({
    text,
    x,
    y,
    color,
    size,
    duration,
    age: 0,
    vy: options.vy ?? -34,
    weight: options.weight ?? 800,
    align: options.align,
  });

  if (floatingTexts.length > 110) {
    floatingTexts.splice(0, floatingTexts.length - 110);
  }
}

function showBanner(text, color = "#ffd447") {
  floatingTexts.push({
    text,
    x: window.innerWidth / 2,
    y: 84,
    color,
    size: 34,
    duration: 2,
    age: 0,
    vy: -8,
    align: "center",
  });
}

function triggerScreenShake(duration = 0.3, strength = 7) {
  gameState.screenShakeTimer = duration;
  gameState.screenShakeDuration = duration;
  gameState.screenShakeStrength = strength;
}

function addScreenShake(intensity = 5, duration = 0.12) {
  if (!gameState || gameState.isPaused) {
    return;
  }

  const mobileScale = getResponsiveBalance() === mobileBalance ? 0.65 : 1;

  triggerScreenShake(duration, intensity * mobileScale);
}

function triggerHitStop(duration = 0.04) {
  if (!gameState || gameState.hitStopCooldown > 0 || gameState.isPaused) {
    return;
  }

  gameState.hitStopTimer = Math.max(gameState.hitStopTimer, duration);
  gameState.hitStopCooldown = 0.18;
}

function addParticleBurst(x, y, options = {}) {
  const count = options.count ?? 5;
  const color = options.color ?? "#ffd447";
  const speed = options.speed ?? 120;
  const size = options.size ?? 3;
  const duration = options.duration ?? 0.45;

  for (let index = 0; index < count; index++) {
    const angle = Math.random() * TAU;
    const particleSpeed = speed * (0.55 + Math.random() * 0.7);

    addEffect({
      type: "particle",
      x,
      y,
      vx: Math.cos(angle) * particleSpeed,
      vy: Math.sin(angle) * particleSpeed,
      radius: size * (0.7 + Math.random() * 0.6),
      duration,
      color,
    });
  }
}

function getDamageTextStyle(source, target, damage) {
  const style = {
    color: "#f6f2e8",
    size: target.kind === "boss" ? 20 : 15,
    duration: 0.65,
    vy: -34,
    weight: target.kind === "boss" ? 900 : 800,
  };

  if (/폭발|폭탄|메테오|파열|전체/.test(source)) {
    style.color = "#ffd447";
    style.size += 4;
    style.duration = 0.78;
    style.vy = -42;
  } else if (/번개/.test(source)) {
    style.color = "#8be9ff";
    style.size += 2;
    style.duration = 0.52;
    style.vy = -56;
  } else if (/화염/.test(source)) {
    style.color = "#ff7043";
  } else if (/오라/.test(source)) {
    style.color = "#b46cff";
  } else if (/피의 반격|시너지|빙결/.test(source)) {
    style.color = "#ff6b81";
    style.size += 2;
  }

  if (damage >= 10) {
    style.size += 2;
    style.weight = 900;
  }

  return style;
}

function addDamageText(target, damage, source) {
  const style = getDamageTextStyle(source, target, damage);

  addFloatingText(
    String(Math.ceil(damage)),
    target.x + (Math.random() - 0.5) * target.radius * 0.45,
    target.y - target.radius,
    style.color,
    style.size,
    style.duration,
    {
      vy: style.vy,
      weight: style.weight,
    },
  );
}

function createShockwave(x, y, radius, damage, force, color, source = "충격파") {
  playExplosionSound();
  addScreenShake(4, 0.08);

  for (const target of getAllTargets()) {
    const distance = getDistance(x, y, target.x, target.y);

    if (distance < radius + target.radius) {
      const angle = Math.atan2(target.y - y, target.x - x);

      target.x += Math.cos(angle) * force * (target.kind === "boss" ? 0 : 1);
      target.y += Math.sin(angle) * force * (target.kind === "boss" ? 0 : 1);
      damageTarget(target, damage, 0, source);
    }
  }

  addEffect({
    type: "ring",
    x,
    y,
    radius,
    duration: 0.32,
    color,
  });
}

function damageTargetsInRadius(x, y, radius, damage, source, bossDamageMultiplier = 1, knockback = 0, options = {}) {
  let hitCount = 0;

  for (const target of getAllTargets()) {
    const distance = getDistance(x, y, target.x, target.y);

    if (distance < radius + target.radius) {
      const finalDamage = target.kind === "boss" ? damage * bossDamageMultiplier : damage;
      damageTarget(target, finalDamage, knockback, source, options);
      hitCount += 1;
    }
  }

  return hitCount;
}

function explodeAt(x, y, radius, damage, color = "rgba(255, 212, 71, 0.5)", source = "폭발", bossDamageMultiplier = 0.45) {
  playExplosionSound();
  const hitCount = damageTargetsInRadius(x, y, radius, damage, source, bossDamageMultiplier, 8);

  if (source !== "파편 폭탄") {
    addScreenShake(source === "메테오" ? 7 : 4, source === "메테오" ? 0.12 : 0.08);
  }

  if (hitCount >= 3 || source === "메테오") {
    triggerHitStop(source === "메테오" ? 0.05 : 0.035);
  }

  addEffect({
    type: "circle",
    x,
    y,
    radius,
    duration: 0.34,
    color,
  });
}

function chainLightningFrom(x, y, damage, extraTargets = 0, bossDamageMultiplier = 1) {
  const targets = getAllTargets()
    .map((target) => ({
      target,
      distance: getDistance(x, y, target.x, target.y),
    }))
    .filter((entry) => entry.distance <= gameState.chainLightning.range)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Math.min(6, gameState.chainLightning.maxTargets + extraTargets));

  for (const entry of targets) {
    lightningLines.push({
      x1: x,
      y1: y,
      x2: entry.target.x,
      y2: entry.target.y,
      age: 0,
      duration: 0.16,
    });
    damageTarget(entry.target, entry.target.kind === "boss" ? damage * bossDamageMultiplier : damage, 3, "번개 연쇄");
  }

  if (lightningLines.length > 48) {
    lightningLines.splice(0, lightningLines.length - 48);
  }
}

// ===== 업데이트/충돌 =====
function updatePlayer(deltaTime) {
  let moveX = 0;
  let moveY = 0;

  if (keys.has("KeyA") || keys.has("ArrowLeft")) moveX -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) moveX += 1;
  if (keys.has("KeyW") || keys.has("ArrowUp")) moveY -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) moveY += 1;

  if (joystickActive || joystickDeltaX !== 0 || joystickDeltaY !== 0) {
    moveX += joystickDeltaX / joystickMaxDistance;
    moveY += joystickDeltaY / joystickMaxDistance;
  }

  // 키보드와 조이스틱 입력을 합친 뒤 정규화해서 대각선 이동이 과하게 빨라지지 않게 한다.
  const length = Math.hypot(moveX, moveY);

  if (length > 0) {
    moveX /= length;
    moveY /= length;
  }

  const speed = player.speed * (gameState.speedBuffTimer > 0 ? 1.2 : 1);

  player.x += moveX * speed * deltaTime;
  player.y += moveY * speed * deltaTime;

  player.x = clamp(player.x, player.radius, window.innerWidth - player.radius);
  player.y = clamp(player.y, player.radius, window.innerHeight - player.radius);
}

function updateWeapons(deltaTime) {
  weapons.bullet.timer += deltaTime;
  if (weapons.bullet.timer >= getBulletFireDelay()) {
    weapons.bullet.timer = 0;
    shootAtNearestEnemy();
  }

  weapons.orbit.spawnTimer += deltaTime;
  if (weapons.orbit.spawnTimer >= weapons.orbit.spawnDelay) {
    weapons.orbit.spawnTimer = 0;
    spawnOrbitOrb();
  }

  if (weapons.bomb.unlocked) {
    weapons.bomb.timer += deltaTime;

    if (weapons.bomb.timer >= weapons.bomb.cooldown) {
      weapons.bomb.timer = 0;
      throwBombsAtNearestEnemies();
    }
  }
}

function updateTimedEffects(deltaTime) {
  gameState.attackBuffTimer = Math.max(0, gameState.attackBuffTimer - deltaTime);
  gameState.speedBuffTimer = Math.max(0, gameState.speedBuffTimer - deltaTime);
  gameState.magnetBoostTimer = Math.max(0, gameState.magnetBoostTimer - deltaTime);

  if (gameState.shield.enabled && !gameState.shield.ready) {
    gameState.shield.timer -= deltaTime;

    if (gameState.shield.timer <= 0) {
      gameState.shield.ready = true;
      gameState.shield.charges = Math.max(gameState.shield.charges, 1);
      gameState.shield.timer = 0;
    }
  }

  if (gameState.onHitShockwave.timer > 0) {
    gameState.onHitShockwave.timer -= deltaTime;
  }

  if (gameState.forcePush.timer > 0) {
    gameState.forcePush.timer -= deltaTime;
  }

  if (gameState.forcePush.enabled && gameState.forcePush.timer <= 0) {
    const nearbyCount = getAllTargets().filter(
      (target) => getDistance(player.x, player.y, target.x, target.y) < gameState.forcePush.radius,
    ).length;

    if (nearbyCount >= gameState.forcePush.triggerCount) {
      createShockwave(
        player.x,
        player.y,
        gameState.forcePush.radius,
        gameState.forcePush.damage,
        gameState.forcePush.force,
        "rgba(180, 108, 255, 0.45)",
        "강제 밀쳐내기",
      );
      gameState.forcePush.timer = gameState.forcePush.cooldown;
    }
  }

  if (gameState.meteor.enabled) {
    gameState.meteor.timer -= deltaTime;

    if (gameState.meteor.timer <= 0) {
      spawnMeteor();
      gameState.meteor.timer = gameState.meteor.interval;
    }
  }

  if (gameState.timeSlow.enabled) {
    if (gameState.timeSlow.activeTimer > 0) {
      gameState.timeSlow.activeTimer -= deltaTime;
    } else {
      gameState.timeSlow.timer -= deltaTime;

      if (gameState.timeSlow.timer <= 0) {
        gameState.timeSlow.activeTimer = gameState.timeSlow.duration;
        gameState.timeSlow.timer = gameState.timeSlow.cooldown;
      }
    }
  }
}

function updateSynergies(deltaTime) {
  const state = gameState.synergy;

  state.bloodCounterCooldown = Math.max(0, state.bloodCounterCooldown - deltaTime);
  state.knowledgeCooldown = Math.max(0, state.knowledgeCooldown - deltaTime);
  state.knowledgeBuffTimer = Math.max(0, state.knowledgeBuffTimer - deltaTime);

  if (isSynergyActive("rapidPierce")) {
    state.rapidPierceCooldown -= deltaTime;
    state.rapidPierceActiveTimer = Math.max(0, state.rapidPierceActiveTimer - deltaTime);

    if (state.rapidPierceCooldown <= 0 && state.rapidPierceActiveTimer <= 0) {
      triggerRapidPierceBurst();
    }
  }

  if (
    isSynergyActive("knowledgeSurge") &&
    state.knowledgeOrbCount >= 25 &&
    state.knowledgeCooldown <= 0 &&
    state.knowledgeBuffTimer <= 0
  ) {
    triggerKnowledgeSurge();
  }
}

function triggerRapidPierceBurst() {
  gameState.synergy.rapidPierceActiveTimer = 3;
  gameState.synergy.rapidPierceCooldown = 10;
  showBanner("고속 관통!", "#d8f5ff");
  addFloatingText("고속 관통!", player.x, player.y - player.radius - 30, "#d8f5ff", 22, 1);
  addEffect({
    type: "ring",
    x: player.x,
    y: player.y,
    radius: player.radius + 54,
    duration: 0.36,
    color: "rgba(216, 245, 255, 0.58)",
  });
  playSynergyActivateSound();
}

function triggerKnowledgeSurge() {
  gameState.synergy.knowledgeOrbCount = Math.max(0, gameState.synergy.knowledgeOrbCount - 25);
  gameState.synergy.knowledgeBuffTimer = 5;
  gameState.synergy.knowledgeCooldown = 5;
  addFloatingText("지식 폭주!", player.x, player.y - player.radius - 32, "#64f7b4", 22, 1.1);
  showBanner("지식 폭주!", "#64f7b4");
  playSynergyActivateSound();
}

function updateBosses(deltaTime) {
  for (const boss of bosses) {
    const angle = Math.atan2(player.y - boss.y, player.x - boss.x);
    const frostSlow =
      isSynergyActive("frostAura") &&
      gameState.aura.enabled &&
      getDistance(player.x, player.y, boss.x, boss.y) < gameState.aura.radius + boss.radius
        ? 0.85
        : 1;

    boss.spawnAge = (boss.spawnAge ?? 0) + deltaTime;
    boss.x += Math.cos(angle) * boss.speed * frostSlow * deltaTime;
    boss.y += Math.sin(angle) * boss.speed * frostSlow * deltaTime;
    boss.touchCooldown = Math.max(0, boss.touchCooldown - deltaTime);
    boss.orbCooldown = Math.max(0, boss.orbCooldown - deltaTime);
    boss.hitFlashTimer = Math.max(0, (boss.hitFlashTimer ?? 0) - deltaTime);

    if (boss.bossType === "mid") {
      boss.summonTimer -= deltaTime;

      if (boss.summonTimer <= 0) {
        summonBossMinions(boss);
        boss.summonTimer = bossTypes.mid.summonDelay;
      }
    }

    if (boss.bossType === "big") {
      boss.shockwaveTimer -= deltaTime;

      if (boss.shockwaveTimer <= 0) {
        createBossShockwave(boss);
        boss.shockwaveTimer = bossTypes.big.shockwaveDelay;
      }
    }

    if (boss.isFinalBoss) {
      boss.shockwaveTimer -= deltaTime;

      if (boss.shockwaveTimer <= 0) {
        createFinalBossShockwave(boss);
        boss.shockwaveTimer = finalBossBase.shockwaveDelay;
      }
    }
  }
}

function summonBossMinions(boss) {
  const difficulty = getDifficulty();

  addEffect({
    type: "ring",
    x: boss.x,
    y: boss.y,
    radius: boss.radius + 36,
    duration: 0.35,
    color: "rgba(180, 108, 255, 0.5)",
  });

  for (let index = 0; index < 3; index++) {
    if (enemies.length >= difficulty.maxEnemies) return;

    const angle = (TAU * index) / 3 + Math.random() * 0.4;
    const type = enemyTypes.normal;

    enemies.push({
      kind: "enemy",
      id: nextEnemyId,
      type: "normal",
      x: boss.x + Math.cos(angle) * (boss.radius + 24),
      y: boss.y + Math.sin(angle) * (boss.radius + 24),
      radius: getScaledRadius(type.radius, "enemy"),
      baseRadius: type.radius,
      maxHp: type.hp,
      hp: type.hp,
      speed: type.speed,
      damage: type.damage,
      score: type.score,
      exp: type.exp,
      fill: type.fill,
      stroke: type.stroke,
      touchCooldown: 0,
      orbCooldown: 0,
    });
    nextEnemyId += 1;
  }
}

function createBossShockwave(boss) {
  const radius = 150;

  addEffect({
    type: "ring",
    x: boss.x,
    y: boss.y,
    radius,
    duration: 0.58,
    color: "rgba(255, 212, 71, 0.62)",
  });

  if (getDistance(player.x, player.y, boss.x, boss.y) < radius + player.radius) {
    damagePlayer(14, false);
  }
}

function createFinalBossShockwave(boss) {
  const radius = boss.shockwaveRadius ?? finalBossBase.shockwaveRadius;

  addEffect({
    type: "ring",
    x: boss.x,
    y: boss.y,
    radius,
    duration: 0.66,
    color: `${boss.fill}aa`,
  });

  if (getDistance(player.x, player.y, boss.x, boss.y) < radius + player.radius) {
    damagePlayer(boss.shockwaveDamage ?? finalBossBase.shockwaveDamage, false);
  }
}

function updateBullets(deltaTime) {
  for (const bullet of bullets) {
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;
  }

  bullets = bullets.filter((bullet) => {
    const margin = 80;

    return (
      bullet.x > -margin &&
      bullet.x < window.innerWidth + margin &&
      bullet.y > -margin &&
      bullet.y < window.innerHeight + margin
    );
  });
}

function updateOrbitOrbs(deltaTime) {
  for (const orb of orbitOrbs) {
    orb.age += deltaTime;
    orb.angle += orb.angularSpeed * deltaTime;
    orb.x = player.x + Math.cos(orb.angle) * orb.orbitRadius;
    orb.y = player.y + Math.sin(orb.angle) * orb.orbitRadius;
  }

  orbitOrbs = orbitOrbs.filter((orb) => orb.age < orb.duration);
}

function updateBombs(deltaTime) {
  for (const bomb of bombs) {
    bomb.age += deltaTime;

    if (!bomb.exploded && bomb.age >= bomb.fuseTime) {
      bomb.exploded = true;
      explodeAt(
        bomb.x,
        bomb.y,
        bomb.radius,
        bomb.damage,
        bomb.isFragment ? "rgba(255, 156, 74, 0.42)" : "rgba(255, 212, 71, 0.5)",
        bomb.isFragment ? "파편 폭탄" : "폭탄",
        bomb.isFragment ? 0.5 : 0.45,
      );

      if (!bomb.isFragment) {
        handleBombSynergyExplosion(bomb);
      }
    }
  }

  bombs = bombs.filter((bomb) => bomb.age < bomb.fuseTime + 0.25);
}

function handleBombSynergyExplosion(bomb) {
  if (isSynergyActive("flameBomb")) {
    createFlameZone(bomb.x, bomb.y, {
      radius: Math.max(38, bomb.radius * 0.72),
      duration: 2.5,
      damagePerSecond: bomb.damage * 0.15,
      bossDamageMultiplier: 0.5,
      source: "화염 폭탄",
    });
  }

  if (isSynergyActive("shrapnelBomb")) {
    spawnShrapnelBombs(bomb);
  }
}

function spawnShrapnelBombs(bomb) {
  if (bombs.length > 48) {
    return;
  }

  const stacks = Math.max(1, gameState.bombPocket.stacks, gameState.upgradeCounts["bomb-pocket"] ?? 0);
  const count = stacks >= 2 ? 5 : 4;
  const spreadDistance = bomb.radius * 0.62;

  for (let index = 0; index < count; index++) {
    const angle = (TAU * index) / count + Math.random() * 0.28;

    bombs.push({
      x: bomb.x + Math.cos(angle) * spreadDistance,
      y: bomb.y + Math.sin(angle) * spreadDistance,
      radius: Math.max(24, bomb.radius * 0.42),
      damage: bomb.damage * 0.3,
      fuseTime: 0.18,
      age: 0,
      exploded: false,
      isFragment: true,
    });
  }
}

function updateFlameZones(deltaTime) {
  for (const zone of flameZones) {
    zone.age += deltaTime;

    for (const target of getAllTargets()) {
      const distance = getDistance(zone.x, zone.y, target.x, target.y);

      if (distance < zone.radius + target.radius) {
        const damage = zone.damagePerSecond * deltaTime * (target.kind === "boss" ? zone.bossDamageMultiplier : 1);

        damageTarget(target, damage, 0, zone.source, {
          showText: false,
        });
      }
    }
  }

  flameZones = flameZones.filter((zone) => zone.age < zone.duration);
}

function updateMeteors(deltaTime) {
  for (const meteor of meteors) {
    meteor.age += deltaTime;

    if (!meteor.hasHit && meteor.age >= meteor.warningTime) {
      meteor.hasHit = true;
      explodeAt(
        meteor.x,
        meteor.y,
        gameState.meteor.radius,
        gameState.meteor.damage,
        "rgba(255, 126, 74, 0.52)",
        "메테오",
      );
    }
  }

  meteors = meteors.filter((meteor) => meteor.age < meteor.warningTime + 0.35);
}

function updateClones(deltaTime) {
  for (const clone of clones) {
    clone.angle += clone.orbitSpeed * deltaTime;
    clone.x = player.x + Math.cos(clone.angle) * clone.orbitRadius;
    clone.y = player.y + Math.sin(clone.angle) * clone.orbitRadius;
    clone.fireTimer += deltaTime;

    if (clone.fireTimer >= clone.fireDelay) {
      const target = findNearestTargetFrom(clone.x, clone.y);

      clone.fireTimer = 0;

      if (target) {
        shootFromPoint(clone.x, clone.y, target, clone.damageMultiplier);
      }
    }
  }
}

function updateEnemies(deltaTime) {
  const timeSlowMultiplier =
    gameState.timeSlow.activeTimer > 0 ? gameState.timeSlow.multiplier : 1;

  for (const enemy of enemies) {
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    let speedMultiplier = timeSlowMultiplier;
    const distanceToPlayer = getDistance(player.x, player.y, enemy.x, enemy.y);

    if (
      gameState.coldAura.enabled &&
      distanceToPlayer < gameState.coldAura.radius
    ) {
      speedMultiplier *= 1 - gameState.coldAura.slow;
    }

    enemy.freezeTimer = Math.max(0, (enemy.freezeTimer ?? 0) - deltaTime);
    enemy.frostCooldown = Math.max(0, (enemy.frostCooldown ?? 0) - deltaTime);

    if (isSynergyActive("frostAura") && gameState.aura.enabled && distanceToPlayer < gameState.aura.radius + enemy.radius) {
      speedMultiplier *= 0.78;
      enemy.frostStayTimer = (enemy.frostStayTimer ?? 0) + deltaTime;

      if (enemy.frostStayTimer >= 2 && enemy.frostCooldown <= 0) {
        enemy.freezeTimer = 0.7;
        enemy.frostCooldown = 8;
        enemy.frostStayTimer = 0;
        addFloatingText("빙결!", enemy.x, enemy.y - enemy.radius, "#8be9ff", 16, 0.8);
        addEffect({
          type: "ring",
          x: enemy.x,
          y: enemy.y,
          radius: enemy.radius + 16,
          duration: 0.32,
          color: "rgba(139, 233, 255, 0.62)",
        });
      }
    } else {
      enemy.frostStayTimer = 0;
    }

    if (enemy.freezeTimer > 0) {
      speedMultiplier = 0;
    }

    enemy.x += Math.cos(angle) * enemy.speed * speedMultiplier * deltaTime;
    enemy.y += Math.sin(angle) * enemy.speed * speedMultiplier * deltaTime;
    enemy.x += (enemy.knockbackX ?? 0) * deltaTime;
    enemy.y += (enemy.knockbackY ?? 0) * deltaTime;
    enemy.knockbackX = (enemy.knockbackX ?? 0) * Math.pow(0.04, deltaTime);
    enemy.knockbackY = (enemy.knockbackY ?? 0) * Math.pow(0.04, deltaTime);

    if (Math.abs(enemy.knockbackX) < 1) enemy.knockbackX = 0;
    if (Math.abs(enemy.knockbackY) < 1) enemy.knockbackY = 0;

    enemy.x = clamp(enemy.x, -90, window.innerWidth + 90);
    enemy.y = clamp(enemy.y, -90, window.innerHeight + 90);
    enemy.hitFlashTimer = Math.max(0, (enemy.hitFlashTimer ?? 0) - deltaTime);
    enemy.touchCooldown = Math.max(0, enemy.touchCooldown - deltaTime);
    enemy.orbCooldown = Math.max(0, enemy.orbCooldown - deltaTime);
  }
}

function updateExpOrbs(deltaTime) {
  const magnetRadius = player.magnetRadius * (gameState.magnetBoostTimer > 0 ? 4.2 : 1);

  for (let index = expOrbs.length - 1; index >= 0; index--) {
    const orb = expOrbs[index];
    const distance = getDistance(player.x, player.y, orb.x, orb.y);

    if (distance < magnetRadius) {
      const angle = Math.atan2(player.y - orb.y, player.x - orb.x);
      const pullSpeed =
        gameState.magnetBoostTimer > 0 ? 780 : 210 + (1 - distance / magnetRadius) * 260;

      orb.x += Math.cos(angle) * pullSpeed * deltaTime;
      orb.y += Math.sin(angle) * pullSpeed * deltaTime;
    }

    if (distance < player.radius + orb.radius) {
      addExperience(orb.value);
      onExpOrbCollected();
      expOrbs.splice(index, 1);
    }
  }
}

function onExpOrbCollected() {
  if (!isSynergyActive("knowledgeSurge")) {
    return;
  }

  gameState.synergy.knowledgeOrbCount += 1;

  if (
    gameState.synergy.knowledgeOrbCount >= 25 &&
    gameState.synergy.knowledgeCooldown <= 0 &&
    gameState.synergy.knowledgeBuffTimer <= 0
  ) {
    triggerKnowledgeSurge();
  }
}

function updateSupplyBoxes(deltaTime) {
  gameState.supplyTimer += deltaTime;

  if (gameState.supplyTimer >= 45) {
    gameState.supplyTimer = 0;
    spawnSupplyBox();
    showBanner("보급 상자 등장!", "#64f7b4");
  }

  for (let index = supplyBoxes.length - 1; index >= 0; index--) {
    const box = supplyBoxes[index];

    box.age += deltaTime;

    if (getDistance(player.x, player.y, box.x, box.y) < player.radius + box.radius) {
      applySupplyReward(box.x, box.y);
      supplyBoxes.splice(index, 1);
      continue;
    }

    if (box.age >= box.lifetime) {
      supplyBoxes.splice(index, 1);
    }
  }
}

function updateAuraDamage(deltaTime) {
  if (!gameState.aura.enabled) {
    return;
  }

  for (const target of getAllTargets()) {
    const distance = getDistance(player.x, player.y, target.x, target.y);

    if (distance < gameState.aura.radius + target.radius) {
      damageTarget(target, gameState.aura.damagePerSecond * deltaTime, 0, "수호 오라", {
        showText: false,
      });
    }
  }
}

function updateVisualEffects(deltaTime) {
  gameState.screenShakeTimer = Math.max(0, gameState.screenShakeTimer - deltaTime);

  for (const effect of effects) {
    effect.age += deltaTime;

    if (effect.type === "particle") {
      effect.x += effect.vx * deltaTime;
      effect.y += effect.vy * deltaTime;
      effect.vx *= Math.pow(0.08, deltaTime);
      effect.vy *= Math.pow(0.08, deltaTime);
    }
  }

  for (const line of lightningLines) {
    line.age += deltaTime;
  }

  for (const text of floatingTexts) {
    text.age += deltaTime;
    text.y += text.vy * deltaTime;
  }

  effects = effects.filter((effect) => effect.age < effect.duration);
  lightningLines = lightningLines.filter((line) => line.age < line.duration);
  floatingTexts = floatingTexts.filter((text) => text.age < text.duration);
}

function applySupplyReward(x, y) {
  const rewards = [
    {
      text: "HP 회복!",
      apply() {
        player.hp = Math.min(player.maxHp, player.hp + 20);
        addFloatingText("+20", player.x, player.y - player.radius - 24, "#64f7b4", 18, 0.8);
      },
    },
    {
      text: "전체 폭발!",
      apply() {
        playExplosionSound();

        for (const enemy of [...enemies]) {
          damageTarget(enemy, 6, 10, "전체 폭발");
        }

        for (const boss of [...bosses]) {
          damageTarget(boss, 2.5, 2, "전체 폭발");
        }

        addEffect({
          type: "circle",
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          radius: Math.max(window.innerWidth, window.innerHeight),
          duration: 0.38,
          color: "rgba(255, 212, 71, 0.16)",
        });
      },
    },
    {
      text: "자석 발동!",
      apply() {
        gameState.magnetBoostTimer = 5;
      },
    },
    {
      text: "공격력 증가!",
      apply() {
        gameState.attackBuffTimer = 10;
      },
    },
    {
      text: "이동 속도 증가!",
      apply() {
        gameState.speedBuffTimer = 10;
      },
    },
    {
      text: "경험치 보너스!",
      apply() {
        addExperience(25 + gameState.level * 5);
      },
    },
  ];
  const reward = rewards[Math.floor(Math.random() * rewards.length)];

  reward.apply();
  playBoxOpenSound();
  createSupplyBoxOpenEffect(x, y);
  addFloatingText(reward.text, x, y - 20, "#64f7b4", 22, 1.2);
  addEffect({
    type: "ring",
    x,
    y,
    radius: 54,
    duration: 0.42,
    color: "rgba(100, 247, 180, 0.7)",
  });
}

function createSupplyBoxOpenEffect(x, y) {
  addEffect({
    type: "circle",
    x,
    y,
    radius: 34,
    duration: 0.25,
    color: "rgba(255, 212, 71, 0.24)",
  });

  for (let index = 0; index < 6; index++) {
    const angle = (TAU * index) / 6;
    const sparkleX = x + Math.cos(angle) * 18;
    const sparkleY = y + Math.sin(angle) * 14;

    addFloatingText(index % 2 === 0 ? "*" : "$", sparkleX, sparkleY, "#ffd447", 18, 0.7);
  }
}

function handleBulletTargetCollisions() {
  for (let bulletIndex = bullets.length - 1; bulletIndex >= 0; bulletIndex--) {
    const bullet = bullets[bulletIndex];
    let shouldRemoveBullet = false;

    for (const target of getAllTargets()) {
      const distance = getDistance(bullet.x, bullet.y, target.x, target.y);
      const targetKey = getTargetKey(target);

      if (bullet.hitTargetKeys.has(targetKey)) {
        continue;
      }

      if (distance < bullet.radius + target.radius) {
        const hitX = target.x;
        const hitY = target.y;

        bullet.hitTargetKeys.add(targetKey);
        damageTarget(target, bullet.damage, 4, "자동 탄환");

        if (weapons.bullet.explosion.enabled) {
          explodeAt(
            hitX,
            hitY,
            weapons.bullet.explosion.radius,
            bullet.damage * weapons.bullet.explosion.damageRatio,
            "rgba(255, 212, 71, 0.38)",
            "폭발탄",
          );
        }

        if (gameState.chainLightning.enabled) {
          const extraTargets = isSynergyActive("chainPierce")
            ? Math.min(2, bullet.hitTargetKeys.size)
            : 0;
          const bossDamageMultiplier = isSynergyActive("chainPierce") ? 0.55 : 1;

          chainLightningFrom(
            hitX,
            hitY,
            bullet.damage * gameState.chainLightning.damageRatio,
            extraTargets,
            bossDamageMultiplier,
          );
        }

        bullet.pierceRemaining -= 1;
        shouldRemoveBullet = bullet.pierceRemaining < 0;

        if (shouldRemoveBullet && isSynergyActive("rupturePierce")) {
          explodeAt(
            hitX,
            hitY,
            46,
            bullet.damage * 0.45,
            "rgba(255, 156, 74, 0.34)",
            "파열 관통탄",
            0.5,
          );
        }
        break;
      }
    }

    if (shouldRemoveBullet) {
      bullets.splice(bulletIndex, 1);
    }
  }
}

function handleOrbitTargetCollisions() {
  for (const target of getAllTargets()) {
    for (const orb of orbitOrbs) {
      const distance = getDistance(orb.x, orb.y, target.x, target.y);

      if (distance < orb.radius + target.radius && target.orbCooldown <= 0) {
        target.orbCooldown = 0.35;
        damageTarget(target, orb.damage * getAttackMultiplier(), 10, "회전 구체");
        break;
      }
    }
  }
}

function handlePlayerTargetCollisions() {
  for (const target of getAllTargets()) {
    const distance = getDistance(player.x, player.y, target.x, target.y);

    if (distance < player.radius + target.radius && target.touchCooldown <= 0) {
      target.touchCooldown = 0.7;
      damagePlayer(target.damage, true);

      const angle = Math.atan2(target.y - player.y, target.x - player.x);
      target.x += Math.cos(angle) * 18;
      target.y += Math.sin(angle) * 18;
    }
  }
}

function damagePlayer(amount, triggerShockwave) {
  if (gameState.shield.enabled && (gameState.shield.ready || gameState.shield.charges > 0)) {
    if (gameState.shield.charges > 0) {
      gameState.shield.charges -= 1;
    }

    if (gameState.shield.charges <= 0) {
      gameState.shield.ready = false;
      gameState.shield.timer = gameState.shield.cooldown;
    }

    addFloatingText("방어!", player.x, player.y - 28, "#8be9ff", 20, 0.8);
    return;
  }

  player.hp -= amount;
  playPlayerDamageSound();
  addScreenShake(4, 0.1);
  addFloatingText(`-${Math.ceil(amount)}`, player.x, player.y - 28, "#ff6b81", 18, 0.8);

  if (isSynergyActive("bloodCounter")) {
    triggerBloodCounter();
  }

  if (triggerShockwave && gameState.onHitShockwave.enabled && gameState.onHitShockwave.timer <= 0) {
    createShockwave(
      player.x,
      player.y,
      gameState.onHitShockwave.radius,
      gameState.onHitShockwave.damage,
      gameState.onHitShockwave.force,
      "rgba(69, 208, 255, 0.46)",
      "충격파",
    );
    gameState.onHitShockwave.timer = gameState.onHitShockwave.cooldown;
  }

  if (player.hp <= 0) {
    endGame();
  }
}

function triggerBloodCounter() {
  if (gameState.synergy.bloodCounterCooldown > 0) {
    return;
  }

  const radius = 122;
  const damage = player.maxHp * 0.08;

  gameState.synergy.bloodCounterCooldown = 1.5;
  playExplosionSound();
  damageTargetsInRadius(player.x, player.y, radius, damage, "피의 반격", 0.5, 4);
  triggerHitStop(0.035);
  addFloatingText("피의 반격!", player.x, player.y - player.radius - 26, "#ff6b81", 21, 1);
  addEffect({
    type: "ring",
    x: player.x,
    y: player.y,
    radius,
    duration: 0.34,
    color: "rgba(255, 80, 104, 0.58)",
  });
}

function damageTarget(target, rawDamage, knockback, source, options = {}) {
  if (!target || target.hp <= 0) {
    return false;
  }

  let finalDamage = rawDamage;

  if (gameState.weakSpotEnabled && target.hp / target.maxHp <= 0.4) {
    finalDamage *= 1.35;
  }

  target.hp -= finalDamage;
  target.hitFlashTimer = target.kind === "boss" ? 0.06 : 0.08;
  recordWeaponDamage(source, finalDamage);

  if (options.showText !== false) {
    playHitSound();
  }

  if (options.showText !== false && finalDamage >= 0.5) {
    addDamageText(target, finalDamage, source);
  }

  if (knockback > 0) {
    const angle = Math.atan2(target.y - player.y, target.x - player.x);

    if (target.kind !== "boss") {
      const resistance = {
        normal: 1,
        fast: 1.12,
        tank: 0.25,
        elite: 0.45,
      }[target.type] ?? 1;
      const force = knockback * 18 * resistance;

      target.knockbackX = (target.knockbackX ?? 0) + Math.cos(angle) * force;
      target.knockbackY = (target.knockbackY ?? 0) + Math.sin(angle) * force;
    }
  }

  if (target.hp <= 0) {
    defeatTarget(target);
    return true;
  }

  return false;
}

function recordWeaponDamage(source, amount) {
  gameState.weaponDamage[source] = (gameState.weaponDamage[source] ?? 0) + amount;
}

function defeatTarget(target) {
  if (target.kind === "boss") {
    defeatBoss(target);
    return;
  }

  playEnemyDeathSound();
  gameState.score += target.score;
  gameState.kills += 1;
  spawnExpOrb(target.x, target.y, target.exp);

  if (target.type === "elite") {
    spawnExpBurst(target.x, target.y, 2, Math.ceil(target.exp * 0.45));
  }

  if (gameState.killHealChance > 0 && Math.random() < gameState.killHealChance) {
    player.hp = Math.min(player.maxHp, player.hp + 1);
    addFloatingText("+1", player.x, player.y - player.radius - 24, "#64f7b4", 15, 0.7);
  }

  if (gameState.flameBurst.enabled && Math.random() < gameState.flameBurst.chance) {
    createFlameZone(target.x, target.y);
  }

  addEnemyDefeatParticles(target);
  addEffect({
    type: "circle",
    x: target.x,
    y: target.y,
    radius: target.radius + (target.type === "elite" ? 34 : 20),
    duration: target.type === "elite" ? 0.36 : 0.28,
    color: target.type === "elite" ? "rgba(255, 212, 71, 0.34)" : "rgba(255, 94, 104, 0.32)",
  });
  enemies = enemies.filter((enemy) => enemy !== target);
}

function addEnemyDefeatParticles(target) {
  const particleSettings = {
    normal: { count: 5, color: "rgba(255, 107, 129, 0.9)", speed: 105, size: 2.6, duration: 0.42 },
    fast: { count: 5, color: "rgba(255, 177, 67, 0.92)", speed: 155, size: 2.2, duration: 0.36 },
    tank: { count: 7, color: "rgba(109, 93, 252, 0.9)", speed: 95, size: 3.7, duration: 0.55 },
    elite: { count: 9, color: "rgba(255, 212, 71, 0.95)", speed: 145, size: 3.2, duration: 0.58 },
  };

  addParticleBurst(target.x, target.y, particleSettings[target.type] ?? particleSettings.normal);
}

function defeatBoss(boss) {
  playEnemyDeathSound();
  gameState.score += boss.score;
  gameState.kills += 1;
  gameState.bossKills += 1;
  gameState.bossKillCounts[boss.bossType] = (gameState.bossKillCounts[boss.bossType] ?? 0) + 1;
  if (boss.isFinalBoss) {
    gameState.finalBossDefeated = true;
  }
  spawnExpBurst(boss.x, boss.y, boss.expOrbs, boss.exp);

  for (let index = 0; index < boss.supplyDrops; index++) {
    spawnSupplyBox(boss.x + (index - 0.5) * 36, boss.y + Math.random() * 28 - 14);
  }

  addFloatingText(`${boss.label} 처치!`, boss.x, boss.y - boss.radius, "#ffd447", 26, 1.5);
  addScreenShake(boss.isFinalBoss ? 12 : 8, boss.isFinalBoss ? 0.24 : 0.16);
  triggerHitStop(boss.isFinalBoss ? 0.06 : 0.045);
  addParticleBurst(boss.x, boss.y, {
    count: boss.isFinalBoss ? 22 : 15,
    color: boss.isFinalBoss ? "rgba(255, 212, 71, 0.98)" : "rgba(255, 212, 71, 0.9)",
    speed: boss.isFinalBoss ? 210 : 165,
    size: boss.isFinalBoss ? 4.8 : 4,
    duration: boss.isFinalBoss ? 0.9 : 0.7,
  });
  addEffect({
    type: "circle",
    x: boss.x,
    y: boss.y,
    radius: boss.radius + 70,
    duration: 0.55,
    color: "rgba(255, 212, 71, 0.34)",
  });
  bosses = bosses.filter((item) => item !== boss);

  if (boss.isFinalBoss) {
    clearGame();
  }
}

function addExperience(amount) {
  gameState.exp += Math.ceil(amount * gameState.expGainMultiplier);
  checkLevelUp();
}

function checkLevelUp() {
  if (gameState.isLevelingUp || gameState.isSynergyPopupOpen || gameState.exp < gameState.expToNext) {
    return;
  }

  gameState.exp -= gameState.expToNext;
  gameState.level += 1;
  gameState.expToNext = Math.floor(gameState.expToNext * 1.28 + 8);
  startLevelUp();
}

function startLevelUp() {
  gameState.isLevelingUp = true;
  gameState.isChoosingUpgrade = false;
  gameState.currentUpgrades = rollUpgradeChoices(3);
  levelUpScreen.classList.remove("has-legendary");
  playLevelUpSound();
  setUiBlocking(true);
  addEffect({
    type: "screen-flash",
    duration: 0.55,
    color: "rgba(69, 208, 255, 0.18)",
  });
  showBanner("LEVEL UP!", "#45d0ff");
  renderUpgradeChoices();
  updateHud();
  levelUpScreen.classList.remove("hidden");
}

function rollUpgradeChoices(count) {
  const choices = [];

  while (choices.length < count) {
    const rarity = pickRarity();
    const choice = pickUpgradeByRarity(rarity, choices);

    if (!choice) {
      break;
    }

    choices.push(choice);
  }

  return choices;
}

function pickRarity() {
  const roll = Math.random();
  const chances = getEffectiveRarityChances();

  if (roll < chances.common) return "common";
  if (roll < chances.common + chances.rare) return "rare";
  if (roll < chances.common + chances.rare + chances.epic) {
    return "epic";
  }

  return "legendary";
}

function pickUpgradeByRarity(rarity, currentChoices) {
  const currentIds = new Set(currentChoices.map((upgrade) => upgrade.id));
  let candidates = getAvailableUpgrades().filter(
    (upgrade) => upgrade.rarity === rarity && !currentIds.has(upgrade.id),
  );

  if (candidates.length === 0) {
    candidates = getAvailableUpgrades().filter((upgrade) => !currentIds.has(upgrade.id));
  }

  if (candidates.length === 0) {
    return null;
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

function getAvailableUpgrades() {
  return upgrades.filter((upgrade) => {
    const maxStacks = upgrade.maxStacks ?? Infinity;
    const currentStacks = gameState.upgradeCounts[upgrade.id] ?? 0;
    const isAvailable = upgrade.isAvailable ? upgrade.isAvailable() : true;

    return isAvailable && currentStacks < maxStacks;
  });
}

// ===== 히든 시너지 =====
function hasUpgrade(upgradeId) {
  return (gameState?.upgradeCounts?.[upgradeId] ?? 0) > 0;
}

function hasAnyUpgrade(upgradeIds) {
  return upgradeIds.some((upgradeId) => hasUpgrade(upgradeId));
}

function isSynergyActive(synergyId) {
  return Boolean(gameState?.activeSynergies?.has(synergyId));
}

function initializeSynergyState(synergyId) {
  if (!gameState?.synergy) {
    return;
  }

  if (synergyId === "rapidPierce") {
    gameState.synergy.rapidPierceCooldown = 0;
    gameState.synergy.rapidPierceActiveTimer = 0;
  }

  if (synergyId === "knowledgeSurge") {
    gameState.synergy.knowledgeOrbCount = 0;
    gameState.synergy.knowledgeCooldown = 0;
    gameState.synergy.knowledgeBuffTimer = 0;
  }

  if (synergyId === "shrapnelBomb") {
    gameState.bombPocket.stacks = Math.max(gameState.bombPocket.stacks, gameState.upgradeCounts["bomb-pocket"] ?? 0);
  }
}

function checkSynergies() {
  if (!gameState?.activeSynergies) {
    return;
  }

  for (const synergy of Object.values(synergyDefinitions)) {
    if (isSynergyActive(synergy.id)) {
      continue;
    }

    try {
      if (synergy.condition()) {
        activateSynergy(synergy.id);
      }
    } catch {
      // 조건 체크 중 예외가 나도 게임 진행은 막지 않는다.
    }
  }
}

function activateSynergy(synergyId) {
  const synergy = synergyDefinitions[synergyId];

  if (!synergy || isSynergyActive(synergyId)) {
    return;
  }

  gameState.activeSynergies.add(synergyId);
  initializeSynergyState(synergyId);

  if (unlockSynergy(synergyId)) {
    showSynergyUnlockPopup(synergy);
    return;
  }

  showBanner(`시너지 활성화: ${synergy.name}`, "#8be9ff");
  addFloatingText(synergy.name, player.x, player.y - player.radius - 28, "#8be9ff", 21, 1.2);
  playSynergyActivateSound();
}

function unlockSynergy(synergyId) {
  if (!permanentSave.unlockedSynergies) {
    permanentSave.unlockedSynergies = createDefaultSynergyUnlocks();
  }

  if (permanentSave.unlockedSynergies[synergyId]) {
    return false;
  }

  permanentSave.unlockedSynergies[synergyId] = true;
  savePermanentSave();
  renderSynergyCollection();
  return true;
}

function showSynergyUnlockPopup(synergy) {
  if (!gameState) {
    return;
  }

  gameState.pendingSynergyPopups.push(synergy);

  if (!gameState.isSynergyPopupOpen) {
    openNextSynergyPopup();
  }
}

function openNextSynergyPopup() {
  if (!gameState?.pendingSynergyPopups?.length || !synergyPopupScreen) {
    gameState.isSynergyPopupOpen = false;
    return;
  }

  const synergy = gameState.pendingSynergyPopups.shift();

  if (synergyPopupName) synergyPopupName.textContent = synergy.name;
  if (synergyPopupCondition) synergyPopupCondition.textContent = synergy.conditionText;
  if (synergyPopupDescription) synergyPopupDescription.textContent = synergy.description;

  synergyPopupScreen.classList.remove("hidden");
  gameState.isSynergyPopupOpen = true;
  setUiBlocking(true);
  resetJoystick();
  addScreenShake(5, 0.12);
  playSynergyUnlockSound();
}

function closeSynergyPopup() {
  synergyPopupScreen?.classList.add("hidden");

  if (gameState?.pendingSynergyPopups?.length) {
    openNextSynergyPopup();
    return;
  }

  if (gameState) {
    gameState.isSynergyPopupOpen = false;
    lastTime = performance.now();
  }

  const collectionOpen = synergyCollectionScreen && !synergyCollectionScreen.classList.contains("hidden");
  const shouldBlock =
    !gameState?.isStarted ||
    gameState?.isLevelingUp ||
    gameState?.isGameOver ||
    gameState?.isPaused ||
    collectionOpen;

  setUiBlocking(shouldBlock);

  if (gameState?.isStarted && !gameState.isGameOver && !gameState.isLevelingUp) {
    checkLevelUp();
  }
}

function renderSynergyCollection() {
  if (!synergyCollectionList) {
    return;
  }

  const definitions = Object.values(synergyDefinitions);
  const unlocked = permanentSave.unlockedSynergies ?? createDefaultSynergyUnlocks();

  synergyCollectionList.innerHTML = "";

  for (let index = 0; index < SYNERGY_COLLECTION_SIZE; index++) {
    const synergy = definitions[index];
    const card = document.createElement("article");

    if (!synergy) {
      card.className = "synergy-card is-coming-soon";
      card.innerHTML = `
        <strong>???</strong>
        <p>조건: ???</p>
        <p>효과: Coming Soon</p>
      `;
      synergyCollectionList.appendChild(card);
      continue;
    }

    const isUnlocked = Boolean(unlocked[synergy.id]);
    card.className = `synergy-card ${isUnlocked ? "is-unlocked" : "is-locked"}`;
    card.innerHTML = isUnlocked
      ? `
        <strong>${synergy.name}</strong>
        <p>조건: ${synergy.conditionText}</p>
        <p>효과: ${synergy.description}</p>
      `
      : `
        <strong>${synergy.hiddenName}</strong>
        <p>조건: ???</p>
        <p>효과: ???</p>
      `;
    synergyCollectionList.appendChild(card);
  }
}

function openSynergyCollection() {
  renderSynergyCollection();
  synergyCollectionScreen?.classList.remove("hidden");
  setUiBlocking(true);
  resetJoystick();
}

function closeSynergyCollection() {
  synergyCollectionScreen?.classList.add("hidden");

  const shouldBlock =
    !gameState?.isStarted ||
    gameState?.isLevelingUp ||
    gameState?.isGameOver ||
    gameState?.isSynergyPopupOpen ||
    gameState?.isPaused;

  setUiBlocking(shouldBlock);
}

// ===== 증강 선택 UI =====
function renderUpgradeChoices() {
  upgradeChoices.innerHTML = "";
  levelUpScreen.classList.toggle(
    "has-legendary",
    gameState.currentUpgrades.some((upgrade) => upgrade.rarity === "legendary"),
  );

  gameState.currentUpgrades.forEach((upgrade, index) => {
    const button = document.createElement("button");
    const rarity = rarityInfo[upgrade.rarity];

    button.className = `augment-card rarity-${upgrade.rarity}`;
    button.type = "button";
    button.dataset.upgradeId = upgrade.id;
    button.style.animationDelay = `${index * 0.1}s`;
    button.innerHTML = `
      <span class="augment-meta">
        <span class="augment-rarity">${rarity.label}</span>
        <span class="augment-type">${upgrade.type}</span>
      </span>
      <strong>${upgrade.name}</strong>
      <span class="augment-description">${upgrade.description}</span>
      <span class="augment-effect">효과: ${upgrade.effectText}</span>
    `;
    button.addEventListener("click", () => chooseUpgrade(upgrade, button));
    upgradeChoices.appendChild(button);
  });

  rerollButton.textContent = `재선택 ${gameState.rerolls}`;
  rerollButton.classList.toggle("hidden", gameState.rerolls <= 0);
}

function chooseUpgrade(upgrade, selectedButton = null) {
  if (gameState.isChoosingUpgrade) {
    return;
  }

  gameState.isChoosingUpgrade = true;
  playUpgradeSelectSound();

  if (selectedButton) {
    selectedButton.classList.add("is-selected");

    for (const card of Array.from(upgradeChoices.children)) {
      if (card !== selectedButton) {
        card.classList.add("is-dimmed");
      }
    }
  }

  const finishUpgradeChoice = () => {
    upgrade.apply();
    gameState.upgradeCounts[upgrade.id] = (gameState.upgradeCounts[upgrade.id] ?? 0) + 1;
    gameState.selectedUpgradeCount += 1;

    if (upgrade.rarity === "legendary") {
      gameState.selectedLegendaryCount += 1;
    }

    gameState.isLevelingUp = false;
    gameState.isChoosingUpgrade = false;
    gameState.currentUpgrades = [];
    levelUpScreen.classList.add("hidden");
    levelUpScreen.classList.remove("has-legendary");
    updateHud();
    checkSynergies();

    if (gameState.isSynergyPopupOpen) {
      setUiBlocking(true);
    } else {
      setUiBlocking(false);
      checkLevelUp();
    }
  };

  if (selectedButton && typeof window.setTimeout === "function") {
    window.setTimeout(finishUpgradeChoice, 200);
  } else {
    finishUpgradeChoice();
  }
}

function rerollUpgrades() {
  if (!gameState.isLevelingUp || gameState.isChoosingUpgrade || gameState.rerolls <= 0) {
    return;
  }

  gameState.rerolls -= 1;
  gameState.currentUpgrades = rollUpgradeChoices(3);
  renderUpgradeChoices();
}

function updateGame(deltaTime) {
  gameState.elapsedTime += deltaTime;
  gameState.hitStopCooldown = Math.max(0, gameState.hitStopCooldown - deltaTime);
  checkBossSpawn();

  const difficulty = getDifficulty();

  gameState.enemySpawnTimer += deltaTime;
  if (gameState.enemySpawnTimer >= difficulty.spawnDelay) {
    gameState.enemySpawnTimer = 0;
    spawnEnemy();
  }

  updatePlayer(deltaTime);
  updateTimedEffects(deltaTime);
  updateSynergies(deltaTime);
  updateWeapons(deltaTime);
  updateBosses(deltaTime);
  updateBullets(deltaTime);
  updateOrbitOrbs(deltaTime);
  updateBombs(deltaTime);
  updateFlameZones(deltaTime);
  updateMeteors(deltaTime);
  updateClones(deltaTime);
  updateEnemies(deltaTime);
  updateExpOrbs(deltaTime);
  updateSupplyBoxes(deltaTime);
  updateAuraDamage(deltaTime);
  handleBulletTargetCollisions();
  handleOrbitTargetCollisions();
  handlePlayerTargetCollisions();
  updateVisualEffects(deltaTime);
  updateHud();
}

// ===== 그리기 =====
function drawBackground() {
  ctx.fillStyle = "#17181d";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;

  const gridSize = 48;
  const offsetX = -(player.x % gridSize);
  const offsetY = -(player.y % gridSize);

  for (let x = offsetX; x < window.innerWidth; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, window.innerHeight);
    ctx.stroke();
  }

  for (let y = offsetY; y < window.innerHeight; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.stroke();
  }
}

function loadImageAssets() {
  if (typeof Image === "undefined") {
    return;
  }

  for (const [key, path] of Object.entries(assetPaths)) {
    const image = new Image();
    const asset = {
      image,
      loaded: false,
      failed: false,
    };

    loadedImages[key] = asset;
    image.onload = () => {
      asset.loaded = true;
    };
    image.onerror = () => {
      asset.failed = true;
    };
    image.src = path;
  }
}

function getLoadedImage(key) {
  const asset = loadedImages[key];

  if (!asset || !asset.loaded || asset.failed) {
    return null;
  }

  return asset.image;
}

function drawFallbackCircle(entity, fillColor, strokeColor, options = {}) {
  const borderWidth = options.borderWidth ?? 3;

  ctx.save();

  if (options.glowColor) {
    ctx.beginPath();
    ctx.arc(entity.x, entity.y, entity.radius + borderWidth + 5, 0, TAU);
    ctx.fillStyle = options.glowColor;
    ctx.fill();
  }

  if (options.shadow) {
    ctx.shadowColor = options.glowColor || "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = options.shadowBlur ?? 16;
  }

  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, 0, TAU);
  ctx.fillStyle = fillColor;
  ctx.fill();

  if (strokeColor) {
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }

  ctx.restore();
}

function drawCircularImage(image, x, y, radius, options = {}) {
  const fallbackFill = options.fallbackFill ?? "#45a3ff";
  const borderColor = options.borderColor ?? "#ffffff";
  const borderWidth = options.borderWidth ?? 3;
  const width = image?.naturalWidth || image?.width || 0;
  const height = image?.naturalHeight || image?.height || 0;

  if (!image || !width || !height || typeof ctx.clip !== "function" || typeof ctx.drawImage !== "function") {
    drawFallbackCircle({ x, y, radius }, fallbackFill, borderColor, options);
    return false;
  }

  ctx.save();

  if (options.glowColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius + borderWidth + 6, 0, TAU);
    ctx.fillStyle = options.glowColor;
    ctx.fill();
  }

  if (options.shadow) {
    ctx.shadowColor = options.shadowColor || options.glowColor || "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = options.shadowBlur ?? 16;
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.clip();

  // center-crop: 사진 비율이 달라도 원 안에서 찌그러지지 않게 중앙을 잘라서 그린다.
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = width;
  let sourceHeight = height;

  if (width > height) {
    sourceWidth = height;
    sourceX = (width - height) / 2;
  } else if (height > width) {
    sourceHeight = width;
    sourceY = (height - width) / 2;
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = borderColor;
  ctx.stroke();
  ctx.restore();

  return true;
}

function drawCircle(entity, fillColor, strokeColor) {
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius, 0, TAU);
  ctx.fillStyle = fillColor;
  ctx.fill();

  if (strokeColor) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
}

function drawEnemyHp(enemy) {
  const width = enemy.radius * 2;
  const height = enemy.kind === "boss" ? 7 : enemy.type === "tank" ? 6 : 4;
  const x = enemy.x - width / 2;
  const y = enemy.y - enemy.radius - 10;
  const ratio = Math.max(0, enemy.hp / enemy.maxHp);

  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = enemy.kind === "boss" ? "#ffd447" : "#f6f2e8";
  ctx.fillRect(x, y, width * ratio, height);
}

function drawPlayer() {
  drawCircularImage(getLoadedImage("player"), player.x, player.y, player.radius, {
    borderColor: "#d8f5ff",
    borderWidth: 3,
    fallbackFill: "#45a3ff",
    glowColor: "rgba(69, 208, 255, 0.28)",
    shadow: true,
    shadowBlur: 18,
  });
}

function drawHitFlash(entity) {
  if ((entity.hitFlashTimer ?? 0) <= 0) {
    return;
  }

  const alpha = Math.min(0.42, (entity.hitFlashTimer / 0.08) * 0.36);

  ctx.save();
  ctx.beginPath();
  ctx.arc(entity.x, entity.y, entity.radius + 1, 0, TAU);
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawFastEnemyTrail(enemy) {
  const angle = Math.atan2(enemy.y - player.y, enemy.x - player.x);

  ctx.save();
  for (let index = 1; index <= 3; index++) {
    const alpha = 0.2 / index;
    const offset = enemy.radius + index * 7;

    ctx.beginPath();
    ctx.arc(enemy.x + Math.cos(angle) * offset, enemy.y + Math.sin(angle) * offset, enemy.radius * (0.8 - index * 0.13), 0, TAU);
    ctx.fillStyle = `rgba(255, 180, 67, ${alpha})`;
    ctx.fill();
  }
  ctx.restore();
}

function drawEnemyIcon(enemy) {
  if (enemy.type !== "elite") {
    return;
  }

  ctx.save();
  ctx.translate(enemy.x, enemy.y - enemy.radius - 12);
  ctx.beginPath();

  for (let index = 0; index < 10; index++) {
    const radius = index % 2 === 0 ? 8 : 3.5;
    const angle = -Math.PI / 2 + index * (Math.PI / 5);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  if (typeof ctx.closePath === "function") {
    ctx.closePath();
  }

  ctx.fillStyle = "#ffd447";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}

function drawEnemy(enemy) {
  const styles = {
    normal: {
      borderColor: "#ff6b81",
      borderWidth: 2,
      fallbackFill: enemy.fill,
      glowColor: "rgba(255, 94, 104, 0.12)",
    },
    fast: {
      borderColor: "#ffb143",
      borderWidth: 2,
      fallbackFill: "#ff7043",
      glowColor: "rgba(255, 177, 67, 0.18)",
    },
    tank: {
      borderColor: "#6d5dfc",
      borderWidth: 5,
      fallbackFill: "#5a243f",
      glowColor: "rgba(109, 93, 252, 0.2)",
      shadow: true,
      shadowBlur: 16,
    },
    elite: {
      borderColor: "#ffd447",
      borderWidth: 4,
      fallbackFill: "#8c1d2e",
      glowColor: "rgba(255, 212, 71, 0.28)",
      shadow: true,
      shadowBlur: 18,
    },
  };
  const style = { ...(styles[enemy.type] || styles.normal) };

  if (enemy.freezeTimer > 0) {
    style.borderColor = "#8be9ff";
    style.glowColor = "rgba(139, 233, 255, 0.34)";
    style.shadow = true;
    style.shadowBlur = 18;
  }

  if (enemy.type === "fast") {
    drawFastEnemyTrail(enemy);
  }

  drawCircularImage(getLoadedImage("enemy"), enemy.x, enemy.y, enemy.radius, style);
  drawHitFlash(enemy);
  drawEnemyIcon(enemy);
}

function getBossDrawStyle(boss) {
  if (boss.isFinalBoss) {
    const config = difficultyConfigs[boss.difficultyKey] ?? difficultyConfigs.normal;

    return {
      imageKey: "bigboss",
      borderColor: config.finalBossColor,
      borderWidth: 7,
      fallbackFill: boss.fill,
      glowColor: config.finalBossGlow,
      shadow: true,
      shadowBlur: boss.difficultyKey === "hell" ? 36 : 30,
    };
  }

  if (boss.bossType === "big") {
    return {
      imageKey: "bigboss",
      borderColor: "#ffd447",
      borderWidth: 6,
      fallbackFill: boss.fill,
      glowColor: "rgba(255, 76, 64, 0.34)",
      shadow: true,
      shadowBlur: 28,
    };
  }

  if (boss.bossType === "mid") {
    return {
      imageKey: "midboss",
      borderColor: "#d6a8ff",
      borderWidth: 5,
      fallbackFill: boss.fill,
      glowColor: "rgba(180, 108, 255, 0.3)",
      shadow: true,
      shadowBlur: 22,
    };
  }

  return {
    imageKey: "miniboss",
    borderColor: "#b9ddff",
    borderWidth: 4,
    fallbackFill: boss.fill,
    glowColor: "rgba(69, 163, 255, 0.24)",
    shadow: true,
    shadowBlur: 18,
  };
}

function getBossAppearScale(boss) {
  const duration = boss.spawnDuration ?? 0.45;

  if (!duration || boss.spawnAge >= duration) {
    return 1;
  }

  const progress = boss.spawnAge / duration;
  return 0.78 + 0.22 * Math.sin((progress * Math.PI) / 2);
}

function drawBoss(boss) {
  const style = getBossDrawStyle(boss);
  const drawRadius = boss.radius * getBossAppearScale(boss);

  drawCircularImage(getLoadedImage(style.imageKey), boss.x, boss.y, drawRadius, style);
  drawHitFlash(boss);
}

function drawBossBars() {
  const finalBoss = bosses.find((boss) => boss.isFinalBoss);
  let startY = 68;

  if (finalBoss) {
    const width = Math.min(620, window.innerWidth - 36);
    const height = 15;
    const x = (window.innerWidth - width) / 2;
    const y = 60;
    const ratio = Math.max(0, finalBoss.hp / finalBoss.maxHp);

    ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = finalBoss.fill;
    ctx.fillRect(x, y, width * ratio, height);
    ctx.strokeStyle = "rgba(246, 242, 232, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = "#f6f2e8";
    ctx.font = "900 14px Segoe UI, Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(finalBoss.label, x, y - 6);
    startY = 86;
  }

  const activeBosses = bosses.filter((boss) => !boss.isFinalBoss).slice(0, 3);

  for (let index = 0; index < activeBosses.length; index++) {
    const boss = activeBosses[index];
    const width = Math.min(460, window.innerWidth - 48);
    const height = 10;
    const x = (window.innerWidth - width) / 2;
    const y = startY + index * 18;
    const ratio = Math.max(0, boss.hp / boss.maxHp);

    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = boss.fill;
    ctx.fillRect(x, y, width * ratio, height);
    ctx.fillStyle = "#f6f2e8";
    ctx.font = "12px Segoe UI, Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(boss.label, x, y - 4);
  }
}

function drawPlayerAuras() {
  if (gameState.coldAura.enabled) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, gameState.coldAura.radius, 0, TAU);
    ctx.strokeStyle = "rgba(69, 163, 255, 0.26)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  if (gameState.aura.enabled) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, gameState.aura.radius, 0, TAU);
    ctx.strokeStyle = "rgba(180, 108, 255, 0.28)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  if (gameState.shield.enabled && (gameState.shield.ready || gameState.shield.charges > 0)) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius + 9, 0, TAU);
    ctx.strokeStyle = "rgba(69, 208, 255, 0.76)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function drawSupplyBoxes() {
  for (const box of supplyBoxes) {
    const distanceToPlayer = getDistance(player.x, player.y, box.x, box.y);
    const isNearPlayer = distanceToPlayer < player.radius + box.radius + 46;
    const pulse = 1 + Math.sin(box.age * 5) * 0.06 + (isNearPlayer ? 0.08 : 0);
    const width = box.radius * 2.8 * pulse;
    const height = box.radius * 2.1 * pulse;
    const lidHeight = height * 0.42;
    const sparkleAlpha = 0.45 + Math.sin(box.age * 7) * 0.2;

    ctx.save();
    ctx.translate(box.x, box.y);

    ctx.beginPath();
    ctx.arc(0, 2, width * 0.8, 0, TAU);
    ctx.fillStyle = `rgba(255, 212, 71, ${isNearPlayer ? 0.18 : 0.1})`;
    ctx.fill();

    ctx.beginPath();
    if (typeof ctx.ellipse === "function") {
      ctx.ellipse(0, height * 0.48, width * 0.55, height * 0.18, 0, 0, TAU);
    } else {
      ctx.arc(0, height * 0.48, width * 0.38, 0, TAU);
    }
    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fill();

    ctx.shadowColor = "rgba(255, 212, 71, 0.42)";
    ctx.shadowBlur = isNearPlayer ? 20 : 12;

    ctx.fillStyle = "#7a3f1b";
    ctx.fillRect(-width / 2, -height * 0.18, width, height * 0.62);
    ctx.fillStyle = "#b96a28";
    ctx.fillRect(-width / 2, -height * 0.18 - lidHeight, width, lidHeight);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#ffd447";
    ctx.lineWidth = 3;
    ctx.strokeRect(-width / 2, -height * 0.18 - lidHeight, width, height * 1.04);

    ctx.fillStyle = "#f6c04b";
    ctx.fillRect(-width * 0.08, -height * 0.18 - lidHeight, width * 0.16, height * 1.04);
    ctx.fillRect(-width / 2, -height * 0.05, width, height * 0.12);

    ctx.fillStyle = "#ffd447";
    ctx.fillRect(-width * 0.13, height * 0.03, width * 0.26, height * 0.22);
    ctx.fillStyle = "#2a1d16";
    ctx.fillRect(-width * 0.035, height * 0.09, width * 0.07, height * 0.1);

    ctx.fillStyle = "rgba(255, 248, 198, 0.9)";
    ctx.font = "900 10px Segoe UI, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BOX", 0, -height * 0.32);

    ctx.fillStyle = `rgba(255, 248, 198, ${sparkleAlpha})`;
    for (let index = 0; index < 4; index++) {
      const angle = box.age * 2.1 + index * (TAU / 4);
      const sparkleX = Math.cos(angle) * width * 0.72;
      const sparkleY = Math.sin(angle) * height * 0.62;

      ctx.beginPath();
      ctx.arc(sparkleX, sparkleY, 2.2, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
  }
}

function drawBombs() {
  for (const bomb of bombs) {
    const pulse = 0.75 + Math.sin(bomb.age * 16) * 0.25;

    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, 9 + pulse * 3, 0, TAU);
    ctx.fillStyle = "#ffd447";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bomb.x, bomb.y, bomb.radius, 0, TAU);
    ctx.strokeStyle = "rgba(255, 212, 71, 0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawEffects() {
  for (const effect of effects) {
    const progress = effect.age / effect.duration;
    const alpha = Math.max(0, 1 - progress);

    if (effect.type === "screen-flash") {
      ctx.fillStyle = effect.color;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      continue;
    }

    if (effect.type === "particle") {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(effect.x, effect.y, effect.radius * Math.max(0.2, alpha), 0, TAU);
      ctx.fillStyle = effect.color;
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }

    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius * Math.max(0.08, progress), 0, TAU);

    if (effect.type === "ring") {
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = 6 * alpha;
      ctx.stroke();
    } else {
      ctx.fillStyle = effect.color;
      ctx.fill();
    }
  }
}

function drawFlameZones() {
  for (const zone of flameZones) {
    const alpha = Math.max(0, 1 - zone.age / zone.duration);

    ctx.beginPath();
    ctx.arc(zone.x, zone.y, zone.radius, 0, TAU);
    ctx.fillStyle = `rgba(255, 112, 67, ${0.22 * alpha})`;
    ctx.fill();
  }
}

function drawMeteors() {
  for (const meteor of meteors) {
    const progress = Math.min(1, meteor.age / meteor.warningTime);

    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, meteor.radius * progress, 0, TAU);
    ctx.strokeStyle = meteor.hasHit ? "rgba(255, 212, 71, 0.86)" : "rgba(255, 94, 104, 0.7)";
    ctx.lineWidth = meteor.hasHit ? 8 : 3;
    ctx.stroke();
  }
}

function drawLightning() {
  for (const line of lightningLines) {
    const alpha = Math.max(0, 1 - line.age / line.duration);

    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.strokeStyle = `rgba(139, 233, 255, ${alpha})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function drawFloatingTexts() {
  for (const text of floatingTexts) {
    const alpha = Math.max(0, 1 - text.age / text.duration);

    ctx.globalAlpha = alpha;
    ctx.fillStyle = text.color;
    ctx.font = `${text.weight ?? 800} ${text.size}px Segoe UI, Arial, sans-serif`;
    ctx.textAlign = text.align ?? "center";
    ctx.fillText(text.text, text.x, text.y);
    ctx.globalAlpha = 1;
  }
}

function drawTimeSlowOverlay() {
  if (gameState.timeSlow.activeTimer <= 0) {
    return;
  }

  ctx.fillStyle = "rgba(69, 208, 255, 0.08)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function applyScreenShake() {
  if (gameState.screenShakeTimer <= 0 || gameState.screenShakeDuration <= 0) {
    return false;
  }

  const progress = gameState.screenShakeTimer / gameState.screenShakeDuration;
  const strength = gameState.screenShakeStrength * progress;

  ctx.save();
  ctx.translate((Math.random() - 0.5) * strength, (Math.random() - 0.5) * strength);
  return true;
}

function drawGame() {
  const isShaking = applyScreenShake();

  drawBackground();
  drawTimeSlowOverlay();
  drawPlayerAuras();
  drawFlameZones();
  drawMeteors();
  drawSupplyBoxes();
  drawBombs();
  drawEffects();
  drawLightning();

  for (const expOrb of expOrbs) {
    drawCircle(expOrb, "#64f7b4", "#c8ffe6");
  }

  for (const bullet of bullets) {
    drawCircle(bullet, "#ffd447", "#fff3a3");
  }

  for (const enemy of enemies) {
    drawEnemy(enemy);
    drawEnemyHp(enemy);
  }

  for (const boss of bosses) {
    drawBoss(boss);
    drawEnemyHp(boss);
  }

  for (const orb of orbitOrbs) {
    drawCircle(orb, "#8be9ff", "#ffffff");
  }

  for (const clone of clones) {
    drawCircle({ x: clone.x, y: clone.y, radius: 10 }, "#8be9ff", "#ffffff");
  }

  drawPlayer();
  drawBossBars();
  drawFloatingTexts();

  if (isShaking) {
    ctx.restore();
  }
}

function gameLoop(currentTime) {
  if (gameState.isGameOver) {
    return;
  }

  const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);
  lastTime = currentTime;

  if (gameState.hitStopTimer > 0 && !gameState.isPaused) {
    gameState.hitStopTimer = Math.max(0, gameState.hitStopTimer - deltaTime);
  } else if (gameState.isStarted && !gameState.isLevelingUp && !gameState.isSynergyPopupOpen && !gameState.isPaused) {
    updateGame(deltaTime);
  } else if (gameState.isStarted && !gameState.isPaused) {
    updateVisualEffects(deltaTime);
  }

  drawGame();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function endGame() {
  if (gameState.isGameOver) {
    return;
  }

  gameState.isGameOver = true;
  playGameOverSound();
  stopBgm();

  const bestScore = Math.max(gameState.bestScore, gameState.score);
  const bestTime = Math.max(gameState.bestTime, gameState.elapsedTime);

  awardSoulForRun(bestScore, bestTime);
  saveRecords(bestScore, bestTime);
  renderResultStats(bestScore, bestTime);
  levelUpScreen.classList.add("hidden");
  clearScreen?.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  setUiBlocking(true);
  updatePauseUi();
  maybeShowPermanentGuide();
  cancelAnimationFrame(animationFrameId);
}

function clearGame() {
  if (gameState.isGameOver || gameState.isGameCleared) {
    return;
  }

  gameState.isGameCleared = true;
  gameState.isGameOver = true;
  addScreenShake(10, 0.22);
  addEffect({
    type: "screen-flash",
    duration: 0.45,
    color: "rgba(255, 212, 71, 0.18)",
  });
  playGameClearSound();
  stopBgm();

  const bestScore = Math.max(gameState.bestScore, gameState.score);
  const bestTime = Math.max(gameState.bestTime, gameState.elapsedTime);

  awardSoulForRun(bestScore, bestTime);
  saveRecords(bestScore, bestTime);
  const clearInfo = saveDifficultyClearRecord();

  renderClearStats(bestScore, bestTime, clearInfo);
  levelUpScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  clearScreen?.classList.remove("hidden");
  setUiBlocking(true);
  updatePauseUi();
  cancelAnimationFrame(animationFrameId);
}

function renderResultStats(bestScore, bestTime) {
  const rows = [
    ["생존 시간", formatTime(gameState.elapsedTime)],
    ["처치 수", gameState.kills],
    ["최종 레벨", gameState.level],
    ["점수", gameState.score],
    ["처치한 보스 수", gameState.bossKills],
    ["이번 판 획득 Soul", gameState.earnedSoul],
    ["총 보유 Soul", permanentSave.soul],
    ["최고 생존 시간", formatTime(bestTime)],
    ["최고 점수", bestScore],
    ["획득한 증강", gameState.selectedUpgradeCount],
    ["최다 피해 무기", getTopDamageSource()],
    ["전설 증강", gameState.selectedLegendaryCount],
  ];

  resultStats.innerHTML = rows
    .map(([label, value]) => `<div class="result-row"><span>${label}</span><span>${value}</span></div>`)
    .join("");
}

function saveDifficultyClearRecord() {
  const difficultyKey = gameState.selectedDifficulty;
  const config = difficultyConfigs[difficultyKey];
  permanentSave.difficultyUnlocks = permanentSave.difficultyUnlocks ?? createDefaultDifficultyUnlocks();
  permanentSave.difficultyRecords = permanentSave.difficultyRecords ?? createDefaultDifficultyRecords();
  permanentSave.difficultyRecords[difficultyKey] = permanentSave.difficultyRecords[difficultyKey] ?? createDefaultDifficultyRecords()[difficultyKey];

  const record = permanentSave.difficultyRecords[difficultyKey];
  let unlockMessage = `${config.label} 모드 클리어!`;
  let modeUnlocked = false;
  let clearCode = "";

  record.cleared = true;
  record.bestTime = Math.max(record.bestTime, gameState.elapsedTime);
  record.bestScore = Math.max(record.bestScore, gameState.score);
  record.bestKills = Math.max(record.bestKills, gameState.kills);

  if (difficultyKey === "normal" && !permanentSave.difficultyUnlocks.hard) {
    permanentSave.difficultyUnlocks.hard = true;
    unlockMessage = "어려움 모드가 해금되었습니다!";
    modeUnlocked = true;
  } else if (difficultyKey === "hard" && !permanentSave.difficultyUnlocks.hell) {
    permanentSave.difficultyUnlocks.hell = true;
    unlockMessage = "헬모드가 해금되었습니다!";
    modeUnlocked = true;
  } else if (difficultyKey === "hell") {
    clearCode = generateClearCode(difficultyKey, {
      survivalTime: gameState.elapsedTime,
      kills: gameState.kills,
      score: gameState.score,
    });
    record.lastClearCode = clearCode;
    gameState.clearCode = clearCode;
    unlockMessage = "헬모드 클리어!";
  }

  gameState.clearUnlockMessage = unlockMessage;
  savePermanentSave();
  updatePermanentSummary();

  if (modeUnlocked) {
    playModeUnlockSound();
  }

  return {
    unlockMessage,
    clearCode,
  };
}

function renderClearStats(bestScore, bestTime, clearInfo) {
  const difficulty = difficultyConfigs[gameState.selectedDifficulty];
  const rows = [
    ["클리어 난이도", difficulty.label],
    ["생존 시간", formatTime(gameState.elapsedTime)],
    ["처치 수", gameState.kills],
    ["최종 레벨", gameState.level],
    ["처치한 보스 수", gameState.bossKills],
    ["획득 Soul", gameState.earnedSoul],
    ["총 Soul", permanentSave.soul],
    ["최종 점수", gameState.score],
    ["최고 생존 시간", formatTime(bestTime)],
    ["최고 점수", bestScore],
  ];

  if (clearTitle) {
    clearTitle.textContent = gameState.selectedDifficulty === "hell" ? "HELL MODE CLEAR!" : "CLEAR!";
  }

  if (clearMessage) {
    clearMessage.textContent = clearInfo.unlockMessage;
  }

  if (clearStats) {
    clearStats.innerHTML = rows
      .map(([label, value]) => `<div class="result-row"><span>${label}</span><span>${value}</span></div>`)
      .join("");
  }

  if (hellClearCodeBox) {
    const isHellClear = gameState.selectedDifficulty === "hell" && Boolean(clearInfo.clearCode);

    hellClearCodeBox.classList.toggle("hidden", !isHellClear);
    if (hellClearCodeValue) hellClearCodeValue.textContent = clearInfo.clearCode;
    if (copyClearCodeMessage) copyClearCodeMessage.textContent = "서버 자동 지급이 아닌 수동 확인용 코드입니다.";
  }
}

function generateClearCode(difficultyKey, stats) {
  // 정적 GitHub Pages 게임이라 서버 검증은 없다. 이 코드는 캐주얼 이벤트용 수동 확인 보조 수단이다.
  const now = new Date();
  const date =
    String(now.getFullYear()) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  const timePart = Math.floor(stats.survivalTime);
  const killPart = Math.floor(stats.kills);
  const payload = `${difficultyKey}-${date}-${timePart}-${killPart}-${stats.score}-${random}`;
  const checksum = Array.from(payload)
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
    .toString(36)
    .toUpperCase()
    .slice(-2)
    .padStart(2, "0");

  return `HELL-${date}-T${timePart}-K${killPart}-${random}-${checksum}`;
}

function copyClearCode() {
  const code = gameState?.clearCode || permanentSave.difficultyRecords?.hell?.lastClearCode || "";

  if (!code) {
    if (copyClearCodeMessage) copyClearCodeMessage.textContent = "복사할 인증 코드가 없습니다.";
    return;
  }

  const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : null;

  if (clipboard?.writeText) {
    clipboard.writeText(code)
      .then(() => {
        if (copyClearCodeMessage) copyClearCodeMessage.textContent = "인증 코드가 복사되었습니다.";
      })
      .catch(() => {
        if (copyClearCodeMessage) copyClearCodeMessage.textContent = "복사 실패: 코드를 직접 길게 눌러 복사해주세요.";
      });
    return;
  }

  if (copyClearCodeMessage) {
    copyClearCodeMessage.textContent = "코드를 직접 선택해서 복사해주세요.";
  }
}

function getTopDamageSource() {
  const entries = Object.entries(gameState.weaponDamage);

  if (entries.length === 0) {
    return "없음";
  }

  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

// ===== 결과/영구 강화 UI =====
function renderPermanentUpgradeMenu(message = "") {
  updatePermanentSummary();

  if (permanentMessage) {
    permanentMessage.textContent = message;
  }

  newRunPermanentButton?.classList.toggle("hidden", permanentMenuReadOnly);
  resetSaveButton?.classList.toggle("hidden", permanentMenuReadOnly);

  if (!permanentUpgradeList) {
    return;
  }

  permanentUpgradeList.innerHTML = "";

  for (const [id, definition] of Object.entries(permanentUpgradeDefinitions)) {
    const level = getPermanentLevel(id);
    const isMax = level >= definition.maxLevel;
    const cost = isMax ? 0 : getPermanentUpgradeCost(definition, level);
    const canBuy = !permanentMenuReadOnly && !isMax && permanentSave.soul >= cost;
    const card = document.createElement("article");

    card.className = "permanent-card";
    card.innerHTML = `
      <div class="permanent-card-main">
        <strong>${definition.name}</strong>
        <span>Lv. ${level} / ${definition.maxLevel}</span>
      </div>
      <p>${definition.description}</p>
      <p>${definition.currentText(level)}</p>
      <p>${isMax ? "MAX 레벨입니다." : definition.nextText(level)}</p>
      <div class="permanent-card-footer">
        <span>${isMax ? "MAX" : `비용: ${cost} Soul`}</span>
        <button type="button" data-upgrade-id="${id}" ${canBuy ? "" : "disabled"}>
          ${isMax ? "MAX" : permanentMenuReadOnly ? "보기 전용" : "구매"}
        </button>
      </div>
    `;

    const buyButton = card.querySelector("button");
    buyButton?.addEventListener("click", () => buyPermanentUpgrade(id));
    permanentUpgradeList.appendChild(card);
  }
}

function openPermanentUpgradeMenu(options = {}) {
  permanentMenuReadOnly = Boolean(options.readOnly);
  renderPermanentUpgradeMenu(options.message ?? "");
  permanentUpgradeScreen?.classList.remove("hidden");
  setUiBlocking(true);
  resetJoystick();
}

function closePermanentUpgradeMenu() {
  permanentUpgradeScreen?.classList.add("hidden");
  const clearOpen = clearScreen && !clearScreen.classList.contains("hidden");
  const pauseOpen = pauseScreen && !pauseScreen.classList.contains("hidden");
  const shouldBlock = !gameState?.isStarted || gameState?.isLevelingUp || gameState?.isGameOver || clearOpen || pauseOpen;
  permanentMenuReadOnly = false;
  setUiBlocking(shouldBlock);
}

function buyPermanentUpgrade(id) {
  if (permanentMenuReadOnly) {
    renderPermanentUpgradeMenu("영구 강화 구매는 게임오버 후 또는 메인 메뉴에서 사용할 수 있습니다.");
    return;
  }

  const definition = permanentUpgradeDefinitions[id];

  if (!definition) {
    return;
  }

  const level = getPermanentLevel(id);

  if (level >= definition.maxLevel) {
    renderPermanentUpgradeMenu("이미 최대 레벨입니다.");
    return;
  }

  const cost = getPermanentUpgradeCost(definition, level);

  if (permanentSave.soul < cost) {
    playHitSound();
    renderPermanentUpgradeMenu("Soul이 부족합니다.");
    return;
  }

  permanentSave.soul -= cost;
  permanentSave.permanentUpgrades[id] = level + 1;
  savePermanentSave();
  playUpgradeSelectSound();
  renderPermanentUpgradeMenu(`${definition.name} Lv. ${level + 1} 강화 완료!`);
}

function resetPermanentSave() {
  const ok = typeof window.confirm === "function"
    ? window.confirm("정말 모든 성장 데이터를 초기화할까요?")
    : true;

  if (!ok) {
    return;
  }

  permanentSave = createDefaultPermanentSave();
  selectedDifficulty = "normal";

  try {
    window.localStorage?.removeItem(SAVE_KEY);
    window.localStorage?.removeItem(RECORD_KEY);
  } catch {
    // 저장 초기화가 실패해도 게임은 계속 사용할 수 있다.
  }

  savePermanentSave();
  renderSynergyCollection();

  if (gameState) {
    gameState.bestScore = 0;
    gameState.bestTime = 0;
  }

  renderPermanentUpgradeMenu("저장 데이터가 초기화되었습니다.");
}

function goToMainMenu() {
  hasStartedGame = false;
  resetGame(false);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getDistance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isMobileDevice() {
  const hasTouch = "ontouchstart" in window || (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0);
  return window.innerWidth <= 768 || hasTouch;
}

function getResponsiveBalance() {
  return isMobileDevice() ? mobileBalance : desktopBalance;
}

function getScaledRadius(baseRadius, kind, typeKey = "") {
  const balance = getResponsiveBalance();
  let scale = balance.entityScale;
  let minRadius = 0;

  if (kind === "player") {
    scale = balance.playerScale;
    minRadius = balance.minPlayerRadius ?? 0;
  } else if (kind === "enemy") {
    scale = balance.enemyScale;
    minRadius = balance.minEnemyRadius ?? 0;
  } else if (kind === "boss") {
    if (typeKey === "big" || typeKey === "final") scale = balance.bigBossScale;
    else if (typeKey === "mid") scale = balance.midBossScale;
    else scale = balance.miniBossScale;
    minRadius = balance.minBossRadius ?? 0;
  }

  if (scale === 1) {
    return baseRadius;
  }

  return Math.max(minRadius, Math.round(baseRadius * scale));
}

function refreshPlayerSpeed() {
  if (!player) {
    return;
  }

  const balance = getResponsiveBalance();
  const baseSpeed = player.baseSpeed ?? playerStart.speed;
  const permanentSpeedMultiplier = player.permanentSpeedMultiplier ?? 1;
  const runSpeedMultiplier = player.runSpeedMultiplier ?? 1;

  player.speed = baseSpeed * permanentSpeedMultiplier * runSpeedMultiplier * balance.playerSpeedMultiplier;
}

function applyResponsiveEntityScales() {
  if (player) {
    player.radius = getScaledRadius(player.baseRadius ?? playerStart.radius, "player");
    refreshPlayerSpeed();
    player.x = clamp(player.x, player.radius, window.innerWidth - player.radius);
    player.y = clamp(player.y, player.radius, window.innerHeight - player.radius);
  }

  for (const enemy of enemies || []) {
    const baseRadius = enemy.baseRadius ?? enemyTypes[enemy.type]?.radius ?? enemy.radius;
    enemy.baseRadius = baseRadius;
    enemy.radius = getScaledRadius(baseRadius, "enemy");
  }

  for (const boss of bosses || []) {
    const baseRadius = boss.baseRadius ?? bossTypes[boss.bossType]?.radius ?? boss.radius;
    boss.baseRadius = baseRadius;
    boss.radius = getScaledRadius(baseRadius, "boss", boss.bossType);
  }
}

// ===== 입력 처리 =====
function addButtonClick(element, handler) {
  element?.addEventListener("click", handler);
}

function resetJoystick() {
  joystickActive = false;
  joystickDeltaX = 0;
  joystickDeltaY = 0;

  if (joystickKnob) {
    joystickKnob.style.transform = "translate(-50%, -50%)";
  }
}

function updateJoystickFromTouch(touch) {
  const collectionOpen = synergyCollectionScreen && !synergyCollectionScreen.classList.contains("hidden");

  if (!joystick || gameState?.isLevelingUp || gameState?.isGameOver || gameState?.isSynergyPopupOpen || gameState?.isPaused || collectionOpen) {
    resetJoystick();
    return;
  }

  const rect = joystick.getBoundingClientRect();

  joystickStartX = rect.left + rect.width / 2;
  joystickStartY = rect.top + rect.height / 2;

  const rawDeltaX = touch.clientX - joystickStartX;
  const rawDeltaY = touch.clientY - joystickStartY;
  const distance = Math.hypot(rawDeltaX, rawDeltaY);
  const deadzoneDistance = joystickMaxDistance * getResponsiveBalance().joystickDeadzone;
  const activeDistance = distance <= deadzoneDistance
    ? 0
    : ((Math.min(distance, joystickMaxDistance) - deadzoneDistance) / (joystickMaxDistance - deadzoneDistance)) * joystickMaxDistance;
  const limitedDistance = Math.min(activeDistance, joystickMaxDistance);
  const angle = Math.atan2(rawDeltaY, rawDeltaX);

  joystickDeltaX = Math.cos(angle) * limitedDistance;
  joystickDeltaY = Math.sin(angle) * limitedDistance;

  if (limitedDistance === 0) {
    joystickDeltaX = 0;
    joystickDeltaY = 0;
  }

  if (joystickKnob) {
    joystickKnob.style.transform = `translate(calc(-50% + ${joystickDeltaX}px), calc(-50% + ${joystickDeltaY}px))`;
  }
}

function handleJoystickStart(event) {
  event.preventDefault();
  joystickActive = true;
  updateJoystickFromTouch(event.touches[0]);
}

function handleJoystickMove(event) {
  event.preventDefault();

  if (!joystickActive) {
    return;
  }

  updateJoystickFromTouch(event.touches[0]);
}

function handleJoystickEnd(event) {
  event.preventDefault();
  resetJoystick();
}

window.addEventListener("keydown", (event) => {
  if ((event.code === "Escape" || event.code === "KeyP") && !event.repeat) {
    event.preventDefault();
    togglePause();
    return;
  }

  keys.add(event.code);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

window.addEventListener("resize", handleResize);

addButtonClick(startButton, startGame);
addButtonClick(soundStartButton, toggleSound);
addButtonClick(soundHudButton, toggleSound);
addButtonClick(pauseButton, togglePause);
addButtonClick(resumeButton, resumeGame);
addButtonClick(pausePermanentButton, openPermanentFromPause);
addButtonClick(pauseSynergyButton, openSynergyCollection);
addButtonClick(pauseSoundButton, toggleSound);
addButtonClick(pauseMainMenuButton, goToMainMenu);
addButtonClick(difficultyNormalButton, () => selectDifficulty("normal"));
addButtonClick(difficultyHardButton, () => selectDifficulty("hard"));
addButtonClick(difficultyHellButton, () => selectDifficulty("hell"));
addButtonClick(rerollButton, rerollUpgrades);
addButtonClick(restartButton, restartGame);
addButtonClick(clearRestartButton, restartGame);
addButtonClick(clearPermanentButton, openPermanentUpgradeMenu);
addButtonClick(clearSynergyButton, openSynergyCollection);
addButtonClick(clearMainMenuButton, goToMainMenu);
addButtonClick(copyClearCodeButton, copyClearCode);
addButtonClick(openPermanentButton, openPermanentUpgradeMenu);
addButtonClick(openPermanentGameOverButton, openPermanentUpgradeMenu);
addButtonClick(mainMenuButton, goToMainMenu);
addButtonClick(guidePermanentButton, openPermanentFromGuide);
addButtonClick(guideLaterButton, () => closePermanentGuide(true));
addButtonClick(closePermanentButton, closePermanentUpgradeMenu);
addButtonClick(newRunPermanentButton, startGame);
addButtonClick(resetSaveButton, resetPermanentSave);
addButtonClick(openSynergyCollectionButton, openSynergyCollection);
addButtonClick(closeSynergyCollectionButton, closeSynergyCollection);
addButtonClick(closeSynergyPopupButton, closeSynergyPopup);

if (joystick) {
  joystick.addEventListener("touchstart", handleJoystickStart, { passive: false });
  joystick.addEventListener("touchmove", handleJoystickMove, { passive: false });
  joystick.addEventListener("touchend", handleJoystickEnd, { passive: false });
  joystick.addEventListener("touchcancel", handleJoystickEnd, { passive: false });
}

loadImageAssets();
resizeCanvas();
updateSoundButtons();
resetGame();
