let currentPage = 0;
const itemsPerPage = 20;
let allPrompts = [];
let displayedPrompts = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            allPrompts = data;
            shuffleArray(allPrompts); // Shuffle the array
            displayedPrompts = allPrompts; // Copy the shuffled array to displayedPrompts
            loadMoreItems();
        });

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', handleSearch);

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            loadMoreItems();
        }
    });
});

// Function to shuffle an array
function shuffleArray(array) {
    // for (let i = array.length - 1; i > 0; i--) {
    for (let i = 100 - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadMoreItems() {
    const gallery = document.getElementById('gallery');
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    const itemsToLoad = displayedPrompts.slice(start, end);
    itemsToLoad.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.src = "https://cdn.cp.adobe.io/content/2/rendition" + item.img_url;
        img.alt = item.prompt;
        div.appendChild(img);
        
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        const promptText = document.createElement('p');
        promptText.textContent = item.prompt;
        overlay.appendChild(promptText);
        
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Prompt';
        copyButton.classList.add('copy-button');
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(item.prompt);
        });
        overlay.appendChild(copyButton);

        div.appendChild(overlay);
        gallery.appendChild(div);
    });

    currentPage++;
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    displayedPrompts = allPrompts.filter(item => 
        item.prompt.toLowerCase().includes(searchTerm)
    );

    currentPage = 0;
    document.getElementById('gallery').innerHTML = '';
    loadMoreItems();
}


// function setSearchQuery(query) {
//     document.getElementById('searchBar').value = query;
//     // Optionally, you can trigger the search function here if needed
//     // searchImages(query); // Uncomment and implement this if needed
// }

function setSearchQuery(query) {
    const searchBar = document.getElementById('searchBar');
    searchBar.value = query;

    // Manually trigger the input event to perform the search
    handleSearch({ target: searchBar });
}