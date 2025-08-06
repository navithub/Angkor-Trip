// === Navigation Between Screens ===
const buttons = document.querySelectorAll('button[data-target]');
const screens = document.querySelectorAll('.screen');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// === Copy Group Link ===
function copyGroupLink() {
    navigator.clipboard.writeText("https://discord.gg/xPAjYmVQnW");
    alert("Link copied!");
}

// === Send Rank Webhook ===
document.getElementById('send-rank').addEventListener('click', () => {
    const rank = document.getElementById('rank-select').value;
    const username = document.getElementById('username').value;
    if (!rank || !username) return alert("Please fill in all fields!");

    alert(`Sending to Discord: ${username} - ${rank}`);
    fetch("https://discord.com/api/webhooks/1401505761770737674/QiUL9jgAFzps83r4kjnmkpGv1yeRIYbuARj6rtHH2qRJxHxkcNjvZnErmzbbojtmez-t", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `Username: ${username}\nRank: ${rank}`})
    });
});

// === Send Help Webhook ===
document.getElementById('send-help').addEventListener('click', () => {
    const text = document.getElementById('help-text').value;
    if (!text) return alert("Please fill in report!");
    alert(`Sending help to Discord: ${text}`);
    fetch("https://discord.com/api/webhooks/1401764712693235742/0qGT-3F8Y4Fy3yEI3OIXdKg_VuM2VHulpMVDca05BDDfTVbHd7WvzlGDIL_9CkJEIA4Y", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `Help Report: ${text}`})
    });
});

// === Snow Background Canvas ===
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let snowflakes = [];
for (let i = 0; i < 50; i++) {   // តិច snowflakes
    snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() + 0.5
    });
}
function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    updateSnow();
}
function updateSnow() {
    snowflakes.forEach(flake => {
        flake.y += flake.speed;
        if (flake.y > height) {
            flake.y = 0;
            flake.x = Math.random() * width;
        }
    });
}
function animateSnow() {
    drawSnow();
    requestAnimationFrame(animateSnow);
}
animateSnow();

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});
