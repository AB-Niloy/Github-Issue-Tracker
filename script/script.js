
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
        card.classList.add('rounded-lg')
         if(issue.status == "open"){
            card.classList.add("open")
        } else {
            card.classList.add("closed")
        }
        card.innerHTML = `
               <div class=" bg-white rounded-lg shadow-md p-5 space-y-5 h-full flex flex-col">
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
    // startLoading();
    const loadOpenIssues = () => {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(re => re.json())
        .then((data) => {
            const allIssues = data.data;
            const openIssues = allIssues.filter(iss => iss.status === "open");

            displayIssues(openIssues);
        })};
        loadOpenIssues();
        
});

const allTab = document.getElementById("allTab");
allTab.addEventListener("click", function(){
    // startLoading();
    loadIssues();
    // calculateCount();
});

const closedTab = document.getElementById("closedTab");
closedTab.addEventListener("click", function(){
    // startLoading();
    const loadClosedIssues = () => {
        fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(re => re.json())
        .then((data) => {
            const allIssues = data.data;
            const closedIssues = allIssues.filter(iss => iss.status === "closed");

            displayIssues(closedIssues);
        })};
        loadClosedIssues();
});