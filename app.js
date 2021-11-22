let results = []
const fetchFlags = async() => {
        await fetch('https://corona.lmao.ninja/v2/countries?yesterday&strict')
            .then(response => response.json())
            .then(data => {
                results = data.map(e => {
                    return {
                        country: e.country,
                        flag: e.countryInfo.flag,
                        people: e.population,
                        death: e.deaths,
                    }
                })
            })
        console.log(results)
    }
    (async function() {
        const tableHead = document.getElementById('thead');
        for (const options of Object.values(fetchFlags)) {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(options.name));
            tableHead.appendChild(th);
        }
        const resp = await fetch('https://corona.lmao.ninja/v2/countries?yesterday&strict')
        const data = await resp.json()
        const tableBody = document.getElementById('tbody');
        for (const cdata of data) {
            const row = document.createElement('tr');

            for (const key of Object.keys(fetchFlags)) {
                const cell = document.createElement('td');
                const options = neededFields[key];


                cell.appendChild(document.createTextNode(
                    options.ff(cdata[key])
                ));
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }

        fetchFlags();
    })()