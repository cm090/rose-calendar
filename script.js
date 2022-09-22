let app = {};

app.classes = classes;
app.filters = document.querySelectorAll('.days-selector > .chip');
app.events = document.querySelectorAll('.calendar > .card');

app.addListeners = () => {
    app.filters.forEach((item) => {
        item.onclick = () => {
            app.updateView(item.dataset.day);
            app.filters.forEach((f) => {
                f.classList.remove('selected');
                if (f.innerHTML.includes('symbols')) {
                    f.innerHTML = f.innerHTML.split('<span class="material-symbols-rounded">done</span>')[1];
                }
            });
            item.classList.add('selected');
            item.innerHTML = '<span class="material-symbols-rounded">done</span>' + item.innerHTML;
        }
    });
}

app.useCurrentDate = (skip) => {
    const d = new Date();
    if (!skip)
        app.filters[d.getDay() - 1].click();
    app.events.forEach((e) => e.classList.remove('current'));
    for (let i = app.events.length - 1; i >= 0; i--) {
        if (app.events[i].dataset.start <= d.getHours() && app.events[i].dataset.end >= d.getHours()) {
            app.events[i].classList.add('current');
            return;
        }
    }
}

app.updateView = (day) => {
    const data = document.querySelector('.calendar');
    data.innerHTML = '';
    if (!app.classes[day]) return;
    for (let i = 1; i <= Object.keys(app.classes[day]).length; i++) {
        const el = document.createElement('div');
        el.classList.add('card');
        if (app.classes[day][i]["busy"])
            el.classList.add('busy');
        const startNum = parseInt(app.classes[day][i]["start"].split(':')[0]) + parseInt(app.classes[day][i]["start"].split(':')[1]) / 60;
        const endNum = parseInt(app.classes[day][i]["end"].split(':')[0]) + parseInt(app.classes[day][i]["end"].split(':')[1]) / 60;
        el.setAttribute('data-start', startNum);
        el.setAttribute('data-end', endNum);
        el.setAttribute('style', '--size:' + (endNum - startNum));
        const num = document.createElement('div');
        num.classList.add('number');
        num.innerHTML = '<span>' + i + '</span>';
        el.appendChild(num);
        const content = document.createElement('div');
        content.classList.add('card-content');
        const start = (startNum > 12) ? (Math.floor(startNum) - 12) + ':' + String((startNum - Math.floor(startNum)) * 60).padStart(2, '0').split('.')[0] + " PM" : Math.floor(startNum) + ':' + String((startNum - Math.floor(startNum)) * 60).padStart(2, '0').split('.')[0] + " AM";
        const end = (endNum > 12) ? (Math.floor(endNum) - 12) + ':' + String((endNum - Math.floor(endNum)) * 60).padStart(2, '0').split('.')[0] + " PM" : Math.floor(endNum) + ':' + String((endNum - Math.floor(endNum)) * 60).padStart(2, '0').split('.')[0] + " AM";
        content.innerHTML = `<h3 class="card-title">${app.classes[day][i]["name"]}</h3><h3 class="card-description">${start} - ${end}</h3>`;
        el.appendChild(content);
        data.appendChild(el);
    }
    app.events = document.querySelectorAll('.calendar > .card');
    app.useCurrentDate(true);
}

app.main = () => {
    app.addListeners();
    app.useCurrentDate();
    document.getElementById('infoIcon').onclick = () => {
        $('#infoModal').slideDown(50);
    }
    document.getElementById('infoModal').onclick = () => {
        $('#infoModal').slideUp(50);
    }
}

app.main();