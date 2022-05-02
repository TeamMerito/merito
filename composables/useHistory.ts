export const useHistory = () => {
    const history = ref<FullUser[]>([]);

    const getHistory = () => {
        history.value = JSON.parse(localStorage.getItem("history") ?? "[]");
    };

    const addToHistory = (user: FullUser) => {
        if (!history.value.some((u: FullUser) => u.id === user.id)) {
            history.value.push(user);
            localStorage.setItem("history", JSON.stringify(history.value));
            getHistory();
        }
    };

    const removeFromHistory = (user: FullUser) => {
        localStorage.setItem("history", JSON.stringify(history.value.filter((u: FullUser) => u.id !== user.id)));
        getHistory();
    };

    const deleteHistory = () => {
        localStorage.removeItem("history");
    };

    onMounted(() => {
        getHistory();
    });

    return {
        history,
        getHistory,
        addToHistory,
        removeFromHistory,
        deleteHistory
    };
};
