const names = [
        "requestheader",
        "stauropegic",
        "rest",
        "fanta"
];

let index = 0;
let char = 0;
let deleting = false;

function typeName() {
    const name = names[index];
    const current = name.slice(0, char);

    if (!deleting) {
        char++;
    } else {
        char--;
    }

    const text = name.slice(0, char);

    document.getElementById("name").textContent = text;
    document.title = "@" + text;

    if (!deleting && char === name.length) {
        deleting = true;
        setTimeout(typeName, 1500);
        return;
    }

    if (deleting && char === 0) {
        deleting = false;
        index = (index + 1) % names.length;
    }

    setTimeout(typeName, deleting ? 100 : 200);
}

typeName();

enter.addEventListener("animationend", () => {
    enter.style.display = "none";
});

const canvas = document.getElementById("cursor-trail");
const ctx = canvas.getContext("2d");

let particles = [];
let mouseX = -100;
let mouseY = -100;

function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    for (let i = 0; i < 3; i++) {
        particles.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 3 + 1,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1
        });
    }
});

function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles = particles.filter(p => p.life > 0);

    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.life})`;
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

animate();
