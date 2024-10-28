<script setup>
import Map from '../components/Map.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QRCode from 'qrcode'

const route = useRoute()
const router = useRouter()
const obra = ref(null)
const qrCodeUrl = ref('')
const detailsUrl = ref('')

const fetchData = () => {
  const codigoObra = route.params.codigoObra
  fetch(
    'https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json',
  )
    .then(response => response.json())
    .then(data => {
      obra.value = data.find(item => item.codigoObra === codigoObra)
      generateQRCode()
    })
    .catch(error => console.error('Erro ao buscar os dados:', error))
}

const generateQRCode = () => {
  if (obra.value) {
    const detalhesUrl = router.resolve({
      name: 'projetos',
      params: {
        codigoObra: obra.value.codigoObra,
        nomeObra: obra.value.nomeDaObra,
      },
    }).href

    const baseURL = window.location.origin

    detailsUrl.value = `${baseURL}${detalhesUrl}`

    QRCode.toDataURL(detailsUrl.value, { width: 200 }, (err, url) => {
      if (!err) qrCodeUrl.value = url
    })
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="form-container">
    <h2>Detalhes da Obra</h2>
    <h3>{{ obra?.nomeDaObra }}</h3>
    <div class="form-row" v-if="obra">
      <Map
        :coordinates="[obra?.latitude, obra?.longitude]"
        :marker-name="obra?.nomeDaObra"
      />
    </div>
    <div class="form-row" v-if="obra">
      <!-- Left Column -->
      <div class="form-column">
        <div class="form-group">
          <label for="codigoObra">Código da Obra</label>
          <input
            id="codigoObra"
            type="text"
            v-model="obra.codigoObra"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="processo">Processo</label>
          <input id="processo" type="text" v-model="obra.processo" readonly />
        </div>
        <div class="form-group">
          <label for="secretariaContratante">Secretaria Contratante</label>
          <input
            id="secretariaContratante"
            type="text"
            v-model="obra.secretariaContratante"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="secretariaResponsavel">Secretaria Responsável</label>
          <input
            id="secretariaResponsavel"
            type="text"
            v-model="obra.secretariaResponsavel"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="subprefeitura">Subprefeitura</label>
          <input
            id="subprefeitura"
            type="text"
            v-model="obra.subprefeitura"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="regiao">Região</label>
          <input id="regiao" type="text" v-model="obra.regiao" readonly />
        </div>
        <div class="form-group">
          <label for="distrito">Distrito</label>
          <input id="distrito" type="text" v-model="obra.distrito" readonly />
        </div>
        <div class="form-group">
          <label for="local">Local</label>
          <input id="local" type="text" v-model="obra.local" readonly />
        </div>
      </div>

      <!-- Right Column -->
      <div class="form-column">
        <div class="form-group">
          <label for="nomeDaObra">Nome da Obra</label>
          <input
            id="nomeDaObra"
            type="text"
            v-model="obra.nomeDaObra"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="escopoDoContrato">Escopo do Contrato</label>
          <input
            id="escopoDoContrato"
            type="text"
            v-model="obra.escopoDoContrato"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="categoria">Categoria</label>
          <input id="categoria" type="text" v-model="obra.categoria" readonly />
        </div>
        <div class="form-group">
          <label for="subcategoria">Subcategoria</label>
          <input
            id="subcategoria"
            type="text"
            v-model="obra.subcategoria"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="classificacao">Classificação</label>
          <input
            id="classificacao"
            type="text"
            v-model="obra.classificacao"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <input id="status" type="text" v-model="obra.status" readonly />
        </div>
        <div class="form-group">
          <label for="fontesDeRecurso">Fontes de Recurso</label>
          <input
            id="fontesDeRecurso"
            type="text"
            v-model="obra.fontesDeRecurso"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="dtInicioDaObra">Data de Início da Obra</label>
          <input
            id="dtInicioDaObra"
            type="text"
            v-model="obra.dtInicioDaObra"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="dtTerminoDaObra">Data de Término da Obra</label>
          <input
            id="dtTerminoDaObra"
            type="text"
            v-model="obra.dtTerminoDaObra"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="numeroDoContrato">Número do Contrato</label>
          <input
            id="numeroDoContrato"
            type="text"
            v-model="obra.numeroDoContrato"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="empresaContratada">Empresa Contratada</label>
          <input
            id="empresaContratada"
            type="text"
            v-model="obra.empresaContratada"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="cnpjContratada">CNPJ da Contratada</label>
          <input
            id="cnpjContratada"
            type="text"
            v-model="obra.cnpjContratada"
            readonly
          />
        </div>
        <div class="form-group">
          <label for="programaDeMetas">Programa de Metas</label>
          <input
            id="programaDeMetas"
            type="text"
            v-model="obra.programaDeMetas"
            readonly
          />
        </div>
      </div>
    </div>
    <p v-if="!obra">Carregando dados...</p>
    <div class="qr-code-section" v-if="qrCodeUrl">
      <h3>QR Code do Projeto</h3>
      <img :src="qrCodeUrl" alt="QR Code do Projeto" />
    </div>
  </div>
</template>

<style scoped>
.map {
  width: 100%;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  min-width: 300px;
  padding: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.qr-code-section {
  text-align: center;
  margin-top: 20px;
}
</style>
