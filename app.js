const neededFields = {
    'population': {
        name: "Population",
        ff: function(number) {
            return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
        }
    },
    'deaths': {
        name: "Deaths",
        ff: function(number) {
            return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
        }

    },

};

(async function() {
    const tableHead = document.getElementById('thead');
    for (const options of Object.values(neededFields)) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(options.name));
        tableHead.appendChild(th);
    }

    const resp = await fetch('https://corona.lmao.ninja/v2/countries?yesterday&strict');
    const data = await resp.json();

    const tableBody = document.getElementById('tbody');
    for (const cdata of data) {
        const row = document.createElement('tr');

        for (const key of Object.keys(neededFields)) {
            const cell = document.createElement('td');
            const options = neededFields[key];


            cell.appendChild(document.createTextNode(
                options.ff(cdata[key])
            ));
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
})()