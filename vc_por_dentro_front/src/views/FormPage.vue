<script setup>
import Map from '../components/Map.vue'
</script>

<script>
export default {
  name: 'FormPage',
  data() {
    return {
      obra: null,
    }
  },
  computed: {
    coordinates() {
      return {
        latitude: this.obra?.latitude,
        longitude: this.obra?.longitude,
      }
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const codigoObra = this.$route.params.codigoObra // Obtém o código da obra via URL
      fetch(
        'https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json',
      )
        .then(response => response.json())
        .then(data => {
          // Busca a obra pelo código
          this.obra = data.find(item => item.codigoObra === codigoObra)
        })
        .catch(error => {
          console.error('Erro ao buscar os dados:', error)
        })
    },
  },
}
</script>

<template>
  <div class="form-container">
    <h2>Detalhes Da Obra</h2>
    <h3>{{ obra?.nomeDaObra }}</h3>
    <div class="form-row">
      <Map
        :coordinates="[coordinates['latitude'], coordinates['longitude']]"
        :marker-name="obra?.nomeDaObra"
      />
    </div>
    <div class="form-row">
      <!-- Left Column -->
      <div class="form-column">
        <div class="form-group">
          <label for="processo">Processo</label>
          <input id="processo" type="text" v-model="obra.processo" readonly />
        </div>
        <div class="form-group">
          <label for="secretariaContratante">Secretaria Contratante</label>
          <input id="secretariaContratante" type="text" v-model="obra.secretariaContratante" readonly />
        </div>
        <div class="form-group">
          <label for="secretariaResponsavel">Secretaria Responsável</label>
          <input id="secretariaResponsavel" type="text" v-model="obra.secretariaResponsavel" readonly />
        </div>
        <div class="form-group">
          <label for="subprefeitura">Subprefeitura</label>
          <input id="subprefeitura" type="text" v-model="obra.subprefeitura" readonly />
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
        <div class="form-group">
          <label for="empresaContratada">Empresa Contratada</label>
          <input id="empresaContratada" type="text" v-model="obra.empresaContratada" readonly />
        </div>
        <div class="form-group">
          <label for="cnpjContratada">CNPJ da Contratada</label>
          <input id="cnpjContratada" type="text" v-model="obra.cnpjContratada" readonly />
        </div>
      </div>
      

      <!-- Right Column -->
      <div class="form-column">
        <div class="form-group">
          <label for="nomeDaObra">Nome da Obra</label>
          <input id="nomeDaObra" type="text" v-model="obra.nomeDaObra" readonly />
        </div>
        <div class="form-group">
          <label for="escopoDoContrato">Escopo do Contrato</label>
          <input id="escopoDoContrato" type="text" v-model="obra.escopoDoContrato" readonly />
        </div>
        <div class="form-group">
          <label for="categoria">Categoria</label>
          <input id="categoria" type="text" v-model="obra.categoria" readonly />
        </div>
        <div class="form-group">
          <label for="subcategoria">Subcategoria</label>
          <input id="subcategoria" type="text" v-model="obra.subcategoria" readonly />
        </div>
        <div class="form-group">
          <label for="classificacao">Classificação</label>
          <input id="classificacao" type="text" v-model="obra.classificacao" readonly />
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <input id="status" type="text" v-model="obra.status" readonly />
        </div>
        <div class="form-group">
          <label for="dtInicioDaObra">Data de Início da Obra</label>
          <input id="dtInicioDaObra" type="text" v-model="obra.dtInicioDaObra" readonly />
        </div>
        <div class="form-group">
          <label for="dtTerminoDaObra">Data de Término da Obra</label>
          <input id="dtTerminoDaObra" type="text" v-model="obra.dtTerminoDaObra" readonly />
        </div>
        <div class="form-group">
          <label for="numeroDoContrato">Número do Contrato</label>
          <input id="numeroDoContrato" type="text" v-model="obra.numeroDoContrato" readonly />
        </div>
      </div>
    </div>
    <p v-if="!obra">Carregando dados...</p>
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
</style>
