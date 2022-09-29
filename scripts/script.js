const container = document.querySelector(".container");

// untuk menangkap user yg login
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        Dashboard(user);
    } else {
        Landing();
    }
});

// untuk tampilan dashboard
const Dashboard = (user) => {
    let displayName = user.displayName || `users${new Date().getTime().toString()}`;
    let photoURL = user.photoURL || './images/profil.jpg';
    let email = user.email;
    let uid = user.uid;

    
    const element = document.createElement('div');
    element.classList.add('Dashboard');
    element.innerHTML = (`
        <div class="foto-user"></div>
        <div class="nama-user">Nama: ${displayName}</div>
        <div class="email-user">Email: ${email}</div>
        <div class="id-user">UID: ${uid}</div>
        <button data-button="logout">Logout</button>
    `);

    const fotoUser = element.querySelector(`.foto-user`);
    fotoUser.style.backgroundImage = `url(${photoURL})`;

    const logoutBtn = element.querySelector(`[data-button="logout"]`);
    logoutBtn.onclick = () => firebase.auth().signOut().then(() => alert('Berhasil Keluar Dari Akun Kamu')).catch((err) => alert(err));
    
    container.innerHTML = '';
    container.appendChild(element);
}

const Landing = () => {
    const element = document.createElement('div');
    element.classList.add('Landing');
    element.innerHTML = (`<button data-button="login" >GitHub Login</button>`);

    container.innerHTML = '';
    container.appendChild(element);

    const loginBtn = element.querySelector(`[data-button="login"]`);
    loginBtn.onclick = () => {
        const provider =  new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
}