import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Omogući CORS da bi frontend mogao komunicirati s ovim serverom
app.use(cors());

// API ruta za dohvat iradijacije
app.get('/api/irradiation', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon' });
  }

  try {
    const url = `https://re.jrc.ec.europa.eu/api/v5_2/PVcalc?lat=${lat}&lon=${lon}&peakpower=1&loss=14&mountingplace=free&optimalinclination=1&optimalangles=1&outputformat=json`;

    const response = await fetch(url);
    const data = await response.json();

    console.log('🌞 PVGIS raw response:', JSON.stringify(data, null, 2));

    const irradiation = data?.outputs?.totals?.fixed?.E_y;

    if (!irradiation) {
      return res.status(500).json({ error: 'Irradiation data not found in API response' });
    }

    res.json({ irradiation });
  } catch (error) {
    console.error('❌ Backend fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pokreni server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
