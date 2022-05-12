export const useHistory = () => {
    const history = useLocalStorage<User[]>("search-history", []);

    const addToHistory = (user: User) => {
        if (!history.value.some((u: User) => u.id === user.id)) {
            history.value.push(user);
        }
    };

    const deleteHistory = () => {
        history.value = [];
    };

    const removeFromHistory = (userId: String) => {
        history.value = history.value.filter((user: User) => user.id !== userId);
    };

    return {
        history,
        addToHistory,
        removeFromHistory,
        deleteHistory
    };
};
