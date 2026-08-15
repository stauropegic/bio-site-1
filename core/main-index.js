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