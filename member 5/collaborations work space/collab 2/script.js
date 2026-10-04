(function () {

    var $ = function (s) {
        return document.querySelector(s);
    };

    var rev = 0;
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


    // PROJECT DATA
    var projects = [
        ['Launch site', 'Due Friday', 70],
        ['Mobile app', 'Due in 3 weeks', 35],
        ['Design system', 'Ongoing', 55],
        ['Help center', 'Due Monday', 20]
    ];


    // TASK DATA
    var tasks = [
        ['Review pricing copy', true],
        ['Fix invite emails', false],
        ['Record onboarding video', false],
        ['Publish help article', false]
    ];


    // TEAM DATA
    var team = [
        ['MI', 'Mira', 'Product designer', 'Working on pricing'],
        ['DE', 'Dev', 'Frontend developer', 'Fixing invite emails'],
        ['AR', 'Arjun', 'Researcher', 'Writing the demo script'],
        ['YO', 'You', 'Developer', 'Building this workspace']
    ];


    // DATE
    $('#dt').textContent =
        new Date().toLocaleDateString(undefined, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });


    // CHANGE LOG
    function log(t) {

        var li = document.createElement('li');

        li.textContent = t;

        var l = $('#log');

        l.insertBefore(li, l.firstChild);

        rev++;

        $('#rev').textContent =
            letters[rev % 26] +
            (rev > 25 ? Math.floor(rev / 26) : '');
    }


    // PROJECT PROGRESS
    function plan() {

        var d = $('#draw');

        d.innerHTML = '';


        projects.forEach(function (p) {

            var c = document.createElement('article');

            c.className = 'dw';


            c.innerHTML =
                '<h2></h2>' +
                '<small></small>' +
                '<div class="dim">' +
                    '<div class="rule"></div>' +
                    '<div class="fill"></div>' +
                    '<div class="pct"></div>' +
                '</div>' +
                '<button class="btn">Add progress</button>';


            c.querySelector('h2').textContent = p[0];

            c.querySelector('small').textContent = p[1];


            var fill = c.querySelector('.fill');

            var pct = c.querySelector('.pct');

            var b = c.querySelector('.btn');


            function set() {

                fill.style.width = p[2] + '%';

                pct.style.left = p[2] + '%';

                pct.textContent = p[2] + '%';


                if (p[2] >= 100) {

                    b.textContent = 'Complete';

                    b.disabled = true;
                }
            }


            b.onclick = function () {

                p[2] = Math.min(100, p[2] + 10);

                set();

                log(
                    p[0] +
                    ' is now ' +
                    p[2] +
                    '% done'
                );
            };


            d.appendChild(c);

            requestAnimationFrame(set);

        });
    }


    // TASK LIST
    function tl() {

        var u = $('#tl');

        u.innerHTML = '';

        var open = 0;


        tasks.forEach(function (t) {

            var li = document.createElement('li');


            if (t[1]) {

                li.className = 'done';

            } else {

                open++;
            }


            var cb = document.createElement('input');

            cb.type = 'checkbox';

            cb.checked = t[1];

            cb.id =
                't' +
                Math.random()
                    .toString(36)
                    .slice(2);


            var lb = document.createElement('label');

            lb.htmlFor = cb.id;

            lb.textContent = t[0];


            var st = document.createElement('span');

            st.className = 'stamp';

            st.textContent = 'APPROVED';


            cb.onchange = function () {

                t[1] = cb.checked;


                log(
                    (t[1]
                        ? 'Approved: '
                        : 'Reopened: ') +
                    t[0]
                );


                tl();
            };


            li.appendChild(cb);

            li.appendChild(lb);

            li.appendChild(st);

            u.appendChild(li);

        });


        $('#open').textContent = open;
    }


    // ADD NEW TASK
    $('#addf').onsubmit = function (e) {

        e.preventDefault();


        var v = $('#ti').value.trim();


        if (!v) {
            return;
        }


        tasks.unshift([
            v,
            false
        ]);


        $('#ti').value = '';


        log(
            'Added task: ' +
            v
        );


        tl();
    };


    // TEAM
    function ppl() {

        var p = $('#ppl');


        team.forEach(function (m) {

            var c = document.createElement('div');

            c.className = 'pp';


            c.innerHTML =
                '<div class="av"></div>' +
                '<b></b>' +
                '<span class="r"></span>' +
                '<span class="w"></span>' +
                '<button class="btn">Ping</button>';


            c.querySelector('.av').textContent =
                m[0];

            c.querySelector('b').textContent =
                m[1];

            c.querySelector('.r').textContent =
                m[2];

            c.querySelector('.w').textContent =
                m[3];


            c.querySelector('.btn').onclick =
                function () {

                    log(
                        'You pinged ' +
                        m[1]
                    );

                };


            p.appendChild(c);

        });
    }


    // TAB SWITCHING
    document
        .querySelectorAll('[data-s]')
        .forEach(function (b) {

            b.onclick = function () {

                document
                    .querySelectorAll('[data-s]')
                    .forEach(function (x) {

                        x.setAttribute(
                            'aria-selected',
                            x === b
                        );

                    });


                document
                    .querySelectorAll('.view')
                    .forEach(function (v) {

                        v.classList.toggle(
                            'on',
                            v.id ===
                            'v-' +
                            b.dataset.s
                        );

                    });

            };

        });


    // THEME SWITCH
    $('#theme').onclick = function () {

        var r = document.documentElement;

        var p =
            r.dataset.theme === 'paper';


        r.dataset.theme =
            p ? '' : 'paper';


        $('#theme').textContent =
            p
                ? 'Switch to paper'
                : 'Switch to blueprint';
    };


    // INITIALIZE
    plan();

    tl();

    ppl();

    log('Sheet opened');

    rev = 0;

    $('#rev').textContent = 'A';

})();