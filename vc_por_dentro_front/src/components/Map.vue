<script>
import { onMounted, toRefs, defineProps } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    name: 'Map',
    props: {
        coordinates: {
            type: Array,
            default: () => [-23.55052, -46.633308], // Coordenadas padrão
        },
        markerName: {
            type: String,
            default: 'Marcador', // Nome padrão do marcador
        },
        addAllMarkers: {
            type: Boolean,
            default: false, // Valor padrão
        },
    },
    setup(props) {
        const { coordinates, markerName, addAllMarkers } = toRefs(props);

        onMounted(() => {

            const zoom = 13
            const map = L.map('map').setView(coordinates.value, zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Se addAllMarkers for verdadeiro, carrega os marcadores do JSON
            if (addAllMarkers.value) {
                fetch('https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(item => {
                            const { latitude, longitude, nomeDaObra } = item;
                            L.marker([latitude, longitude]).addTo(map)
                                .bindPopup(nomeDaObra);
                        });
                    })
                    .catch(error => {
                        console.error('Erro ao buscar os dados:', error);
                    });
            } else {
                // Adiciona um marcador nas coordenadas passadas
                L.marker(coordinates.value).addTo(map)
                    .bindPopup(markerName.value)
                    .openPopup();
            }
        });
    },
};
</script>

<template>
    <div id="map" class="map"></div>
</template>

<style scoped>
.map {
    height: 500px;
}
</style>
