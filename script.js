gsap.registerPlugin(ScrollTrigger);

// 1. 初始化樹幹動畫
const path = document.querySelector('#tree-trunk');
if (path) {
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
            trigger: ".scroll-dist",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
}

// 2. 讀取評價並放置
fetch('reviews.json')
    .then(res => {
        if (!res.ok) throw new Error("找不到 reviews.json 檔案");
        return res.json();
    })
    .then(data => {
        console.log("成功讀取資料:", data); // 偵錯用
        const container = document.getElementById('leaf-container');
        
        data.forEach((item, index) => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            // 這裡確保即便圖片失效，文字也會出現
            leaf.innerHTML = `
                <div style="background:#e8f5e9; padding:10px; border-radius:10px;">
                    <img src="${item.photo}" onerror="this.src='https://via.placeholder.com/50?text=Student'" alt="${item.name}">
                    <strong>${item.name}</strong><br>
                    <small style="color:#2e7d32;">${item.achievement}</small>
                    <p style="font-size: 0.9rem; margin-top:5px;">${item.comment}</p>
                </div>
            `;
            
            // 調整位置：讓它們分布在樹幹兩側 (左 10% 或 右 10%)
            const side = index % 2 === 0 ? 'left' : 'right';
            const yPos = 70 - (index * 25); // 讓卡片垂直拉開距離
            
            leaf.style.top = `${yPos}%`;
            leaf.style[side] = '10%';
            
            container.appendChild(leaf);

            // 3. 讓動畫更容易觸發
            gsap.to(leaf, {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: ".scroll-dist",
                    start: `${10 + (index * 20)}% center`, // 只要捲動一點點就會觸發
                    end: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            });
        });
    })
    .catch(err => console.error("發生錯誤:", err));
