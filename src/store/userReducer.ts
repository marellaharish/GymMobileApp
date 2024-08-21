// userReducer.ts
const initialState = {
    name: '',
    email: '',
};

function userReducer(state = initialState, action: any) {
    switch (action.type) {
        // Handle actions here
        default:
            return state;
    }
}

export default userReducer;
