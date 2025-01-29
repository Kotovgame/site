// Language switcher functionality
const langSwitcher = document.getElementById('langSwitcher');
let currentLang = localStorage.getItem('language') || 'EN';

// Initialize language
langSwitcher.textContent = currentLang;

langSwitcher.addEventListener('click', () => {
    currentLang = currentLang === 'EN' ? 'RU' : 'EN';
    langSwitcher.textContent = currentLang;
    localStorage.setItem('language', currentLang);
    updateLanguage();
});

function updateLanguage() {
    const translations = {
        'EN': {
            'title': "Hi, I'm",
            'subtitle': 'Fullstack Developer',
            'description': 'Telegram Bot Developer from Perm',
            'projects': 'Projects'
        },
        'RU': {
            'title': 'Привет, я',
            'subtitle': 'Фулстек Разработчик',
            'description': 'Разработчик Telegram ботов из Перми',
            'projects': 'Проекты'
        }
    };

    const t = translations[currentLang];
    
    document.querySelector('.title-1').textContent = t.projects;
    document.querySelector('.header__title strong').innerHTML = `${t.title} <em>Mave</em>`;
    document.querySelector('.header__title').childNodes[2].textContent = t.subtitle;
    document.querySelector('.header__text p').textContent = t.description;
}

// Audio player functionality
const audioPlayer = document.getElementById('streamPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Set initial volume
audioPlayer.volume = volumeSlider.value / 100;

// Update play/pause button state
function updatePlayPauseState(isPlaying) {
    playPauseBtn.querySelector('.play-pause-icon').classList.toggle('playing', isPlaying);
    playPauseBtn.querySelector('.play-pause-icon').classList.toggle('paused', !isPlaying);
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

// Update icon when play state changes
audioPlayer.addEventListener('play', () => updatePlayPauseState(true));
audioPlayer.addEventListener('pause', () => updatePlayPauseState(false));

// Set initial state
updatePlayPauseState(!audioPlayer.paused);

// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

// Start playing automatically
audioPlayer.play().catch(error => {
    console.log('Auto-play prevented:', error);
    updatePlayPauseState(false);
});

// Fetch GitHub projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/Mave-full/repos');
        const repos = await response.json();
        
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) return;
        
        projectsContainer.innerHTML = repos.map(repo => `
            <li class="project">
                <a href="${repo.html_url}" target="_blank">
                    <img src="https://opengraph.githubassets.com/1/${repo.full_name}" alt="${repo.name}" class="project__img">
                    <h3 class="project__title">${repo.name}</h3>
                </a>
            </li>
        `).join('');
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
    }
}

// Load GitHub projects when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
    updateLanguage();
});