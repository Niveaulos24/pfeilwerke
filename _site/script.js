let blocked = false;
const container = document.getElementById("registration");
const form = container.querySelector("form");

form.addEventListener("submit", async function (evt) {
    evt.preventDefault();

    if (blocked) {
        return;
    }

    let success = false;
    const url = "/join/" + encodeURIComponent(this.username.value);
    this.username.disable = true;

    blocked = true;

    try {
        const result = await fetch(url).then((res) => res.json());
        success = result.success;
    } catch (err) {
        console.error(err);
    }

    blocked = false;

    if (!success) {
        container.className = "error";
        return;
    }

    container.className = "success";
});