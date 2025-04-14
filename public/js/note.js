let page = 1;
const limit = 27;
let total = 0;
let data = [];
let loading = false;

async function fetchData() {
  if (loading) return;
  loading = true;
  document.getElementById('loading').style.display = 'flex';

  try {
    const response = await fetch('/notepapers.json');
    const result = await response.json();

    // 数据倒序排列
    result.reverse();
    total = result.length;

    // 筛选出尚未添加的数据，避免重复，并且检查 visible 字段
    const newData = result.slice((page - 1) * limit, page * limit).filter(item => 
      !data.some(existingItem => existingItem.submi_date === item.submi_date) &&
      item.visible === "true" // 只有 visible 为 "true" 的数据才会被添加
    );

    if (newData.length) {
      data = [...data, ...newData];
      page++;
      renderData(newData);
    }
  } catch (error) {
    console.error('数据加载失败:', error);
  } finally {
    loading = false;
    document.getElementById('loading').style.display = 'none';
  }
}

function renderData(newData) {
  const container = document.getElementById('note-list');

  newData.forEach((item) => {
    const note = document.createElement('div');
    note.className = 'n-card';
    note.innerHTML = `
      <div class="paper-text">
        <div class="submitdate">${formatDate(item.submi_date)}</div>
        <p>${item.content.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</p>
      </div>
    `;
    container.appendChild(note);
  });
}

function handleScroll() {
  if (
    !loading &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    (page - 1) * limit < total
  ) {
    fetchData(); // 触发加载
  }
}

function formatDate(timestamp) {
  const date = new Date(Number(timestamp)); // 确保为数值格式
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', handleScroll);
  fetchData(); // 初始加载
});
