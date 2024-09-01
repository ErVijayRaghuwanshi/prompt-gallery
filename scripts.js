let currentPage = 0;
const itemsPerPage = 24;
let allPrompts = [];
let displayedPrompts = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            allPrompts = data;
            shuffleArray(allPrompts); // Shuffle the array
            displayedPrompts = allPrompts; // Copy the shuffled array to displayedPrompts
            loadMoreItems(24);
        });

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', handleSearch);

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
            loadMoreItems(24);
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

// Function to dynamically load more items into the Masonry grid
function loadMoreItems(itemsPerPage=10) {
    const gallery = document.getElementById('gallery');
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    // Slice the items to load for the current page
    const itemsToLoad = displayedPrompts.slice(start, end);

    itemsToLoad.forEach((item, index) => {
        // Calculate which column to append the item to
        const columnIndex = (index % 3); // 4 columns as defined in grid-cols-4

        // Find existing column or create a new one
        let column = gallery.querySelectorAll('.grid-column')[columnIndex];

        if (!column) {
            column = document.createElement('div');
            column.classList.add('grid', 'gap-4', 'grid-column'); // Add a class to distinguish columns
            gallery.appendChild(column);
        }

        // Create an item container
        const div = document.createElement('div');
        div.classList.add('gallery-item'); // Add gallery-item class if needed for styling
        
        // Create image element
        const img = document.createElement('img');
        img.src = "https://cdn.cp.adobe.io/content/2/rendition" + item.img_url;
        img.alt = item.prompt;
        img.classList.add("h-auto", "max-w-full", "rounded-lg");
        
        div.appendChild(img);
        
        // Create overlay container
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

        // Append the item container to the respective column
        column.appendChild(div);
    });

    currentPage++;
}

// Initial load of items
loadMoreItems(10);

// Add a scroll event listener to load more items when scrolled to the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreItems(24);
    }
});

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    displayedPrompts = allPrompts.filter(item => 
        item.prompt.toLowerCase().includes(searchTerm)
    );

    currentPage = 0;
    document.getElementById('gallery').innerHTML = '';
    loadMoreItems(24);
}


function setSearchQuery(query) {
    const searchBar = document.getElementById('searchBar');
    searchBar.value = query;

    // Manually trigger the input event to perform the search
    handleSearch({ target: searchBar });
}