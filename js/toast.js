let icon = {
    success:
        '<span class="material-symbols-outlined">task_alt</span>',
    danger:
        '<span class="material-symbols-outlined">error</span>',
    warning:
        '<span class="material-symbols-outlined">warning</span>',
    info:
        '<span class="material-symbols-outlined">info</span>',
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (
        !Object.keys(icon).includes(toastType))
        toastType = "info";

    let box = document.createElement("div");
    box.classList.add(
        "m-toast", `m-toast-${toastType}`);
    box.innerHTML = ` <div class="m-toast-content-wrapper">
                      <div class="m-toast-icon">
                      ${icon[toastType]}
                      </div>
                      <div class="m-toast-message">${message}</div>
                      <div class="m-toast-progress"></div>
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".m-toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)
};
