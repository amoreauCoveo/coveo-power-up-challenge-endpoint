var currentTab = "Movies";
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function switchTab(tab) {
            document.querySelector(".selected-tab").classList.remove("selected-tab");
            currentTab = tab.target.id;
            document.querySelector(`#${currentTab}`).classList.add("selected-tab");
            const movieElements = document.getElementsByClassName("movie-tab");
            const directorElements = document.getElementsByClassName("director-tab");
            if (tab.target.id == "Movies") {
                for (j = 0; j < movieElements.length; j++) {
                    if (movieElements[j].classList.contains("hidden")) {
                        movieElements[j].classList.remove("hidden");
                    }
                }
                for (k = 0; k < directorElements.length; k++) {
                    directorElements[k].classList.add("hidden");
                }
            }
            if (tab.target.id == "Directors") {
                for (j = 0; j < directorElements.length; j++) {
                    if (directorElements[j].classList.contains("hidden")) {
                        directorElements[j].classList.remove("hidden");
                    }
                }
                for (k = 0; k < movieElements.length; k++) {
                    movieElements[k].classList.add("hidden");
                }
            }
        })
    }
})

function getCurrentTab() {
    return currentTab;
}