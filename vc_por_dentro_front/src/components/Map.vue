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
  },
  setup(props) {
    const { coordinates, markerName } = toRefs(props);

    onMounted(() => {
      const map = L.map('map').setView(coordinates.value, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Adiciona um marcador nas coordenadas passadas
      L.marker(coordinates.value).addTo(map)
        .bindPopup(markerName.value) // Usa o nome do marcador
        .openPopup();
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
