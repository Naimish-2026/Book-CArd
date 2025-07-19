// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Check if the books data exists
    if (typeof books === 'undefined' || books.length === 0) {
        console.error("Book data is not found or is empty. Make sure data.js is loaded correctly.");
        return;
    }

    let currentIndex = 0;

    // DOM Elements
    const bookCover = document.querySelector('.book-cover');
    const bookTitle = document.querySelector('.book-title');
    const bookDescription = document.querySelector('.book-description');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Audio Player Elements
    const audioSource = document.getElementById('audio-source');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');

    // --- Core Function to Update Carousel Content ---
    function updateCarousel(index) {
        const book = books[index];
        bookCover.src = book.imageSrc;
        bookTitle.textContent = book.title;
        bookDescription.textContent = book.description;
        
        // Stop current audio and load new source
        audioSource.pause();
        audioSource.src = book.audioSrc;
        
        // Reset player state
        progressBar.value = 0;
        playPauseBtn.className = 'player-btn play-icon';
    }

    // --- Navigation Logic ---
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % books.length; // Loop to the start
        updateCarousel(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + books.length) % books.length; // Loop to the end
        updateCarousel(currentIndex);
    });

    // --- Audio Player Logic ---
    playPauseBtn.addEventListener('click', () => {
        if (audioSource.paused) {
            audioSource.play();
        } else {
            audioSource.pause();
        }
    });

    audioSource.addEventListener('play', () => {
        playPauseBtn.className = 'player-btn pause-icon';
    });

    audioSource.addEventListener('pause', () => {
        playPauseBtn.className = 'player-btn play-icon';
    });

    // Update progress bar as audio plays
    audioSource.addEventListener('timeupdate', () => {
        if (audioSource.duration) {
            const progressPercent = (audioSource.currentTime / audioSource.duration) * 100;
            progressBar.value = progressPercent;
        }
    });

    // Seek audio when progress bar is changed
    progressBar.addEventListener('input', () => {
        if (audioSource.duration) {
            const seekTime = (progressBar.value / 100) * audioSource.duration;
            audioSource.currentTime = seekTime;
        }
    });

    // Reset player when audio finishes
    audioSource.addEventListener('ended', () => {
        playPauseBtn.className = 'player-btn play-icon';
        progressBar.value = 0;
    });

    // --- Initial Load ---
    updateCarousel(currentIndex);
});