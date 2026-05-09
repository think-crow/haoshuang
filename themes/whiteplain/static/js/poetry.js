// let poetry = [];
// let page = 1;
// const limit = 8;
// let category = 'all';

// async function fetchPoems() {
//     try {
//         const response = await fetch('/poetrys.json');
//         poetry = await response.json();
//          // 倒序排列，最新的内容在最前面
// poetry.reverse();
//         renderPoems();
//     } catch (error) {
//         console.error("数据加载失败:", error);
//     }
// }

// function renderPoems() {
//     const poetryList = document.getElementById('poetry-list');
//     poetryList.innerHTML = '';

//     let filteredPoems = category === 'all' ? poetry : poetry.filter(p => p.category === category);
//     let paginatedPoems = filteredPoems.slice((page - 1) * limit, page * limit);

//     paginatedPoems.forEach(poem => {
//         const card = document.createElement('div');
//         card.className = 'poetry-card';
//         card.innerHTML = `
//             <div class="poetry-box-shang">
//                 <div class="poetry-title">
//                     <h1>${poem.title}</h1>
//                     <span>作者：${poem.author}</span>
//                 </div>
//                 <div class="poetry-content-text">
//                     <p>${poem.content.replace(/\n/g, '<br>')}</p>
//                 </div>
//             </div>
//             <div class="poetry-box-xia">
//                 <p>${poem.annotation.replace(/\n/g, '<br>')}</p>
//             </div>
//         `;
//         poetryList.appendChild(card);
//     });

//     document.getElementById('page-info').innerText = `第 ${page} 页 / 共 ${Math.ceil(filteredPoems.length / limit) || 1} 页`;
// }

// function prevPage() {
//     if (page > 1) {
//         page--;
//         renderPoems();
//     }
// }

// function nextPage() {
//     let filteredPoems = category === 'all' ? poetry : poetry.filter(p => p.category === category);
//     if (page * limit < filteredPoems.length) {
//         page++;
//         renderPoems();
//     }
// }

// function filterCategory(cat) {
//     category = cat;
//     page = 1;
//     renderPoems();
// }

// document.addEventListener("DOMContentLoaded", fetchPoems);

let poetry = [];
let page = 1;
const limit = 8;
let category = 'all';
let loading = false; // 防止重复加载

async function fetchPoems() {
    try {
        const response = await fetch('/poetrys.json');
        poetry = await response.json();

        // 最新内容在前
        poetry.reverse();

        // 首次加载
        renderPoems(true);

    } catch (error) {
        console.error("数据加载失败:", error);
    }
}

function renderPoems(reset = false) {

    const poetryList = document.getElementById('poetry-list');

    // 重置时清空
    if (reset) {
        poetryList.innerHTML = '';
        page = 1;
    }

    let filteredPoems =
        category === 'all'
            ? poetry
            : poetry.filter(p => p.category === category);

    let start = (page - 1) * limit;
    let end = page * limit;

    let paginatedPoems = filteredPoems.slice(start, end);

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

    // 更新页码显示
    document.getElementById('page-info').innerText =
        `已加载 ${Math.min(end, filteredPoems.length)} / ${filteredPoems.length}`;

    loading = false;
}

// 滚动加载
window.addEventListener('scroll', () => {

    // 页面高度
    const scrollTop = window.scrollY;

    // 可视区域高度
    const windowHeight = window.innerHeight;

    // 页面总高度
    const documentHeight = document.documentElement.scrollHeight;

    // 距离底部100px触发
    if (
        scrollTop + windowHeight >= documentHeight - 100 &&
        !loading
    ) {

        let filteredPoems =
            category === 'all'
                ? poetry
                : poetry.filter(p => p.category === category);

        // 是否还有下一页
        if (page * limit < filteredPoems.length) {

            loading = true;

            page++;

            renderPoems();
        }
    }
});

// 分类切换
function filterCategory(cat) {

    category = cat;

    renderPoems(true);
}

document.addEventListener("DOMContentLoaded", fetchPoems);