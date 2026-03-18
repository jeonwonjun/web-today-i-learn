document.addEventListener('DOMContentLoaded', () => {
    const tilForm = document.querySelector('#til-form');
    const tilList = document.querySelector('#til-list');

    // 1. 페이지 로드 시 기존 데이터 불러오기
    const savedTILs = JSON.parse(localStorage.getItem('tils') || '[]');
    savedTILs.forEach(til => renderTIL(til));

    tilForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tilData = {
            date: document.querySelector('#til-date').value,
            title: document.querySelector('#til-title').value,
            content: document.querySelector('#til-content').value,
            id: Date.now() // 고유 ID 추가
        };

        // 2. 화면에 표시
        renderTIL(tilData);

        // 3. localStorage에 저장
        saveToLocal(tilData);

        tilForm.reset();
    });

    // 카드 렌더링 함수 (태그 그대로 출력하는 .textContent 방식 유지)
    function renderTIL(til) {
        const item = document.createElement('article');
        item.className = 'til-card';
        item.innerHTML = `
            <div class="card-date">${til.date}</div>
            <h4 class="card-title"></h4>
            <p class="card-content"></p>
        `;

        // 태그를 문자로 처리하여 안전하게 삽입
        item.querySelector('.card-title').textContent = til.title;
        item.querySelector('.card-content').textContent = til.content;

        tilList.prepend(item);
    }

    function saveToLocal(til) {
        const tils = JSON.parse(localStorage.getItem('tils') || '[]');
        tils.push(til);
        localStorage.setItem('tils', JSON.stringify(tils));
    }
});