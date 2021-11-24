const neededFields = {
    'country': {
        name: "Country",
        ff: function(country) {
            return country;
        }
    },
    'population': {
        name: "Population",
        ff: function(number) {
            return Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })
                .format(number)
        }
    },
    'continent': {
        name: "Continent",
        ff: function(continent) {
            return continent;
        }
    },
    'active': {
        name: "Active",
        ff: function(active) {
            return active;
        }
    },
    'deaths': {
        name: "Deaths",
        ff: function(deaths) {
            return deaths;
        }
    }
};

(async function() {
    const tableHead = document.getElementById('thead');
    for (const header of Object.values(neededFields)) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(header.name));
        tableHead.appendChild(th);
    }

    const resp = await fetch('https://corona.lmao.ninja/v2/countries?yesterday&strict');
    const data = await resp.json();

    const tableBody = document.getElementById('tbody');
    for (const cdata of data) {
        console.log(cdata);
        const row = document.createElement('tr');

        for (const key of Object.keys(neededFields)) {
            const cell = document.createElement('td');
            const options = neededFields[key];

            cell.appendChild(document.createTextNode(
                neededFields[key].ff(cdata[key])
            ));
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
})()

function filter(num1) {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(num1);
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[num1 - 1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}