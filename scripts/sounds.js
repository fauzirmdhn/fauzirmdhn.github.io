const SOUNDS = (function () {
    const base = 'assets/sounds/';
    const sounds = {
        blow: new Audio(base + 'blow.mp3'),
        celebrate: new Audio(base + 'celebrate.mp3'),
        photo: new Audio(base + 'photo.mp3'),
        drag: new Audio(base + 'drag.mp3'),
        drop: new Audio(base + 'drop.mp3'),
    };

    const meowFile = base + 'meow.mp3';

    if (sounds.blow) sounds.blow.volume = 0.9;
    if (sounds.celebrate) sounds.celebrate.volume = 0.85;
    if (sounds.photo) sounds.photo.volume = 0.8;
    if (sounds.drag) sounds.drag.volume = 0.7;
    if (sounds.drop) sounds.drop.volume = 0.17;

    function playOneShot(src, vol = 1) {
        try {
            const a = new Audio(src);
            a.volume = vol;
            a.play().catch(() => { });
        } catch (e) { }
    }

    function play(name) {
        try {
            const s = sounds[name];
            if (!s) return;
            s.currentTime = 0;
            s.play().catch(() => { });
        } catch (e) { }
    }

    function playRandomMeow(vol = 0.6) {
        playOneShot(meowFile, vol);
    }

    return { play, playOneShot, playRandomMeow };
})();
