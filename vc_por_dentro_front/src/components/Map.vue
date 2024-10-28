<script>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'vue-router'

export default {
  name: 'Map',
  props: {
    coordinates: {
      type: Array,
      default: () => [-23.55052, -46.633308],
    },
    markerName: {
      type: String,
      default: 'Projeto',
    },
    addAllMarkers: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const map = ref(null)
    const router = useRouter()

    onMounted(() => {
      map.value = L.map('map').setView(props.coordinates, 12)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map.value)

      if (props.addAllMarkers) {
        fetch(
          'https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json',
        )
          .then(response => response.json())
          .then(data => {
            data.forEach(item => {
              const projectLink = router.resolve({
                name: 'projetos', // Defina o nome da rota ou o path apropriado
                params: {
                  codigoObra: item.codigoObra,
                  nomeObra: item.nomeDaObra,
                },
              }).href

              const popupContent = `
                <div>
                  <strong>${item.nomeDaObra}</strong><br />
                  <a href="${projectLink}">Ver Detalhes</a>
                </div>`

              const marker = L.marker([item.latitude, item.longitude]).addTo(
                map.value,
              )
              marker.bindPopup(popupContent)
            })
          })
      } else {
        const marker = L.marker(props.coordinates).addTo(map.value)
        const projectLink = router.resolve({
          name: 'projetos', // Substitua com o nome ou path da rota correto
          params: {
            codigoObra: props.coordinates[0],
            nomeObra: props.markerName,
          },
        }).href

        const popupContent = `
          <div>
            <strong>${props.markerName}</strong><br />
            <a href="${projectLink}">Ver Detalhes</a>
          </div>`

        marker.bindPopup(popupContent)
      }
    })

    return { map }
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
