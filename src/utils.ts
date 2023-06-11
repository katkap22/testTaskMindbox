export const getItemFromLS = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : []
}