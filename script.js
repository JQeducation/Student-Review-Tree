// 讀取 JSON 資料並顯示在網頁上
fetch('reviews.json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('reviews-list');
        data.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${item.name} - ${item.achievement}</h3><p>${item.comment}</p>`;
            list.appendChild(div);
        });
    });
