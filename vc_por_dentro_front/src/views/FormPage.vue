<script setup>
import Map from '../components/Map.vue'
</script>

<script>
export default {
    name: 'FormPage',
    data() {
        return {
            obra: null,
        };
    },
    computed: {
        leftColumnAttributes() {
            return {
                codigoObra: this.obra?.codigoObra,
                processo: this.obra?.processo,
                secretariaContratante: this.obra?.secretariaContratante,
                secretariaResponsavel: this.obra?.secretariaResponsavel,
                subprefeitura: this.obra?.subprefeitura,
                regiao: this.obra?.regiao,
                distrito: this.obra?.distrito,
                local: this.obra?.local,
            };
        },
        rightColumnAttributes() {
            // Remover latitude e longitude
            return {
                nomeDaObra: this.obra?.nomeDaObra,
                escopoDoContrato: this.obra?.escopoDoContrato,
                categoria: this.obra?.categoria,
                subcategoria: this.obra?.subcategoria,
                classificacao: this.obra?.classificacao,
                status: this.obra?.status,
                fontesDeRecurso: this.obra?.fontesDeRecurso,
                dtInicioDaObra: this.obra?.dtInicioDaObra,
                dtTerminoDaObra: this.obra?.dtTerminoDaObra,
                numeroDoContrato: this.obra?.numeroDoContrato,
                empresaContratada: this.obra?.empresaContratada,
                cnpjContratada: this.obra?.cnpjContratada,
                programaDeMetas: this.obra?.programaDeMetas,
            };
        },
        coordinates() {
            return {
                latitude: this.obra?.latitude,
                longitude: this.obra?.longitude
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        formatLabel(key) {
            return key.split(/(?=[A-Z])/).join(' ').replace(/^./, (str) => str.toUpperCase());
        },
        fetchData() {
            const codigoObra = this.$route.params.codigoObra; // Obtém o código da obra via URL
            fetch('https://raw.githubusercontent.com/Adinit/Obras---Voce-por-Dentro/refs/heads/main/projects.json')
                .then(response => response.json())
                .then(data => {
                    // Busca a obra pelo código
                    this.obra = data.find(item => item.codigoObra === codigoObra);
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados:', error);
                });
        },
    },
};
</script>

<template>
    <div class="form-container">
        <h2>Detalhes da Obra</h2>
        <div class="form-row">
            <Map :coordinates="[coordinates['latitude'], coordinates['longitude']]" :marker-name="rightColumnAttributes['nomeDaObra']" />
        </div>
        <div class="form-row">
            <div class="form-column">
                <div class="form-group" v-for="(value, key) in leftColumnAttributes" :key="key">
                    <label :for="key">{{ formatLabel(key) }}</label>
                    <input v-if="key !== 'origemDosDados'" :id="key" type="text" v-model="obra[key]" readonly />
                </div>
            </div>
            <div class="form-column">
                <div class="form-group" v-for="(value, key) in rightColumnAttributes" :key="key">
                    <label :for="key">{{ formatLabel(key) }}</label>
                    <input v-if="key !== 'origemDosDados'" :id="key" type="text" v-model="obra[key]" readonly />
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
