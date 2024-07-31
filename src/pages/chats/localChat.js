export const localChat =  {
    setChatId : (chatId) => {
        localStorage.setItem("chatId", chatId);
    },
    getChatId : () => {
        return localStorage.chatId;
    }
} 