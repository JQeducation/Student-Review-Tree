gsap.registerPlugin(ScrollTrigger);

// 1. 初始化樹幹動畫 (讓線條像生長一樣畫出來)
const path = document.querySelector('#tree-trunk');
const pathLength = path.getTotalLength();

gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

gsap.to(path, {
    strokeDashoffset: 0,
    scrollTrigger: {
        trigger: ".scroll-dist",
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // 讓動畫跟著手指捲動同步
    }
});

// 2. 讀取評價並放置在樹的兩側
fetch('reviews.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('leaf-container');
        
        data.forEach((item, index) => {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.innerHTML = `
                <img src="${item.photo}" alt="${item.name}">
                <strong>${item.name}</strong><br>
                <small>${item.achievement}</small>
                <p style="font-size: 0.9rem;">${item.comment}</p>
            `;
            
            // 隨機分布在樹幹左右
            const side = index % 2 === 0 ? 'left' : 'right';
            const yPos = 80 - (index * 20); // 越後面的評價越高
            
            leaf.style.top = `${yPos}%`;
            leaf.style[side] = '15%';
            
            container.appendChild(leaf);

            // 3. 設定每片葉子出現的動畫
            gsap.to(leaf, {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: ".scroll-dist",
                    start: `${(index + 1) * 20}% center`, // 捲動到一定比例才出現
                    end: "bottom bottom",
                    toggleActions: "play reverse play reverse"
                }
            });
        });
    });
