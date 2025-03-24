const toggleBtn = document.getElementById("toggleBtn");
const toggleImg = document.getElementById("toggleImg");
const body = document.getElementById("body");

toggleBtn.addEventListener("click", function () {
    if (toggleImg.dataset.theme === "light") {
        toggleImg.src = "./assets/images/icon-moon.svg";
        toggleImg.alt = "icon-moon";
        toggleImg.dataset.theme = "dark";
        body.className = "container-light";
    } else {
        toggleImg.src = "./assets/images/icon-sun.svg";
        toggleImg.alt = "icon-sun";
        toggleImg.dataset.theme = "light";
        body.className = "container-dark";
    }
});

let data_list = [];

fetch("./data.json")
  .then(response => response.json())
  .then(data => {
    console.log("Fetched data:", data);
    data_list = data;
    renderList(data_list);
  })
  .catch(error => console.error("Error fetching data:", error));

function renderList(filteredData) {
    const parentDiv = document.getElementById("dynamicListDiv");
    parentDiv.innerHTML = "";

    if (!filteredData || filteredData.length === 0) {
        console.log("No data found!");
        return;
    }

    filteredData.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-div");
        itemDiv.innerHTML=`
            <div class="item-inner-top-div">
                <img src=${item.logo} alt=${item.name} />
                <div class="item-text-div">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </div>
            </div>
            <div class="item-inner-bottom-div">
                <button class="remove-btn" type="button">
                    Remove
                </button>
                <label class="switch">
                    <input type="checkbox"/>
                    <span class="${item.isActive?"slider-active":"slider-inactive"} round"></span>
                </label>
            </div>
        `;
        parentDiv.appendChild(itemDiv);
    });

    console.log("Elements added to DOM");
}


document.getElementById("allBtn").addEventListener("click", function () {
    updateActiveButton(this);
    renderList(data_list);
});

document.getElementById("activeBtn").addEventListener("click", function () {
    updateActiveButton(this);
    const filteredList = data_list.filter(item => item.isActive === true);  
    renderList(filteredList);
});

document.getElementById("inactiveBtn").addEventListener("click", function () {
    updateActiveButton(this);
    const filteredList = data_list.filter(item => item.isActive === false);
    renderList(filteredList);
});


function updateActiveButton(selectedBtn) {
    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach(btn => btn.classList.remove("active"));
    selectedBtn.classList.add("active");
}
