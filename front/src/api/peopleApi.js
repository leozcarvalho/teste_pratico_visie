import { useApi } from '././useApi';

const api = useApi()
const peopleApi = {}

peopleApi.getFilter = () => {
    return {
        id: null,
        skip: null,
        limit: 10,
        sortBy: null,
        orderDesc: false,
    }
}

peopleApi.getPeople = async (filter) => {
    try {
        const response = await api.get('/people', {
            params: {
                limit: filter.limit,
                skip: filter.skip,
                sort_by: filter.sortBy,
                order_desc: filter.orderDesc
            }
        })
        return response
    } catch(error) {
        return error.response
    }
}

peopleApi.getPerson = async (personId) => {
    try {
        const response = await api.get('/people', {
            params: {
                id: personId,
            }
        })
        return response.data.people[0]
    } catch(error) {
        return error.response
    }
}
peopleApi.deletePerson = async (personId) => {
    try {
        const response = await api.delete(`/people/${personId}`)
        return response
    } catch(error) {
        return error.response
    }
}

peopleApi.savePerson = async (person) => {
    const payload = {
        nome: person.name,
        rg: person.rg,
        cpf: person.cpf,
        data_nascimento: person.name,
        data_admissao: person.name,
        funcao: person.function,
    }
    try {
        const response = await api.post(`/people`, { person: payload })
        return response
    } catch(error) {
        return error.response
    }
}
export { peopleApi }