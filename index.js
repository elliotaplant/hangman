function hangman (widthOfWall, widthOfThing, numberOfThings = 1) {
  const spacing = (widthOfWall - (widthOfThing * numberOfThings))/(numberOfThings + 1);
  return {
    edgeToEdge: spacing,
    edgeToCenter: spacing + widthOfThing/2,
  };
}

function makeWallContents(wallWidth, thingWidth, count) {
  const { edgeToEdge, edgeToCenter } = hangman(wallWidth, thingWidth, count);
  const thingString = `<div class="hanging-thing" style="flex-grow: ${thingWidth}">${thingWidth}</div>`;
  const spacingString = `<div class="spacing-thing" style="flex-grow: ${edgeToEdge}">${edgeToEdge}</div>`;
  return Array.from(Array(count + 1)).map(() => spacingString).join(thingString);
}

window.updateHangman = function () {
  const wallWidth = Number(window.wallWidthInput.value);
  const thingWidth = Number(window.thingWidthInput.value);
  const count = Number(window.countInput.value);

  const wallContents = makeWallContents(wallWidth, thingWidth, count);
  window.hangmanArea.innerHTML = `
    <div>${wallWidth}</div>
    <div class="wall-box">
      ${wallContents}
    </div>
  `;
};

window.updateHangman();
