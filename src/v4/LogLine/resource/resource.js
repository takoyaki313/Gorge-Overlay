export const object_to_array = (object, key) => {
    let data = [];
    for (let i = 0; i < object.length; i++) {
        data.push(object[i][key]);
    }
    return data;
}