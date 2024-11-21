let icon = {
    success:
        '<img src="./assets/icon/task_alt.svg" alt="" class="m-icon">',
    danger:
        '<span class="material-symbols-outlined">error</span>',
    warning:
    '<img src="./assets/icon/warning.svg" alt="" class="m-icon">',
    info:
    '<img src="./assets/icon/error.svg" alt="" class="m-icon">',
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
