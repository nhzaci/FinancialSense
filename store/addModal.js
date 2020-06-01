export const state = () => ({
    addModalOpen: false,
    modalEditMode: false,
    modalEditId: ''
})

export const mutations = {
    set_addModalOpen (state, bool) {
        state.addModalOpen = bool;
    },
    set_modalEditMode (state, bool) {
        state.modalEditMode = bool;
    },
    set_modalEditId (state, id) {
        state.modalEditId = id;
    }
}