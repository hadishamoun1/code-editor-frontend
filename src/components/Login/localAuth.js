export const localAuth = {
    saveUserId: (userId) => {
      localStorage.setItem("userId", userId);
    },
    getUserId: () => {
      return localStorage.userId;
    },
  };