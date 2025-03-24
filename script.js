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

        const itemInnerTopDiv = document.createElement("div");
        const itemTextDiv = document.createElement("div");
        const itemInnerBottomDiv=document.createElement("div");

        const headingEl = document.createElement("h3");
        headingEl.textContent = item.name;

        const descriptionEl = document.createElement("p");
        descriptionEl.textContent = item.description;

        const imageEl = document.createElement("img");
        imageEl.src = item.logo;
        imageEl.alt = item.name;

        const removeBtn=document.createElement("button");
        removeBtn.textContent="Remove";
        removeBtn.classList.add("remove-btn")

        const labelEl=document.createElement("label");
        labelEl.classList.add("switch");

        const inputEl=document.createElement("input");
        inputEl.type="checkbox"

        const spanEl=document.createElement("span");
        if (item.isActive){
            spanEl.classList.add("slider-active");
        }
        else{
            spanEl.classList.add("slider-inactive")
        }
        spanEl.classList.add("round");

        labelEl.appendChild(inputEl);
        labelEl.appendChild(spanEl);

        itemTextDiv.classList.add("item-text-div");  
        itemInnerTopDiv.classList.add("item-inner-top-div");
        itemInnerBottomDiv.classList.add("item-inner-bottom-div");
        itemTextDiv.appendChild(headingEl);
        itemTextDiv.appendChild(descriptionEl);
        itemInnerTopDiv.appendChild(imageEl);
        itemInnerTopDiv.appendChild(itemTextDiv);
        itemInnerBottomDiv.appendChild(removeBtn);
        itemInnerBottomDiv.appendChild(labelEl);
        itemDiv.appendChild(itemInnerTopDiv);
        itemDiv.appendChild(itemInnerBottomDiv);
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
