// Show / Hide Pages
function showSignup() {
    signupPage.classList.remove("hidden");
    loginPage.classList.add("hidden");
}

function showLogin() {
    loginPage.classList.remove("hidden");
    signupPage.classList.add("hidden");
}

// Signup
function signup() {
    let user = {
        name: suName.value,
        email: suEmail.value,
        pass: suPass.value
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup Successful!");
    showLogin();
}

// Login
function login() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) return alert("No user found. Signup first!");

    if (loginEmail.value === user.email && loginPass.value === user.pass) {
        localStorage.setItem("loggedIn", "true");
        showFeed();
    } else {
        alert("Incorrect Email/Password");
    }
}

// Show Feed Page
function showFeed() {
    signupPage.classList.add("hidden");
    loginPage.classList.add("hidden");
    feedPage.classList.remove("hidden");

    let user = JSON.parse(localStorage.getItem("user"));
    welcomeText.textContent = "Welcome, " + user.name;

    loadPosts();
}

// Posts Array
let posts = [];

// Create Post
function createPost() {
    let text = postText.value;
    let img = postImage.value;

    if (!text.trim()) return alert("Write something!");

    let post = {
        id: Date.now(),
        text,
        img,
        likes: 0,
        time: new Date().toLocaleString()
    };

    posts.unshift(post);
    savePosts();
    loadPosts();

    postText.value = "";
    postImage.value = "";
}

// Save Posts
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Load Posts
function loadPosts() {
    posts = JSON.parse(localStorage.getItem("posts")) || [];
    displayPosts(posts);
}

// Display Posts
function displayPosts(postArray) {
    postsContainer.innerHTML = "";

    postArray.forEach(post => {
        postsContainer.innerHTML += `
            <div class="post">
                <p>${post.text}</p>
                ${post.img ? `<img src="${post.img}">` : ""}
                <div class="post-footer">
                    <span class="like-btn" onclick="toggleLike(${post.id})">❤️ ${post.likes}</span>
                    <span>${post.time}</span>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

// Like System
function toggleLike(id) {
    let post = posts.find(p => p.id === id);
    post.likes = post.likes ? 0 : 1;
    savePosts();
    loadPosts();
}

// Delete Post
function deletePost(id) {
    if (!confirm("Delete post?")) return;
    posts = posts.filter(p => p.id !== id);
    savePosts();
    loadPosts();
}

// Search Posts
function searchPosts() {
    let val = searchBar.value.toLowerCase();
    let filtered = posts.filter(p => p.text.toLowerCase().includes(val));
    displayPosts(filtered);
}

// Sorting
function sortPosts() {
    let option = sortSelect.value;

    if (option === "latest") posts.sort((a, b) => b.id - a.id);
    if (option === "oldest") posts.sort((a, b) => a.id - b.id);
    if (option === "likes") posts.sort((a, b) => b.likes - a.likes);

    displayPosts(posts);
}
