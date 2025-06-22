// Ranking System for Ultimate Mercenary
const rankingSystem = {
    ranking: [
        { number: 12, pm: 18421 },
        { number: 71, pm: 18000 },
        { number: 13, pm: 16564 },
        { number: 68, pm: 15113 },
        { number: 31, pm: 13821 },
        { number: 23, pm: 11212 },
        { number: 76, pm: 11065 },
        { number: 53, pm: 10712 },
        { number: 29, pm: 10212 },
        { number: 91, pm: 10000 }
    ],

    // Initialize Firebase reference
    init() {
        if (window.database) {
            this.rankingRef = window.database.ref('ranking');
            // Load initial data from Firebase
            this.rankingRef.once('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    // If no data exists, initialize with default ranking
                    this.rankingRef.set(this.ranking);
                }
            });

            // Listen for real-time updates
            this.rankingRef.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.ranking = data;
                    this.renderRanking();
                    // If we're in the admin panel, update the admin view too
                    if (typeof renderAdminRanking === 'function') {
                        renderAdminRanking();
                    }
                }
            });
        } else {
            console.error('Firebase database not available');
        }
    },

    // Get the current ranking
    getRanking() {
        return this.ranking;
    },

    // Update a participant's PM
    updateParticipantPM(number, newPM) {
        const participant = this.ranking.find(p => p.number === number);
        if (participant) {
            participant.pm = newPM;
            this.sortRanking();
            this.saveRanking();
        }
    },

    // Sort ranking by PM (descending)
    sortRanking() {
        this.ranking.sort((a, b) => b.pm - a.pm);
    },

    // Save ranking to Firebase
    saveRanking() {
        if (this.rankingRef) {
            this.rankingRef.set(this.ranking);
        } else {
            console.error('Firebase reference not available');
        }
    },

    // Render ranking in modal
    renderRanking() {
        const modalContent = document.getElementById('rankingModalContent');
        if (!modalContent) return;

        let html = `
            <h2>Top 10 Participantes</h2>
            <div class="ranking-table">
                <table>
                    <thead>
                        <tr>
                            <th>Posición</th>
                            <th>Número</th>
                            <th>PM</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.ranking.forEach((participant, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>#${participant.number}</td>
                    <td>${participant.pm.toLocaleString()} PM</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        modalContent.innerHTML = html;
    }
};

// Initialize the ranking system
document.addEventListener('DOMContentLoaded', () => {
    rankingSystem.init();
}); 