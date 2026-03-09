

const loadIssues = () => {
    const url ="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayIssues(data.data))
}

const displayIssues = (issues) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    for(let issue of issues){
        console.log(issue);
        const card = document.createElement("div")
        card.innerHTML = `
               <div class=" bg-white rounded-lg shadow-md p-5 space-y-5">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                        <div class="badge badge-soft badge-secondary">High</div>
                    </div>
                    <div>
                        <h2 class="text-lg font-semibold mb-2"> Fix navigation menu on mobile devices</h2>
                        <p class="text-sm font-regular text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices... </p>
                    </div>
                    <div>
                        <div class="badge badge-soft badge-secondary">Bug</div>
                        <div class="badge badge-soft badge-secondary">help wanted</div>
                    </div>
                    <hr class="opacity-30 -mx-5">
                    <div class="text-[#64748B] text-xs space-y-2">
                        <p>#1by john_doe</p>
                        <p>1/15/2024</p>
                    </div>
               </div>
        `;
        cardContainer.appendChild(card);
    }
}
loadIssues();