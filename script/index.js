
let currentActiveTab = 'all';
let allIssues = [];

const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
        allIssues = json.data;
        displayIssues(allIssues);
    })
}


const switchTab = (tab) => {
    currentActiveTab = tab; // Save active tab context for search filtering
    const tabs = ['all', 'open', 'closed'];
    console.log(tab);
    tabs.forEach(t =>{
        const btn = document.getElementById(`${t}-tab`)
        if(t === tab){
            btn.classList.add('bg-blue-600', 'text-white', 'border-transparent', 'btn-primary')
            btn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300')
        }
        else{
            btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300')
            btn.classList.remove('bg-blue-600', 'text-white', 'border-transparent', 'btn-primary')
        }
    })
    const filteredIssues = allIssues.filter(issue => tab === 'all' || issue.status === tab);
    displayIssues(filteredIssues); //show the issues
}


const displayIssues = (issues) => {
    const issuesContainer = document.getElementById('issue-list-container');
    issuesContainer.innerHTML = "";

    const counterElement = document.getElementById('issues-counter');
    if(counterElement){
        counterElement.innerText = `${issues.length} issues`;
    }

    if(issues.length === 0){
        issuesContainer.innerHTML = `<h3 class="text-xl text-center text-gray-500 col-span-4 mt-10">No issues found.</h3>`;
        return;
    }

    const template = document.getElementById('issue-card-template');
    issues.forEach(issue => {
        //clone the template
        const cardClone = template.content.cloneNode(true);
        const card = cardClone.querySelector('.issue-card'); //get the main div from the clone
        
        //decide styling
        let borderClass = 'border-t-[#00A96E]';
        let statusIcon = './assets/Open-Status.png';

        if(issue.status === 'closed'){
            borderClass = 'border-t-indigo-500';
            statusIcon = './assets/closed-status .png'; 
        }

        //apply DOM proptys
        card.classList.add(borderClass); 
        card.onclick = () => {
            loadIssueDetail(issue.id);
        }

        //target the specific parts of clone
        card.querySelector('.status-img').src = statusIcon;
        card.querySelector('.priority-container').innerHTML = getPriorityBadgeHTML(issue.priority);
        card.querySelector('.issue-title').innerText = issue.title;
        card.querySelector('.issue-desc').innerText = issue.description;

        let tagsHtml = "";
        issue.labels.forEach((tag)=>{
            tagsHtml = tagsHtml + getLabelHTML(tag);
        })

        card.querySelector('.labels-container').innerHTML = tagsHtml;
        card.querySelector('.issue-meta').innerText = `#${issue.id} by ${issue.author}`;
        card.querySelector('.issue-date').innerText = new Date(issue.createdAt).toLocaleDateString();

        //append the card to the container
        issuesContainer.appendChild(cardClone);
    });
}

const loadIssueDetail = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then(res => res.json())
    .then((details) => displayIssueDetails(details.data));
};

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
  const statusClass = isClosed ? 'bg-indigo-100 text-indigo-700' : 'bg-[#00A96E]/20 text-[#00A96E]';
  const statusIcon = isClosed ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle-dot"></i>';
  document.getElementById('modal-status-badge').innerHTML = `
    <span class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass}">
      ${statusIcon} ${issue.status}
    </span>
  `;

  document.getElementById('modal-priority').innerHTML = getPriorityBadgeHTML(issue.priority);
  document.getElementById('modal-labels').innerHTML = issue.labels.map(label => getLabelHTML(label)).join('');
};

// Search logic
//use searchvalues as variable that store user types cz it calling the notification api it will broke
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    
    if (!searchValue) {
      const filtered = allIssues.filter(issue => currentActiveTab === 'all' || issue.status === currentActiveTab);
      displayIssues(filtered);
      return;
    }
    
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.data.filter(issue => currentActiveTab === 'all' || issue.status === currentActiveTab);
        displayIssues(filtered);
      });
  });
}

// Initial load
loadIssues();

