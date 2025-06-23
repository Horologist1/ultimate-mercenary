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
        console.log('Inicializando sistema de ranking...');
        if (window.database) {
            console.log('Firebase database encontrada, configurando referencias...');
            this.rankingRef = window.database.ref('ranking');
            
            // Primero, configurar el listener para cambios
            this.rankingRef.on('value', (snapshot) => {
                console.log('Cambio detectado en Firebase:', snapshot.val());
                const data = snapshot.val();
                if (data) {
                    this.ranking = data;
                    this.renderRanking();
                    // If we're in the admin panel, update the admin view too
                    if (typeof renderAdminRanking === 'function') {
                        renderAdminRanking();
                    }
                }
            }, (error) => {
                console.error('Error en el listener de Firebase:', error);
            });

            // Luego, verificar si necesitamos inicializar con datos por defecto
            this.rankingRef.once('value')
                .then((snapshot) => {
                    if (!snapshot.exists()) {
                        console.log('No hay datos en Firebase, inicializando con datos por defecto...');
                        return this.saveRanking();
                    } else {
                        console.log('Datos existentes encontrados en Firebase:', snapshot.val());
                        this.ranking = snapshot.val();
                        this.renderRanking();
                    }
                })
                .catch(error => {
                    console.error('Error al verificar datos iniciales:', error);
                });
        } else {
            console.error('Firebase database no está disponible. Asegúrate de que Firebase está inicializado correctamente.');
        }
    },

    // Get the current ranking
    getRanking() {
        return this.ranking;
    },

    // Update a participant's PM
    updateParticipantPM(number, newPM) {
        console.log(`Intentando actualizar PM para participante #${number} a ${newPM}`);
        const participant = this.ranking.find(p => p.number === number);
        if (participant) {
            participant.pm = parseInt(newPM);
            this.sortRanking();
            console.log('Participante actualizado, ranking ordenado:', this.ranking);
            return true;
        }
        console.error(`No se encontró el participante #${number}`);
        return false;
    },

    // Sort ranking by PM (descending)
    sortRanking() {
        this.ranking.sort((a, b) => b.pm - a.pm);
    },

    // Save ranking to Firebase
    async saveRanking() {
        console.log('Intentando guardar ranking en Firebase...');
        console.log('Estado actual del ranking:', this.ranking);
        
        if (!window.database) {
            console.error('Firebase database no está disponible');
            throw new Error('Firebase database no está disponible');
        }

        if (!this.rankingRef) {
            console.error('Firebase reference no está disponible');
            throw new Error('Firebase reference no está disponible');
        }

        try {
            await this.rankingRef.set(this.ranking);
            console.log('Ranking guardado exitosamente en Firebase');
            return true;
        } catch (error) {
            console.error('Error detallado al guardar en Firebase:', error);
            throw error;
        }
    },

    // Render ranking in modal
    renderRanking() {
        const modalContent = document.getElementById('rankingModalContent');
        if (!modalContent) {
            console.log('Modal content no encontrado, posiblemente estamos en el panel de admin');
            return;
        }

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
    console.log('DOM cargado, inicializando sistema de ranking...');
    rankingSystem.init();
}); 