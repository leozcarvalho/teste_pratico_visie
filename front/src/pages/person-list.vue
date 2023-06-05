<template>
  <div>
    <div class="modal fade" id="modalDelete">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Confirmar Ação</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Deseja realmente excluir esse usuário?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="deletePerson">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-4">
      <div class="card py-4 px-4">
        <div class="d-flex bd-highlight mb-3">
          <div class="me-auto p-2 bd-highlight">
            <div class="row">
              <div class="col-auto">
                <h4 class="mb-3">Pessoas</h4>
              </div>
              <div class="col-auto">
                <select class="form-select" v-model="filter.limit" @input="refresh">
                  <option v-for="(page, index) in perPageOptions" :key="index">{{ page }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-auto order-last">
            <button type="button" class="btn btn-success" @click="$router.push({ name: 'new-person' })">Nova Pessoa</button>
          </div>
        </div>
        <div v-if="people.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Data de admissão</th>
                <th class="text-center" scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in people" :key="index">
                <td>{{ item.nome | shortName }}</td>
                <td>{{ item.data_admissao | parseDataToBr }}</td>
                <td class="d-flex justify-content-center">
                  <button type="button" class="btn btn-primary">Ver Mais</button>
                  <button type="button" class="btn btn-warning mx-2"
                    @click="$router.push({ name: 'person-edit', params: { id: item.id_pessoa } })">Editar</button>
                  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalDelete"
                    @click="currentIndex = item.id_pessoa">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ 'disabled': (currentPage - 1) < totalPages }">
                <a class="page-link" href="#">Anterior</a>
              </li>
              <li v-for="(page, index) in totalPages" :key="index" class="page-item"
                :class="{ 'active': page == currentPage }"><a class="page-link" href="#" @click="changePage(page)">{{ page
                }}</a></li>
              <li class="page-item" :class="{ 'disabled': (currentPage + 1) > totalPages }">
                <a class="page-link" href="#" @click="changePage(currentPage + 1)">Próximo</a>
              </li>
            </ul>
          </nav>
        </div>
        <div v-if="loading" class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status" style="width: 6rem; height: 6rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseDataToBr } from "./../helpers/date"
import { peopleApi } from "../api/peopleApi"

export default {

  name: 'IndexPage',

  filters: {
    shortName(name) {
      return name.split(' ')[0]
    },
    parseDataToBr(date) {
      return parseDataToBr(date)
    }
  },

  data() {
    return {
      loading: false,
      currentPage: 1,
      people: [],
      filter: {},
      totalPeople: 0,
      perPageOptions: [5, 10, 25, 100],
      currentIndex: null,
    }
  },

  async mounted() {
    this.filter = peopleApi.getFilter()
    this.refresh()
  },

  methods: {
    async refresh() {
      this.loading = true
      this.people = []
      const response = await peopleApi.getPeople(this.filter)
      this.people = response.data.people
      this.totalPeople = response.data.people_count
      this.loading = false
    },
    changePage(page) {
      this.currentPage = page
      this.filter.skip = (page - 1) * this.filter.limit;
      this.refresh()
    },
    async deletePerson() {
      const response = await peopleApi.deletePerson(this.currentIndex)
      //this.$refs.toast.showAlert(response.data.status, response.data.message)
      if (response.data.status === 'success') this.refresh()
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalPeople / this.filter.limit)
    },
  },
}
</script>
