// /posts
// /comments
// /albums
// /photos
// /todos
// /users
const api = async (endpoint) => {
    const response =  await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);

    return response.json();
};

