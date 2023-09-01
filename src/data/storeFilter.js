import { reactive } from 'vue'

export const storeFilter = reactive({
    loading: true,
    emptySearch: false,
    apartmentsall: [],
    apartFiltered: []
});