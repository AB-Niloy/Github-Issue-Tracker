// Count
function calculateCount() {
    const count = document.getElementById("total-count");
    const cardContainer = document.getElementById("card-container");
    const total = cardContainer.children.length;
    count.innerText = total;
}
calculateCount();

const spinner = document.getElementById("spinner");
const cardContainer = document.getElementById("card-container");

// Loading
function startLoading() {
    spinner.classList.remove("hidden");
    cardContainer.classList.add("hidden");
}

function stopLoading() {
    spinner.classList.add("hidden");
    cardContainer.classList.remove("hidden");
}

// Load & display Issues
const loadIssues = () => {
    const url ="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data))
}

const createElements = (arr) => {
    const htmlElements = arr.map(el => 
        `
        <div class="badge badge-soft ${el == 'bug' ? 'badge-error' : el == 'help wanted' ? 'badge-warning' : 'badge-success'} text-xs"> 
            <i class="fa-solid ${el == 'bug' ? 'fa-bug' : el == 'help wanted' ? 'fa-life-ring' : 'fa-wand-magic-sparkles'}"></i>
            ${el.toUpperCase()}
        </div>
        `
    );
    return htmlElements.join(" ");
}

const displayIssues = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    for(let issue of issues){
        // console.log(issue.priority);
        const card = document.createElement("div")
        card.classList.add('rounded-lg', 'issue-card')
        card.setAttribute("id", issue.id)
         if(issue.status == "open"){
            card.classList.add("open")
        } else {
            card.classList.add("closed")
        }
        card.innerHTML = `
               <div class=" bg-white rounded-lg shadow-md p-5 space-y-5 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div class="flex justify-between">
                        <img src="./assets/${issue.status}.png" alt="${issue.status}">
                        <div class="badge badge-soft badge-secondary ${issue.priority == 'high' ? 'badge-error text-[#EF4444] bg-[#FEECEC]' : issue.priority == 'medium' ? 'badge-warning text-[#F59E0B] bg-[#FFF6D1]' : 'badge-neutral text-[#9CA3AF] bg-[#EEEFF2]'}">${issue.priority.toUpperCase()}</div>
                    </div>
                    <div>
                        <h2 class="text-md font-semibold mb-2"> ${issue.title}</h2>
                        <p class="text-sm font-regular text-[#64748B]">${issue.description} </p>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${createElements(issue.labels)}
                    </div>
            
                    <div class="text-[#64748B] border-t border-[#E4E4E7] text-xs space-y-2 p-4 mt-auto">
                        <p>#${issue.id} by ${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                    </div>     
               </div>
        `;
        cardContainer.appendChild(card);
    }
    calculateCount();
    stopLoading();
}
loadIssues();


const disableActive = (btn) => {
    btn.classList.remove("btn-primary");
}
const enableActive = (btn) => {
    btn.classList.add("btn-primary")
}
// Toggle Buttons
const showTab = (id) => {
    const allBtns = document.querySelectorAll(".tab-btn");
    for(let btn of allBtns) {
        disableActive(btn);
    }
    const active = document.getElementById(id);
    enableActive(active);
}

window.addEventListener("DOMContentLoaded", function () {
    showTab("allTab");
});

const openTab = document.getElementById("openTab");

openTab.addEventListener("click", function(){
    startLoading();
    const loadOpenIssues = () => {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(re => re.json())
        .then((data) => {
            const allIssues = data.data;
            const openIssues = allIssues.filter(iss => iss.status === "open");

            displayIssues(openIssues);
            stopLoading();
        })};
        loadOpenIssues();
        
});

const allTab = document.getElementById("allTab");
allTab.addEventListener("click", function(){
    startLoading();
    loadIssues();
    // stopLoading();
    // calculateCount();
});

const closedTab = document.getElementById("closedTab");
closedTab.addEventListener("click", function(){
    startLoading();
    const loadClosedIssues = () => {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(re => re.json())
        .then((data) => {
            const allIssues = data.data;
            const closedIssues = allIssues.filter(iss => iss.status === "closed");

            displayIssues(closedIssues);
            stopLoading();
        })};
        loadClosedIssues();
});

// Modal
const cards = document.getElementById("card-container");
cards.addEventListener("click", function(event){
    let actualParent = event.target.closest(".issue-card");
    const identity = actualParent.getAttribute("id");
    console.log(identity);

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${identity}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data));
})

displayModal = (data) => {
    const modal = document.getElementById("my_modal_5");
    modal.innerHTML = `
        <div class="modal-box p-6">
            <h3 class="text-2xl font-bold mb-2">${data.title}</h3>
            <div class="flex items-center gap-2">
                <div class = "font-medium text-sm py-[6px] px-[15.5px] capitalize text-white rounded-[100px] bg-[${data.status == "open"? '#00A96E' : '#A855F7'}]" > ${data.status == "open" ? data.status + 'ed' : data.status} </div>
                <div class = "w-1 h-1 rounded-full bg-[#64748B] my-auto"></div>
                <span class = "text-sm text-[#64748B]">${data.status == "open" ? data.status + 'ed' : data.status} by ${data.assignee}</span>
                <div class = "w-1 h-1 rounded-full bg-[#64748B] my-auto"></div>
                <span class = "text-sm text-[#64748B]">${new Date(data.updatedAt).toLocaleDateString("en-US")}
            </div>
            <div class="labels flex flex-wrap gap-1 my-6">
                ${createElements(data.labels)}
            </div>
            <p class="mb-6 text-[#64748B]">
                ${data.description}
            </p>
            <div class="grid grid-cols-2 gap-2.5 bg-[#F8FAFC] p-4 rounded-lg">
                <div>
                    <p class="text-[#64748B] mb-1"> Assignee: </p>
                    <h4 class="font-semibold text-base"> ${data.assignee} </h4>
                </div>
                <div>
                    <p class="text-[#64748B] mb-1">Priority: </p>
                    <div class="py-[6px] px-[15.5px] w-fit rounded-[100px] uppercase text-xs ${data.priority == 'high' ? 'bg-[#EF4444] text-[#FEECEC]' : data.priority == 'medium' ? 'bg-[#F59E0B] text-[#FFF6D1]' : 'badge-soft badge-neutral text-black'}">${data.priority}</div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                <button class="btn btn-primary">Close</button>
                </form>
            </div>
        </div>
    `
    modal.showModal();
}

// Search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(){
    startLoading();
    const allBtns = document.querySelectorAll(".tab-btn");
    for(btn of allBtns) {
        disableActive(btn);
    }
    const query = searchInput.value.trim();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayIssues(data.data));

})