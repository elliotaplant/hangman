function toDecimalPlaces(number, places) {
  return Math.floor(Number(number) * (10 ** places)) / (10 ** places);
}

function toPct(thing, total, places) {
  return toDecimalPlaces((thing / total) * 99.9, places);
}

function div(cls, width, content) {
  return `<div class="${cls}" style="width: ${width}%">${content}</div>`;
}

function makeWallContents(wallWidth, thingWidth, count) {
  const edgeToEdge = (wallWidth - (thingWidth * count)) / (count + 1);
  const thingWidthPct = toPct(thingWidth, wallWidth, 2);
  const edgeToEdgePct = toPct(edgeToEdge, wallWidth, 2);
  const thingString = div('hanging-thing', thingWidthPct, toDecimalPlaces(thingWidth, 3));
  const spacingString = div('spacing-thing', edgeToEdgePct, toDecimalPlaces(edgeToEdge, 3));
  const topHangers = Array.from(Array(count + 1)).map(() => spacingString).join(thingString);
  const bottomHangers = Array.from(Array(count)).map((_, i) => {
    const toEdge = i * (edgeToEdge + thingWidth) + edgeToEdge;
    const toCenter = i * (edgeToEdge + thingWidth) + edgeToEdge + thingWidth / 2;
    const toEdgePct = toDecimalPlaces(toEdge / wallWidth * 100, 2);
    const toCenterPct = toDecimalPlaces(toCenter / wallWidth * 100, 2);
    return `
    <div class="bottom-thing">
      <div class="bottom-side-thing" style="width: ${toEdgePct}%">${toDecimalPlaces(toEdge, 3)}</div>
    </div>
    <div class="bottom-thing">
      <div class="bottom-center-thing" style="width: ${toCenterPct}%">${toDecimalPlaces(toCenter, 3)}</div>
    </div>
  `;
  }).join('\n');
  return `<div class="top-hangers">${topHangers}</div>` + bottomHangers;
}

window.updateHangman = function() {
  const wallWidth = Number(window.wallWidthInput.value);
  const thingWidth = Number(window.thingWidthInput.value);
  const count = Number(window.countInput.value);

  const wallContents = makeWallContents(wallWidth, thingWidth, count);
  window.hangmanArea.innerHTML = `
    <div class="wall-width">${wallWidth}</div>
    <div class="wall-box">
      ${wallContents}
    </div>
  `;
};

window.updateHangman();
