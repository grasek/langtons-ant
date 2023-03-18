let cv = document.getElementById("canvas"),
  ctx = cv.getContext("2d"),
  width = cv.width,
  height = cv.height,
  w = 800,
  h = 800,
  fields = 100,
  ap = fields / 2,
  wid = 8,
  s = wid / 2,
  len = wid * fields,
  CW = "white",
  CB = "black",
  CR = "red",
  antx = ap,
  anty = ap,
  antDir = 1,
  timer = setInterval("ant.run()", 1);
const Ant = function () {
  (this.autos1 = []), (this.autos2 = []);
  for (let i = 0; i < fields; i++) {
    this.autos1[i] = [];
    this.autos2[i] = [];
  }
  this.clear();
};

Ant.prototype.clear = function () {
  for (let j = 0; j < fields; j++) {
    for (let k = 0; k < fields; k++) {
      this.autos1[j][k] = 0;
      this.autos2[j][k] = 0;
    }
  }
};

Ant.prototype.putStructure = function (x, y, array) {
  this.clear();
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      this.autos1[i + y][j + x] = array[i][j];
    }
  }
};

Ant.prototype.run = function () {
  this.autos2 = clone(this.autos1);
  antDir = changeDir(antDir, this.autos2[antx][anty]);
  this.autos2[antx][anty] === 0 ? this.autos2[antx][anty]++ : this.autos2[antx][anty]--;
  switch (antDir) {
      case 1:
          anty--;
          if (anty === -1) anty = fields - 1;
          break;
      case 2:
          antx--;
          if (antx === -1) antx = fields - 1;
          break;
      case 3:
          anty++;
          if (anty === fields) anty = 0;
          break;
      case 4:
          antx++;
          if (antx === fields) antx = 0;
          break;
  }
  this.autos1 = clone(this.autos2);
  this.drawAnt();
};
Ant.prototype.drawAnt = function () {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = CW;
  ctx.rect(0, 0, w, h);
  ctx.fill();
  ctx.strokeStyle = "lightgrey";
  let z = 0;
  for (let i = 0; i <= fields + 1; i++) {
    ctx.moveTo(0, z);
    ctx.lineTo(len, z);
    ctx.moveTo(z, 0);
    ctx.lineTo(z, len);
    z += wid;
  }
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = CB;
  for (let i = 0; i < fields; i++) {
    for (let j = 0; j < fields; j++) {
      let x = i * wid;
      let y = j * wid;
      if (this.autos1[i][j] === 1) {
        ctx.beginPath();
        ctx.rect(x, y, wid, wid);
        ctx.fill();
      }
      ctx.fillStyle = CR;
      ctx.beginPath();
      ctx.arc(antx * wid + s, anty * wid + s, s, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillStyle = CB;
    }
  }
  ctx.restore();
};

function changeDir(dir, col) {
  let newDir = 0;
  switch (dir) {
    case 1:
      col === 0 ? (newDir = 2) : (newDir = 4);
      break;
    case 2:
      col === 0 ? (newDir = 3) : (newDir = 1);
      break;
    case 3:
      col === 0 ? (newDir = 4) : (newDir = 2);
      break;
    case 4:
      col === 0 ? (newDir = 1) : (newDir = 3);
      break;
  }
  return newDir;
}

function clone(array) {
  let r = array.length, c = array[0].length, array1 = [];
  for (let k = 0; k < r; k++) {
    array1[k] = [];
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      array1[i][j] = array[i][j];
    }
  }
  return array1;
}