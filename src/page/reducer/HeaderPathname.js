export const initialState = {
    pathname: "",
}
export const HeaderPathname = (state, action) => {
    switch (action.type) {
        case "CHANGE_PATHNAME":
            return {
                ...state,
                pathname: action.payload,
            };
        default:
            return state;
    }
}