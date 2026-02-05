import dotenv from 'dotenv';
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { testConnection } from './config/database.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});


async function startServer() {
    try {
        const isConnected = await testConnection();

        if (!isConnected) {
            console.error('Impossible de démarrer le serveur: échec de la connexion à la base de données');
            process.exit(1);
        }
        app.listen(PORT, () => {
            console.log(` Serveur démarré sur le port ${PORT}`);
        });
    } catch (err) {
        console.error('Erreur lors du démarrage du serveur:', err);
        process.exit(1);
    }
}


startServer();
