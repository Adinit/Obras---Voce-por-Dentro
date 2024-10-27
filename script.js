const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

// Use CORS for all routes
app.use(cors({
  origin: 'http://localhost:5500' // Adjust this if needed to match your frontend's origin
}));

// Array to hold the parsed CSV data
let staticData = [];

// Function to load data from CSV file
function loadCSVData() {
  const csvFilePath = path.join(__dirname, 'Obras.csv'); // Path to your CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: '\t' })) // Use tab as separator
    .on('data', (row) => {
      console.log('Parsed row:', row); // Log the parsed row
      staticData.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed', staticData); // Log the final staticData
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
    });
}

// Load CSV data when the server starts
loadCSVData();

// Function to serve static data
function getStaticProjectsData() {
  return staticData.map((row) => ({
    origemDosDados: row['ORIGEM DOS DADOS'] || '',
    codigoObra: row['CÓDIGO OBRA'] || '',
    processo: row['PROCESSO'] || '',
    secretariaContratante: row['SECRETARIA CONTRATANTE'] || '',
    secretariaResponsavel: row['SECRETARIA RESPONSÁVEL'] || '',
    subprefeitura: row['SUBPREFEITURA'] || '',
    regiao: row['REGIÃO'] || '',
    distrito: row['DISTRITO'] || '',
    local: row['LOCAL'] || '',
    latitude: row['LATITUDE'] ? parseFloat(row['LATITUDE']) : null,
    longitude: row['LONGITUDE'] ? parseFloat(row['LONGITUDE']) : null,
    nomeDaObra: row['NOME DA OBRA'] || '',
    escopoDoContrato: row['ESCOPO DO CONTRATO'] || '',
    categoria: row['CATEGORIA'] || '',
    subcategoria: row['SUBCATEGORIA'] || '',
    classificacao: row['CLASSIFICAÇÃO'] || '',
    status: row['STATUS'] || '',
    fontesDeRecurso: row['FONTES DE RECURSO'] || '',
    dtInicioDaObra: row['DT INÍCIO DA OBRA'] || '',
    dtTerminoDaObra: row['DT TÉRMINO DA OBRA'] || '',
    numeroDoContrato: row['NÚMERO DO CONTRATO'] || '',
    empresaContratada: row['EMPRESA CONTRATADA'] || '',
    cnpjContratada: row['CNPJ CONTRATADA'] || '',
    programaDeMetas: row['PROGRAMA DE METAS'] || '',
    valorInicialDoContrato: row['VALOR INICIAL DO CONTRATO'] ? parseFloat(row['VALOR INICIAL DO CONTRATO']) : null,
    valorDeAditamentos: row['VALOR DE ADITAMENTOS'] ? parseFloat(row['VALOR DE ADITAMENTOS']) : null,
    valorTotalDoContrato: row['VALOR TOTAL DO CONTRATO'] ? parseFloat(row['VALOR TOTAL DO CONTRATO']) : null,
    valorExecutadoDoContrato: row['VALOR EXECUTADO DO CONTRATO'] ? parseFloat(row['VALOR EXECUTADO DO CONTRATO']) : null,
    valorDeReajustes: row['VALOR DE REAJUSTES'] ? parseFloat(row['VALOR DE REAJUSTES']) : null,
    valorDeInvestimentos: row['VALOR DE INVESTIMENTOS'] ? parseFloat(row['VALOR DE INVESTIMENTOS']) : null,
  }));
}

// Endpoint to serve static data
app.get('/api/projects', (req, res) => {
  console.log('Serving static data for /api/projects');
  try {
    const projects = getStaticProjectsData();
    if (!projects || projects.length === 0) {
      console.log('No data available');
      return res.status(404).send('No data found');
    }
    res.json(projects);
  } catch (error) {
    console.error('Error processing static data:', error);
    res.status(500).send('Error processing data');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
