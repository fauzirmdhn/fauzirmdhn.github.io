const SOUNDS = (function () {
    const base = 'assets/sounds/';
    const sounds = {
        blow: new Audio(base + 'blow.mp3'),
        photo: new Audio(base + 'photo.mp3'),
        drag: new Audio(base + 'drag.mp3'),
        drop: new Audio(base + 'drop.mp3'),
    };

    const meowFiles = [
        base + 'meow1.mp3',
        base + 'meow2.mp3',
        base + 'meow3.mp3'
    ];

    // set reasonable volumes
    if (sounds.blow) sounds.blow.volume = 0.9;
    if (sounds.photo) sounds.photo.volume = 0.8;
    if (sounds.drag) sounds.drag.volume = 0.7;
    if (sounds.drop) sounds.drop.volume = 0.6;

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
        const f = meowFiles[Math.floor(Math.random() * meowFiles.length)];
        playOneShot(f, vol);
    }

    return { play, playOneShot, playRandomMeow };
})();
