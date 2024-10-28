<script>
import { onMounted, toRefs, defineProps } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
    const { coordinates, markerName, addAllMarkers } = toRefs(props)

    onMounted(() => {
      const map = L.map('map').setView(coordinates.value, 12)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      // Adiciona um marcador nas coordenadas passadas apenas se addAllMarkers for false
      if (!addAllMarkers.value) {
        L.marker(coordinates.value)
          .addTo(map)
          .bindPopup(markerName.value)
          .openPopup()
      }

      // Se addAllMarkers for verdadeiro, carrega os marcadores do JSON
      if (addAllMarkers.value) {
        fetch(
          'https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json',
        )
          .then(response => response.json())
          .then(data => {
            data.forEach(item => {
              const { latitude, longitude, codigoObra, nomeDaObra } = item

              // Cria um link no popup
              const link = `<a href="./projetos/${codigoObra}/${nomeDaObra}" style="text-decoration: none;">${nomeDaObra}</a>`
              L.marker([latitude, longitude]).addTo(map).bindPopup(link) // Usa o link no popup
            })
          })
          .catch(error => {
            console.error('Erro ao buscar os dados:', error)
          })
      }
    })
  },
}
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style scoped>
.map {
  height: 500px;
}
</style>
