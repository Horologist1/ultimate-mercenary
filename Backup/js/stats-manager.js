// Stats Manager for Ultimate Mercenary
class StatsManager {
    constructor() {
        this.initializeStats();
        this.updateUI();
    }

    initializeStats() {
        // Inicializar Firebase si no está ya inicializado
        if (!window.firebaseApp) {
            const firebaseConfig = {
                apiKey: "AIzaSyBVc1a4E4_y-YJZV5ZqFQzTr1T8Txe8TmQ",
                authDomain: "ultimatemercenary-1e212.firebaseapp.com",
                projectId: "ultimatemercenary-1e212",
                storageBucket: "ultimatemercenary-1e212.appspot.com",
                messagingSenderId: "683730871364",
                appId: "1:683730871364:web:350aaf7a296ad34db28811",
                databaseURL: "https://ultimatemercenary-1e212-default-rtdb.firebaseio.com/"
            };
            window.firebaseApp = firebase.initializeApp(firebaseConfig);
            window.database = firebase.database();
        }

        // Referencias a Firebase
        this.pmRef = window.database.ref('playerPM');
        this.spectatorsRef = window.database.ref('spectators');
        this.ratingRef = window.database.ref('rating');

        // Listeners para cambios en Firebase
        this.pmRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                localStorage.setItem('playerPM', data.toString());
                this.updateUI();
            }
        });

        this.spectatorsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                localStorage.setItem('spectators', data.toString());
                this.updateUI();
            }
        });

        this.ratingRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                localStorage.setItem('rating', data.toString());
                this.updateUI();
            }
        });
    }

    getPM() {
        return localStorage.getItem('playerPM') || '0';
    }

    getSpectators() {
        return localStorage.getItem('spectators') || '0';
    }

    getRating() {
        return localStorage.getItem('rating') || '0';
    }

    updatePM(value) {
        if (value && !isNaN(value)) {
            const currentPM = parseInt(this.getPM());
            const newPM = currentPM + parseInt(value);
            const finalPM = Math.max(0, newPM).toString();
            
            // Actualizar en Firebase
            this.pmRef.set(finalPM);
            
            // Actualizar en localStorage (el listener de Firebase se encargará de esto)
            localStorage.setItem('playerPM', finalPM);
            
            // Actualizar UI
            this.updateUI();
            
            // Notificar a la tienda si está abierta
            if (window.parent) {
                window.parent.postMessage({
                    type: 'updatePM',
                    value: finalPM
                }, '*');
            }
        }
    }

    updateSpectators(value) {
        if (value && !isNaN(value)) {
            this.spectatorsRef.set(value.toString());
        }
    }

    updateRating(value) {
        if (value && !isNaN(value)) {
            // Ensure rating is between 0 and 10
            value = Math.max(0, Math.min(10, parseFloat(value)));
            this.ratingRef.set(value.toFixed(1));
        }
    }

    updateUI() {
        // Update PM display
        const pmElement = document.getElementById('player-pm');
        if (pmElement) {
            pmElement.textContent = this.getPM();
        }
        
        // Update other stats
        const spectatorsElement = document.getElementById('spectators');
        if (spectatorsElement) {
            spectatorsElement.textContent = this.getSpectators();
        }
        
        const ratingElement = document.getElementById('rating');
        if (ratingElement) {
            ratingElement.textContent = this.getRating();
        }
    }
}

// Create global instance
const statsManager = new StatsManager();

// Update UI every 5 seconds
setInterval(() => statsManager.updateUI(), 5000);

// Export for use in other files
window.StatsManager = StatsManager; 