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

const renderUsersButtons = async () => {
    const users = await api('users');
    const parent = document.getElementById('users');

    users.map(({ name, username, id }) => {
        const domElem = document.createElement('button');
        const textContent = document.createTextNode(`${name} (${username})`);

        domElem.addEventListener('click', () => { getUserPosts(id) });

        domElem.appendChild(textContent);
        parent.appendChild(domElem);
    });
};

const getUserPosts = async (userId) => {
    const searchInput = document.getElementById('search-posts');

    const searchPosts = function(e) {
        document.querySelectorAll('li').forEach(li => li.classList.remove('hidden'));

        this.titles
            .filter(({ title }) => !title.includes(e.target.value))
            .forEach(t => {
                const selected = document.querySelector(`li[data-id="${t.id}"]`);

                if (selected)
                    selected.classList.add('hidden');
            });
    };

    searchInput.removeEventListener('input', searchPosts);

    const posts = await api(`posts?userId=${userId}`);
    const parent = document.getElementById('posts');

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    const postsTitles = posts.map(({ title, id }) => ({ title, id }));

    const postsDom = postsTitles.map(({ title, id }) => {
        const domElemItem = document.createElement('li');
        const textContent = document.createTextNode(title);

        domElemItem.appendChild(textContent);
        domElemItem.dataset.id = id;

        return domElemItem;
    });

    const domElemList = document.createElement('ul');

    postsDom.forEach(it => domElemList.appendChild(it));

    parent.appendChild(domElemList);

    searchInput.addEventListener('input', searchPosts.bind({ titles: postsTitles }));
};

renderUsersButtons();
