let poetry = [];
let page = 1;
const limit = 8;
let category = 'all';

async function fetchPoems() {
    try {
        const response = await fetch('/poetrys.json');
        poetry = await response.json();
         // 倒序排列，最新的内容在最前面
poetry.reverse();
        renderPoems();
    } catch (error) {
        console.error("数据加载失败:", error);
    }
}

function renderPoems() {
    const poetryList = document.getElementById('poetry-list');
    poetryList.innerHTML = '';

    let filteredPoems = category === 'all' ? poetry : poetry.filter(p => p.category === category);
    let paginatedPoems = filteredPoems.slice((page - 1) * limit, page * limit);

    paginatedPoems.forEach(poem => {
        const card = document.createElement('div');
        card.className = 'poetry-card';
        card.innerHTML = `
            <div class="poetry-box-shang">
                <div class="poetry-title">
                    <h1>${poem.title}</h1>
                    <span>作者：${poem.author}</span>
                </div>
                <div class="poetry-content-text">
                    <p>${poem.content.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
            <div class="poetry-box-xia">
                <p>${poem.annotation.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        poetryList.appendChild(card);
    });

    document.getElementById('page-info').innerText = `第 ${page} 页 / 共 ${Math.ceil(filteredPoems.length / limit) || 1} 页`;
}

function prevPage() {
    if (page > 1) {
        page--;
        renderPoems();
    }
}

function nextPage() {
    let filteredPoems = category === 'all' ? poetry : poetry.filter(p => p.category === category);
    if (page * limit < filteredPoems.length) {
        page++;
        renderPoems();
    }
}

function filterCategory(cat) {
    category = cat;
    page = 1;
    renderPoems();
}

document.addEventListener("DOMContentLoaded", fetchPoems);