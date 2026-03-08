let currentActiveTab = 'all';
let allIssues = [];

//add spinner in switchTab, api integration
const manageSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  const issuesContainer = document.getElementById('issue-list-container');
  if (show) {
    spinner.classList.remove("hidden");
    if (issuesContainer) issuesContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    if (issuesContainer) issuesContainer.classList.remove("hidden");
  }
};

const loadIssues = () => {
    manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
        allIssues = json.data;
        displayIssues(allIssues);
        manageSpinner(false);
    })
}

const loadIssueDetail = (id) => {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then(res => res.json())
    .then((details) => {
      displayIssueDetails(details.data);
      manageSpinner(false);
    });
};


const switchTab = (tab) => {
    manageSpinner(true); // show spinner for feedback
    currentActiveTab = tab; // save active tab context for search filtering
    const tabs = ['all', 'open', 'closed'];
    tabs.forEach(t =>{
        const btn = document.getElementById(`${t}-tab`)
        if(t === tab){
            btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20')
            btn.classList.remove('text-slate-400', 'hover:bg-slate-800')
        }
        else{
            btn.classList.add('text-slate-400', 'hover:bg-slate-800')
            btn.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20')
        }
    })

    //for causing a internet issue, have to set timer
    setTimeout(() => {
        const filteredIssues = allIssues.filter(issue => tab === 'all' || issue.status === tab);
        displayIssues(filteredIssues); // show the issues
        manageSpinner(false); // turn off spinner , show cards
    }, 600); //set timer cz of internet issues
}


const displayIssues = (issues) => {
    const issuesContainer = document.getElementById('issue-list-container');  //issues card here
    issuesContainer.innerHTML = "";

    const counterElement = document.getElementById('issues-counter');
    if(counterElement){
        counterElement.innerText = `${issues.length} issues`;
    }

    if(issues.length === 0){
        issuesContainer.innerHTML = `<h3 class="text-xl text-center text-slate-500 col-span-4 mt-20 font-medium">No records matching your search.</h3>`;
        return;
    }

    const template = document.getElementById('issue-card-template'); //issues card here
    issues.forEach(issue => { 
        //clone the issues card template
        const cardClone = template.content.cloneNode(true);
        const card = cardClone.querySelector('.issue-card'); //get the main div from the clone
        // Start with Green as the default for the top bar
        let topBarBg = 'bg-[#00A96E]';
        let statusIconClass = 'fa-door-open text-emerald-400';
        
        // If the status is 'closed', change it to Indigo
        if(issue.status === 'closed'){
            topBarBg = 'bg-indigo-500';
            statusIconClass = 'fa-door-closed text-indigo-400'; 
        }

        // Apply background to the top bar div
        const topBar = card.querySelector('.card-border-top');
        if(topBar) {
            topBar.className = `card-border-top h-2 w-full absolute top-0 left-0 transition-colors duration-300 ${topBarBg}`;
        }

        card.onclick = () => {
            loadIssueDetail(issue.id);
        }

        // Target the status icon
        const iconEl = card.querySelector('.status-icon');
        if(iconEl) {
            iconEl.classList.add(...statusIconClass.split(' '));
        }
        card.querySelector('.priority-container').innerHTML = getPriorityBadgeHTML(issue.priority);
        card.querySelector('.issue-title').innerText = issue.title;
        card.querySelector('.issue-desc').innerText = issue.description;

        const tagsHtml = issue.labels.map(tag => getLabelHTML(tag)).join(''); //this will turn the badge of bug design into span tag which is in machine.js
        card.querySelector('.labels-container').innerHTML = tagsHtml;
        const metaSpan = card.querySelector('.issue-meta span');
        if(metaSpan) metaSpan.innerText = `#${issue.id} by ${issue.author}`;
        card.querySelector('.issue-date').innerText = new Date(issue.createdAt).toLocaleDateString();

        //append the card to the container
        issuesContainer.appendChild(cardClone);
    });
}



const displayIssueDetails = (issue) => {
  const modal = document.getElementById('issue_modal');
  modal.showModal();

  document.getElementById('modal-issue-id').innerText = `#${issue.id}`;
  document.getElementById('modal-title').innerText = issue.title;
  document.getElementById('modal-author').innerText = issue.author;
  const dateString = new Date(issue.createdAt).toLocaleDateString();
  document.getElementById('modal-date').innerText = dateString;
  document.getElementById('modal-assignee').innerText = issue.assignee || 'Unassigned';
  const updatedDate = new Date(issue.updatedAt).toLocaleDateString();
  document.getElementById('modal-updated').innerText = updatedDate;
  document.getElementById('modal-description').innerText = issue.description;

  const isClosed = issue.status === 'closed';
  const statusBadge = document.getElementById("modal-status-badge");
  
  statusBadge.innerHTML = `
    <span class="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isClosed ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}">
        <i class="fa-solid ${isClosed ? 'fa-door-closed' : 'fa-door-open'} text-xs"></i> ${issue.status}
    </span>
  `;

  document.getElementById('modal-priority').innerHTML = getPriorityBadgeHTML(issue.priority);
  document.getElementById('modal-labels').innerHTML = issue.labels.map(label => getLabelHTML(label)).join('');
  //while map create a new list, in the mean time join is connected them together without whitespace.
};

let searchTimeout;
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    const searchValue = searchInput.value.trim().toLowerCase();
    
    if (!searchValue) {
      const filtered = allIssues.filter(issue => currentActiveTab === 'all' || issue.status === currentActiveTab);
      displayIssues(filtered);
      return;
    }
    
    searchTimeout = setTimeout(() => {
        manageSpinner(true);
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
          .then(res => res.json())
          .then(data => {
            const results = data.data || [];
            // filter search results based on the active tab
            const filtered = results.filter(issue => currentActiveTab === 'all' || issue.status === currentActiveTab);
            displayIssues(filtered);
            manageSpinner(false);
          })
          .catch(err => {
            console.error("Search failed:", err);
            manageSpinner(false);
          });
    }, 300); // 300ms debounce to save api calls
  });
}

// lgout logic
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}

//initial load
loadIssues();

