
  // document.addEventListener("DOMContentLoaded", function () {
  //   document.querySelectorAll('a[href^="#modal-"]').forEach(link => {
  //     link.addEventListener("click", function (e) {
  //       e.preventDefault();
  //       const modalId = this.getAttribute("href").substring(1);
  //       document.getElementById(modalId).style.display = "block";
  //     });
  //   });
  // });

  // function closeModal(id) {
  //   document.getElementById(id).style.display = "none";
  // }

  document.addEventListener("DOMContentLoaded", function () {
    // 现有的 modal 打开功能
    document.querySelectorAll('a[href^="#modal-"]').forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const modalId = this.getAttribute("href").substring(1);
        document.getElementById(modalId).style.display = "block";
      });
    });
  
    // 新增：给所有 .image-card img 添加加载中提示
    document.querySelectorAll(".image-card img").forEach(img => {
      const loading = document.createElement("div");
      loading.className = "img-loading";
      loading.innerText = "加载中...";
      img.parentNode.insertBefore(loading, img);
  
      img.onload = () => loading.remove();
      img.onerror = () => loading.innerText = "加载失败";
    });
  });
  
  // 原有关闭函数保持不变
  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }
  