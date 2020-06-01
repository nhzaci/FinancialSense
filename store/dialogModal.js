export const state = () => ({
    dialogModalOpen: false,
    dialogModalTitle: '',
    dialogModalText: '',
    dialogModalYes: '',
    dialogModalNo: ''
})

export const mutations = {
    set_dialogModalOpen (state, bool) {
        state.dialogModalOpen = bool;
    },
    set_dialogModalTitle (state, text) {
        state.dialogModalTitle = text;
    },
    set_dialogModalText (state, text) {
        state.dialogModalText = text;
    },
    set_dialogModalYes (state, text) {
        state.dialogModalYes = text;
    },
    set_dialogModalNo (state, text) {
        state.dialogModalNo = text;
    },
}
