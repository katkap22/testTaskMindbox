export const GetItemFromLS = () => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : []
}