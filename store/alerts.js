export const state = () => ({
    successText: "",
    infoText: "",
    warningText: "",
    errorText: "",
    successOpen: false,
    infoOpen: false,
    warningOpen: false,
    errorOpen: false,
})

export const mutations = {
    set_successText (state, text) {
        state.successText = text;
    },
    set_infoText (state, text) {
        state.infoText = text;
    },
    set_warningText (state, text) {
        state.warningText = text;
    },
    set_errorText (state, text) {
        state.errorText = text;
    },
    set_successOpen (state, bool) {
        state.successOpen = bool;
    },
    set_infoOpen (state, bool) {
        state.infoOpen = bool;
    },
    set_warningOpen (state, bool) {
        state.warningOpen = bool;
    },
    set_errorOpen (state, bool) {
        state.errorOpen = bool;
    },
}
