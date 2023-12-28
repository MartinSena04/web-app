export function ChangePageSize(data, pageSize) {
    const dataList = [];

    const keys = Object.keys(data)
    const values = Object.values(data).flat()

    const newData = {}

    keys.forEach((key, index) => {
        const from = pageSize * index
        const to = from + pageSize
        const data = values.slice(from, to)
        newData[key] = data
    });

    return newData

}