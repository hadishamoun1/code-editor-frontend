export const localChat =  {
    setChatId : (chatId) => {
        sessionStorage.setItem("chatId", chatId);
    },
    getChatId : () => {
        return sessionStorage.chatId;
    }
} 