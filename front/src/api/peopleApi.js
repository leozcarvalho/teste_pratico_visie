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
    } catch {
        return null
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
    try {
        const response = await api.post(`/people`, { person: person })
        return response
    } catch(error) {
        return error.response
    }
}

peopleApi.updatePerson = async (personId, person) => {
    try {
        const response = await api.put(`/people/${personId}`, { person: person })
        return response
    } catch(error) {
        return error.response
    }
}

export { peopleApi }