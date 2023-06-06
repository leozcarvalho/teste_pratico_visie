<template>
  <div>
    <div class="container my-4">
      <div class="card py-4 px-4">
        <div class="d-flex bd-highlight mb-3">
          <div class="me-auto p-2 bd-highlight">
            <div class="row">
              <div class="col-auto">
                <h4 class="mb-3">Registro {{ personId }}</h4>
              </div>
            </div>
          </div>
          <div class="col-auto order-last">
            <button type="button" class="btn btn-warning"
              @click="$router.push({ name: 'person-edit', params: { id: personId } })">Editar</button>
            <button type="button" class="btn btn-danger ms-3" @click="backToPersonList">Cancelar</button>
          </div>
        </div>
        <div v-if="loading" class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status" style="width: 6rem; height: 6rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div class="row py-5 px-5">
            <div class="col-6">
              <b>Nome: </b> {{ person.name }}
              <br />
              <b>RG: </b> {{ person.rg }}
              <br />
              <b>CPF: </b> {{ person.cpf }}
            </div>
            <div class="col-6">
              <b>Função: </b> {{ person.function ? person.function : 'N/A' }}
              <br />
              <b>Data de Nascimento: </b> {{ person.dataNascimento }}
              <br />
              <b>Data de Admissão: </b> {{ person.dataAdmissao }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { peopleApi } from "../api/peopleApi"
import { parseDataToBr } from "./../helpers/date"

export default {

  name: 'PersonView',

  data() {
    return {
      personId: null,
      loading: false,
      person: {},
    }
  },

  async mounted() {
    if (this.$route.params.id) {
      this.personId = this.$route.params.id
      this.fetchPerson()
    }
  },

  methods: {
    async fetchPerson() {
      this.loading = true
      const person = await peopleApi.getPerson(this.personId)
      this.person = {
        name: person.nome,
        rg: person.rg,
        function: person.funcao,
        cpf: person.cpf,
        dataNascimento: parseDataToBr(person.data_nascimento),
        dataAdmissao: parseDataToBr(person.data_admissao),
      }
      this.loading = false
    },
    backToPersonList() {
      this.$router.push({ name: 'person-list' })
    },
  },
}
</script>
    