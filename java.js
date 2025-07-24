document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const releaseEmojisBtn = document.getElementById('release-emojis-btn');
    const currentLyricCenter = document.getElementById('current-lyric-center');
    const audio = document.getElementById('audio-source');

    let isPlaying = false;
    let lyricInterval;

    // Letras de la canción con tiempos (ASEGÚRATE DE AJUSTAR ESTOS TIEMPOS CON PRECISIÓN)
    const lyrics = [
        { time: 0.0, text: "(Come on, Harry, we wanna say goodnight to you)" },
        { time: 14, text: "Holdin' me back" },
        { time: 16, text: "Gravity's holdin' me back" },
        { time: 19, text: "I want you to hold out the palm of your hand" },
        { time: 21, text: "Why don't we leave it at that?" },
        { time: 25, text: "Nothin' to say" },
        { time: 27, text: "When everything gets in the way" },
        { time: 30, text: "Seems you cannot be replaced" },
        { time: 33, text: "And I'm the one who will stay, oh, oh, oh" },
        { time: 37, text: "In this world, it's just us" },
        { time: 44, text: "You know it's not the same as it was" },
        { time: 49, text: "In this world, it's just us" },
        { time: 55, text: "You know it's not the same as it was" },
        { time: 60, text: "As it was, as it was" },
        { time: 66, text: "You know it's not the same" },
        { time: 69, text: "Answer the phone" },
        { time: 71, text: "Harry, you're no good alone" },
        { time: 74, text: "Why are you sitting at home on the floor?" },
        { time: 77, text: "What kind of pills are you on?" },
        { time: 80, text: "Ringin' the bell" },
        { time: 82, text: "And nobody's coming to help" },
        { time: 85, text: "Your daddy lives by himself" },
        { time: 88, text: "He just wants to know that you're well, oh, oh, oh" },
        { time: 92, text: "In this world, it's just us" },
        { time: 99, text: "You know it's not the same as it was" },
        { time: 104, text: "In this world, it's just us" },
        { time: 110, text: "You know it's not the same as it was" },
        { time: 115, text: "As it was, as it was" },
        { time: 121, text: "You know it's not the same" },
        { time: 124, text: "Go home, get ahead, light-speed internet" },
        { time: 127, text: "I don't wanna talk about the way that it was" },
        { time: 130, text: "Leave America, two kids follow her" },
        { time: 133, text: "I don't wanna talk about who's doin' it first" },
        { time: 138, text: "(Hey)" },
        { time: 143, text: "As it was" },
        { time: 146, text: "You know it's not the same as it was" },
        { time: 151, text: "As it was, as it was" }
    ];

    function showLyrics() {
        const currentTime = audio.currentTime;
        let foundLyric = null;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                foundLyric = lyrics[i];
                break;
            }
        }

        if (foundLyric && currentLyricCenter.textContent !== foundLyric.text) {
            currentLyricCenter.classList.remove('fade-in');
            void currentLyricCenter.offsetWidth; // Truco para forzar reflow
            currentLyricCenter.textContent = foundLyric.text;
            currentLyricCenter.classList.add('fade-in');
        } else if (!foundLyric) {
            currentLyricCenter.textContent = '';
            currentLyricCenter.classList.remove('fade-in');
        }
    }

    audio.addEventListener('timeupdate', showLyrics);

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶';
            clearInterval(lyricInterval);
        } else {
            audio.play();
            playPauseBtn.textContent = '⏸';
            lyricInterval = setInterval(showLyrics, 100);
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('ended', () => {
        clearInterval(lyricInterval);
        currentLyricCenter.textContent = '';
        playPauseBtn.textContent = '▶';
        isPlaying = false;
    });

    const emojisToBurst = ['❤️', '✨', '🌟', '💫', '💖']; // Reducimos la variedad de emojis para optimización

    releaseEmojisBtn.addEventListener('click', (event) => {
        const buttonRect = releaseEmojisBtn.getBoundingClientRect();
        const startX = buttonRect.left + buttonRect.width / 2;
        const startY = buttonRect.top + buttonRect.height / 2;

        // Lanzamos menos emojis y con animación más corta para optimización
        for (let i = 0; i < 2; i++) { // Solo 2 emojis por clic
            const emoji = document.createElement('span');
            emoji.classList.add('burst-emoji');
            emoji.textContent = emojisToBurst[Math.floor(Math.random() * emojisToBurst.length)];
            
            document.body.appendChild(emoji);

            // Ajuste de las propiedades CSS personalizadas para la animación
            emoji.style.setProperty('--x-start', `${0}px`);
            emoji.style.setProperty('--y-start', `${0}px`);

            const endX = (Math.random() - 0.5) * 80; // Rango de dispersión más pequeño
            const endY = -(30 + Math.random() * 60); // Vuelo más corto

            emoji.style.setProperty('--x-end', `${endX}px`);
            emoji.style.setProperty('--y-end', `${endY}px`);

            emoji.style.left = `${startX}px`;
            emoji.style.top = `${startY}px`;

            emoji.style.animationDelay = `${Math.random() * 0.1}s`; // Pequeño retraso aleatorio
            emoji.style.animationDuration = `${0.7 + Math.random() * 0.3}s`; // Duración más corta
        }
    });
});