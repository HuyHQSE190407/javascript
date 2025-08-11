const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/blogs");
    const data = await res.json();

    //insert data to html
    const tbody = document.querySelector("#blogs tbody");
    if (data && data.length) {
        data.forEach((blog, index) => {
            tbody.innerHTML += `
                    <tr>
                        <td>${blog.id}</td>
                        <td>${blog.title}</td>
                        <td>${blog.author}</td>
                        <td>${blog.content}</td>
                        <td>
                            <button
                            class="btn-delete"
                            data-id="${blog.id}"
                            >Delete</button>
                        </td>
                    </tr>
            `;
        });
    }
};

const addNewRowToEnd = (blog) => {
    const tableBody = document.querySelector("#blogs tbody");
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
                    <td>${blog.id}</td>
                    <td>${blog.title}</td>
                    <td>${blog.author}</td>
                    <td>${blog.content}</td>
                    <td>
                        <button
                        class="btn-delete"
                        data-id="${blog.id}"
                        >Delete</button>
                    </td>
    `;
    tableBody.appendChild(newRow);
}

const handleAddNewBlog = () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");

    const saveBlog = document.getElementById("btn-add");
    saveBlog.addEventListener("click", async () => {
        const rawResponse = await fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title.value,
                author: author.value,
                content: content.value
            })
        });
        const data = await rawResponse.json();
        addNewRowToEnd(data);
    })
}

const handleBtnDeleted = () => {
    const btns = document.querySelectorAll(".btn-delete");
    if (btns) {
        btns.forEach((value, index) => {
            value.addEventListener("click", async () => {
                ///call api to delete
                const id = value.getAttribute('data-id');
                const rawResponse = await fetch(`http://localhost:8000/blogs/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                const data = await rawResponse.json();
                console.log("check data", data);
                //handle remove row without reloading page
                const row = this.closest('tr');
                row.remove();
            })
        })
    }
}
fetchBlogs().then(() => {
    handleBtnDeleted();
});
handleAddNewBlog();
handleBtnDeleted();
