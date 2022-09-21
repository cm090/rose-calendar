var app = {};

app.classes = {
    "1": {
        "1": {
            "name": "CSSE232",
            "time": "9",
            "size": 1,
            "busy": true
        },
        "2": {
            "name": "BIO101",
            "time": "10",
            "size": 1,
            "busy": true
        },
        "3": {
            "name": "Free",
            "time": "11",
            "size": 1,
            "busy": false
        },
        "4": {
            "name": "MA276",
            "time": "12",
            "size": 1,
            "busy": true
        },
        "5": {
            "name": "Free",
            "time": "13",
            "size": 2,
            "busy": false
        },
        "6": {
            "name": "CSSE220 TA",
            "time": "15",
            "size": 2,
            "busy": true
        }
    },
    "2": {
        "1": {
            "name": "CSSE232",
            "time": "9",
            "size": 1,
            "busy": true
        },
        "2": {
            "name": "BIO101",
            "time": "10",
            "size": 1,
            "busy": true
        },
        "3": {
            "name": "Free",
            "time": "11",
            "size": 1,
            "busy": false
        },
        "4": {
            "name": "MA276",
            "time": "12",
            "size": 1,
            "busy": true
        },
        "5": {
            "name": "CSSE280",
            "time": "13",
            "size": 2,
            "busy": true
        },
        "6": {
            "name": "CSSE220 TA",
            "time": "15",
            "size": 2,
            "busy": true
        }
    },
    "3": {
        "1": {
            "name": "CSSE232",
            "time": "9",
            "size": 2,
            "busy": true
        },
        "2": {
            "name": "Free",
            "time": "10",
            "size": 1,
            "busy": false
        },
        "3": {
            "name": "BIO101",
            "time": "11",
            "size": 3,
            "busy": true
        }
    },
    "4": {
        "1": {
            "name": "CSSE232",
            "time": "9",
            "size": 1,
            "busy": true
        },
        "2": {
            "name": "BIO101",
            "time": "10",
            "size": 1,
            "busy": true
        },
        "3": {
            "name": "Free",
            "time": "11",
            "size": 1,
            "busy": false
        },
        "4": {
            "name": "MA276",
            "time": "12",
            "size": 1,
            "busy": true
        },
        "5": {
            "name": "CSSE280",
            "time": "13",
            "size": 2,
            "busy": true
        },
        "6": {
            "name": "CSSE220 TA",
            "time": "15",
            "size": 2,
            "busy": true
        }
    },
    "5": {
        "1": {
            "name": "CSSE232",
            "time": "9",
            "size": 1,
            "busy": true
        },
        "2": {
            "name": "Free",
            "time": "10",
            "size": 2,
            "busy": false
        },
        "3": {
            "name": "MA276",
            "time": "12",
            "size": 1,
            "busy": true
        },
        "4": {
            "name": "CSSE280",
            "time": "13",
            "size": 2,
            "busy": true
        }
    }
};

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
    app.events.forEach((e) => {
        if (e.dataset.start <= d.getHours() && e.clientHeight / 86 + parseInt(e.dataset.start) >= d.getHours()) {
            e.classList.add('current');
        } else {
            e.classList.remove('current');
        }
    });
}

app.updateView = (day) => {
    const data = document.querySelector('.calendar');
    data.innerHTML = '';
    if (!app.classes[day]) return;
    for (var i = 1; i <= Object.keys(app.classes[day]).length; i++) {
        const el = document.createElement('div');
        el.classList.add('card');
        if (app.classes[day][i]["busy"])
            el.classList.add('busy'); el.setAttribute('data-start', app.classes[day][i]["time"]);
        el.setAttribute('style', '--size:' + app.classes[day][i]["size"]);
        const num = document.createElement('div');
        num.classList.add('number');
        num.innerHTML = '<span>' + i + '</span>';
        el.appendChild(num);
        const content = document.createElement('div');
        content.classList.add('card-content');
        const time = (parseInt(app.classes[day][i]["time"]) > 12) ? (parseInt(app.classes[day][i]["time"]) - 12) + ":00 PM" : (parseInt(app.classes[day][i]["time"])) + ":00 AM";
        content.innerHTML = `<h3 class="card-title">${app.classes[day][i]["name"]}</h3><h3 class="card-description">${time}</h3>`;
        el.appendChild(content);
        data.appendChild(el);
    }
    app.events = document.querySelectorAll('.calendar > .card');
    app.useCurrentDate(true);
}

app.main = () => {
    app.addListeners();
    app.useCurrentDate();
}

app.main();