export const localAuth = {
    saveUserId: (userId) => {
      sessionStorage.setItem("userId", userId);
    },
    getUserId: () => {
      return sessionStorage.getItem("userId");
    },
  };