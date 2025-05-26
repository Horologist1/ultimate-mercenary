// Stats Manager for Ultimate Mercenary
class StatsManager {
    constructor() {
        this.initializeStats();
    }

    initializeStats() {
        // Initialize stats if they don't exist
        if (!localStorage.getItem('spectators')) {
            localStorage.setItem('spectators', '2500'); // 2,500 default
        }
        if (!localStorage.getItem('rating')) {
            localStorage.setItem('rating', '5.7'); // Default rating
        }
        if (!localStorage.getItem('playerPM')) {
            localStorage.setItem('playerPM', '0'); // Start with 0 PM
        }
    }

    getSpectators() {
        return localStorage.getItem('spectators') || '0';
    }

    getRating() {
        return localStorage.getItem('rating') || '0';
    }

    getPM() {
        return localStorage.getItem('playerPM') || '0';
    }

    updateSpectators(value) {
        if (value && !isNaN(value)) {
            localStorage.setItem('spectators', value);
            this.updateUI();
        }
    }

    updateRating(value) {
        if (value && !isNaN(value)) {
            // Ensure rating is between 0 and 10
            value = Math.max(0, Math.min(10, parseFloat(value)));
            localStorage.setItem('rating', value.toFixed(1));
            this.updateUI();
        }
    }

    updatePM(value) {
        if (value && !isNaN(value)) {
            const currentPM = parseInt(this.getPM());
            const newPM = currentPM + parseInt(value);
            localStorage.setItem('playerPM', Math.max(0, newPM).toString());
            this.updateUI();
        }
    }

    updateUI() {
        // Update all elements that display these stats
        const spectatorsElements = document.querySelectorAll('[id$="audience-value"]');
        const ratingElements = document.querySelectorAll('[id$="rating-value"]');
        const pmElements = document.querySelectorAll('[id$="pm-value"]');

        spectatorsElements.forEach(el => el.textContent = this.getSpectators());
        ratingElements.forEach(el => el.textContent = this.getRating());
        pmElements.forEach(el => el.textContent = this.getPM());
    }
}

// Create global instance
const statsManager = new StatsManager();

// Update UI every 5 seconds
setInterval(() => statsManager.updateUI(), 5000);

// Export for use in other files
window.statsManager = statsManager; 