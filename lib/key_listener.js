
const keyInputListener = () => {
  document.addEventListener("keypress", (event) => {
    // console.log(event);
    if (event.code === 'KeyA') { return "a"; }
    if (event.code === 'KeyB') { return "b"; }
    if (event.code === 'KeyC') { return "c"; }
    if (event.code === 'KeyD') { return "d"; }
    if (event.code === 'KeyE') { return "e"; }
    if (event.code === 'KeyF') { return "f"; }
    if (event.code === 'KeyG') { return "g"; }
    if (event.code === 'KeyH') { return "h"; }
    if (event.code === 'KeyI') { return "i"; }
    if (event.code === 'KeyJ') { return "j"; }
    if (event.code === 'KeyK') { return "k"; }
    if (event.code === 'KeyL') { return "l"; }
    if (event.code === 'KeyM') { return "m"; }
    if (event.code === 'KeyN') { return "n"; }
    if (event.code === 'KeyO') { return "o"; }
    if (event.code === 'KeyP') { return "p"; }
    if (event.code === 'KeyQ') { return "q"; }
    if (event.code === 'KeyR') { return "r"; }
    if (event.code === 'KeyS') { return "s"; }
    if (event.code === 'KeyT') { return "t"; }
    if (event.code === 'KeyU') { return "u"; }
    if (event.code === 'KeyV') { return "v"; }
    if (event.code === 'KeyW') { return "w"; }
    if (event.code === 'KeyX') { return "x"; }
    if (event.code === 'KeyY') { return "y"; }
    if (event.code === 'KeyZ') { return "z"; }
  });
};

export default keyInputListener;