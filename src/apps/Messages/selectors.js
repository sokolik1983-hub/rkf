export const selectMessages = state => {
    const {messages} = state.messages;
    return {
        messages
    }
};