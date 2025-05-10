
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#modal-"]').forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const modalId = this.getAttribute("href").substring(1);
        document.getElementById(modalId).style.display = "block";
      });
    });
  });

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

