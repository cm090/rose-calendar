let app = {};
app.classes = classes;
app.filters = document.querySelectorAll('.days-selector > .chip');
app.events = document.querySelectorAll('.calendar > .card');
const TIME_ZONE = 'America/Indianapolis';

/**
 * Adding an event listener to each of the filters.
*/
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

/**
 * If skip == true, check the current time and select the corresponding filter.
 * Add a class to the event that is currently happening.
*/
app.useCurrentDate = (skip) => {
    const d = new Date();
    const local = d.toLocaleString();
    const req = d.toLocaleString('en', { timeZone: TIME_ZONE });
    app.offset = parseInt(local.split(' ')[1].split(':')[0]) - parseInt(req.split(' ')[1].split(':')[0]);
    if (!skip && app.filters[d.getDay() - 1]) {
        app.filters[d.getDay() - 1].click();
        app.filters[d.getDay() - 1].scrollIntoView();
        window.scrollTo(0, 0);
    }
    app.events.forEach((e) => e.classList.remove('current'));
    for (let i = app.events.length - 1; i >= 0; i--) {
        if (app.events[i].dataset.start <= (d.getHours() + d.getMinutes() / 60) && app.events[i].dataset.end > (d.getHours() + d.getMinutes() / 60)) {
            app.events[i].classList.add('current');
            return;
        }
    }
}

/**
 * Creating the cards for the calendar.
*/
app.updateView = (day) => {
    const data = document.querySelector('.calendar');
    data.innerHTML = '';
    if (!app.classes[day]) return;
    for (let i = 1; i <= Object.keys(app.classes[day]).length; i++) {
        const el = document.createElement('div');
        el.classList.add('card');
        if (app.classes[day][i]["busy"])
            el.classList.add('busy');
        let startNum = parseInt(app.classes[day][i]["start"].split(':')[0]) + parseInt(app.classes[day][i]["start"].split(':')[1]) / 60;
        let endNum = parseInt(app.classes[day][i]["end"].split(':')[0]) + parseInt(app.classes[day][i]["end"].split(':')[1]) / 60;
        startNum += app.offset;
        endNum += app.offset;
        el.setAttribute('data-start', startNum);
        el.setAttribute('data-end', endNum);
        el.setAttribute('style', '--size:' + (endNum - startNum));
        const num = document.createElement('div');
        num.classList.add('number');
        num.innerHTML = '<span>' + i + '</span>';
        el.appendChild(num);
        const content = document.createElement('div');
        content.classList.add('card-content');
        if (Math.floor(startNum) == 0 || Math.floor(startNum) == 12)
            startNum += 12;
        if (Math.floor(endNum) == 0 || Math.floor(endNum) == 12)
            endNum += 12;
        const start = (startNum > 12) ? (Math.floor(startNum) - 12) + ':' + String((startNum - Math.floor(startNum)) * 60).padStart(2, '0').split('.')[0] + " PM" : Math.floor(startNum) + ':' + String((startNum - Math.floor(startNum)) * 60).padStart(2, '0').split('.')[0] + " AM";
        const end = (endNum > 12) ? (Math.floor(endNum) - 12) + ':' + String((endNum - Math.floor(endNum)) * 60).padStart(2, '0').split('.')[0] + " PM" : Math.floor(endNum) + ':' + String((endNum - Math.floor(endNum)) * 60).padStart(2, '0').split('.')[0] + " AM";
        content.innerHTML = `<h3 class="card-title">${app.classes[day][i]["name"]}</h3><h3 class="card-description">${start} - ${end}</h3>`;
        el.appendChild(content);
        data.appendChild(el);
    }
    app.events = document.querySelectorAll('.calendar > .card');
    app.useCurrentDate(true);
}

/**
 * The main function of the app. It adds the event listeners to the filters, selects the current day, and adds the event listeners to the info icon and modal.
*/
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