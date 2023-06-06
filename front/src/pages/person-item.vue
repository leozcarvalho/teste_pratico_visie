<template>
  <div>
    <div class="container my-4">
      <div class="card py-4 px-4">
        <div class="d-flex bd-highlight mb-3">
          <div class="me-auto p-2 bd-highlight">
            <div class="row">
              <div class="col-auto">
                <h4 class="mb-3">{{ personId ? 'Editando' : 'Novo cadastro' }}</h4>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status" style="width: 6rem; height: 6rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-6 form-group mb-3">
              <label>Nome</label>
              <input v-model="person.name" class="form-control" :class="{ 'is-invalid': $v.person.name.$error }" />
              <div class="invalid-feedback">
                Nome é obrigatório
              </div>
            </div>
            <div class="col-md-6 form-group mb-3">
              <label>Função</label>
              <input v-model="person.function" class="form-control" />
            </div>
            <div class="col-md-6 form-group mb-3">
              <label>RG</label>
              <input v-model="person.rg" v-mask="'##.###.###-#'" class="form-control"
                :class="{ 'is-invalid': $v.person.rg.$error }" />
              <div class="invalid-feedback">
                RG é obrigatório
              </div>
            </div>
            <div class="col-md-6 form-group mb-3">
              <label>CPF</label>
              <input v-model="person.cpf" v-mask="'###.###.###-##'" class="form-control"
                :class="{ 'is-invalid': $v.person.cpf.$error }" />
              <div class="invalid-feedback">
                RG é obrigatório
              </div>
            </div>
            <div class="col-md-6 form-group mb-3">
              <label>Data de nascimento</label>
              <input v-model="person.dataNascimento" v-mask="'##/##/####'" class="form-control"
                :class="{ 'is-invalid': $v.person.dataNascimento.$error }" />
              <div class="invalid-feedback">
                Data de nascimento é obrigatória
              </div>
            </div>
            <div class="col-md-6 form-group mb-3">
              <label>Data de admissão</label>
              <input v-model="person.dataAdmissao" v-mask="'##/##/####'" class="form-control"
                :class="{ 'is-invalid': $v.person.dataAdmissao.$error }" />
              <div class="invalid-feedback">
                Data de admissão é obrigatória
              </div>
            </div>
          </div>
          <div class="text-end">
            <button type="button" class="btn btn-success" @click="submit">{{ personId ? 'Editar' : 'Salvar' }}</button>
            <button type="button" class="btn btn-danger ms-3"
              @click="$router.push({ name: 'person-list' })">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { peopleApi } from "../api/peopleApi"
import { required } from 'vuelidate/lib/validators'
import { parseDataToBr, parseToISO } from "./../helpers/date"

export default {

  name: 'PersonForm',

  validations: {
    person: {
      name: {
        required,
      },
      rg: {
        required,
      },
      cpf: {
        required,
      },
      dataNascimento: {
        required,
      },
      dataAdmissao: {
        required,
      },
    }
  },

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
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true
        const payload = {
          nome: this.person.name,
          rg: this.person.rg,
          cpf: this.person.cpf,
          data_nascimento: parseToISO(this.person.dataNascimento),
          data_admissao: parseToISO(this.person.dataAdmissao),
          funcao: this.person.function,
        }
        if (this.personId) {
          const response = await peopleApi.updatePerson(this.personId, payload)
          this.loading = false
          this.backToPersonList(response)
        }
        else {
          const response = await peopleApi.savePerson(payload)
          this.loading = false
          this.backToPersonList(response)
        }
      }
    },
    backToPersonList(response) {
      if (response.data.status === 'success') this.$router.push({ name: 'person-list' })
    },
  },
}
</script>
  