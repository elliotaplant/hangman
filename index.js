function hangman(widthOfWall, widthOfThing, numberOfThings = 1) {
  const spacing = (widthOfWall - (widthOfThing * numberOfThings)) / (numberOfThings + 1);
  return {
    edgeToEdge: spacing,
    edgeToCenter: spacing + widthOfThing / 2,
  };
}

function makeWallContents(wallWidth, thingWidth, count) {
  const { edgeToEdge, edgeToCenter } = hangman(wallWidth, thingWidth, count);
  const thingWidthPct = Number(thingWidth / wallWidth * 100).toFixed(2);
  const edgeToEdgePct = Number(edgeToEdge / wallWidth * 100).toFixed(2);
  const thingString = `<div class="hanging-thing" style="width: ${thingWidthPct}%">${thingWidth.toFixed(2)}</div>`;
  const spacingString = `<div class="spacing-thing" style="width: ${edgeToEdgePct}%">${edgeToEdge.toFixed(2)}</div>`;
  const topHangers = Array.from(Array(count + 1)).map(() => spacingString).join(thingString);
  const bottomHangers = Array.from(Array(count)).map((_, i) => {
    const toEdge = i * (edgeToEdge + thingWidth) + edgeToEdge;
    const toCenter = i * (edgeToEdge + thingWidth) + edgeToEdge + thingWidth / 2;
    const toEdgePct = Number(toEdge / wallWidth * 100).toFixed(2);
    const toCenterPct = Number(toCenter / wallWidth * 100).toFixed(2);
    return `
    <div class="bottom-thing">
      <div class="bottom-side-thing" style="width: ${toEdgePct}%">${toEdge.toFixed(2)}</div>
    </div>
    <div class="bottom-thing">
      <div class="bottom-center-thing" style="width: ${toCenterPct}%">${toCenter.toFixed(2)}</div>
    </div>
  `;
  }).join('\n');
  return `
    <div class="top-hangers">
      ${topHangers}
    </div>
    <div>
      ${bottomHangers}
    </div>
   `;
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
