import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "tractor-driver-data.firebaseapp.com",
    projectId: "tractor-driver-data",
    storageBucket: "tractor-driver-data.appspot.com",
    messagingSenderId: "688935767962",
    appId: "1:688935767962:web:d3d8d7569fd2470dfef423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Get a reference to the database service
document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    var d1 = document.getElementById("search");
    var n = document.getElementById("search");
    n.value = "";
    d1.style.display = "block";
    RePrint();
    // Get the value from the input field

});

async function RePrint() {
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Sethu`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}

function generateTable(data) {
    let out = `<table border="1px">
        <tr>
            <th>Work Id</th>
            <th id="csize1">Date</th>
            <th id="csize3">Staff Name</th>
            <th id="csize2">College Name</th>
            <th id="csize2">Purpose</th>
            <th id="csize2">Days</th>
            <th id="csize2">Expenses</th>
            <th id="csize2">Contract</th>
        </tr>`;
    var totalcontarct = 0;
    var totalexpenses = 0;
    var ram = 0;
    var sanjay = 0;
    var amount = 0;
    var daycount=0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name === "Ram lal Suresh" && activity.Expenses !== "--") {
                ram += parseInt(activity.Expenses);
            }
            else {
                if (activity.Name === "Sanjay" && activity.Expenses !== "--") {
                    sanjay += parseInt(activity.Expenses);
                }
            }
            if (activity.Contract === 0) {
                totalexpenses += parseInt(activity.Expenses)
            }
            if (activity.Expenses === 0) {
                totalcontarct += parseInt(activity.Contract)
            }
            amount += parseInt(activity.Price);
            daycount+=parseInt(activity.Days);
            out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.College}</td>
                        <td>${activity.Purpose}</td>
                        <td>${activity.Days}</td>
                        <td>${activity.Expenses}</td>
                        <td>${activity.Contract}</td>
                    </tr>`;
        }
    }
    out += `<tr>
    <td colspan="5" id="col">Total Work Analaysis</td>
    <td id="am">${daycount}</td>
    <td id="am">${totalexpenses}</td>
    <td id="am">${totalcontarct}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("retrive").innerHTML = out;

    let led = `<table border="1px">
     <tr>
        <th id="bal1">Total Income</th>
        <th id="bal1">Averge Income Per Head</th>
        <th id="bal1">Ramlal Expenses</th>
        <th id="bal1">Sanjay Expenses</th>
        <th id="bal1">Total Expenses</th>
        <th id="bal1">Total Profit</th>
    </tr>`;
    var avg=((totalcontarct - totalexpenses)/daycount)/2;
    led += `<tr>
    <td class="lsize">${totalcontarct}</td>
    <td class="lsize">${avg}</td>
    <td class="lsize">${ram}</td>
    <td class="lsize">${sanjay}</td>
    <td class="lsize">${totalexpenses}</td>
    <td>${totalcontarct - totalexpenses}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("tally").innerHTML = led;
}

//Searching operation

document.getElementById("search").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintSearch();

});

async function RePrintSearch() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Sethu`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            SearchTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}

function SearchTable(data) {
    var d = document.getElementById("tally");
    var name = document.getElementById("search").value;
    if (name.length > 0) {
        d.style.display = "none";
        let out = `<table border="1px">
       <tr>
            <th>Work Id</th>
            <th id="csize1">Date</th>
            <th id="csize3">Staff Name</th>
            <th id="csize2">College Name</th>
            <th id="csize2">Purpose</th>
            <th id="csize2">Days</th>
            <th id="csize2">Expenses</th>
            <th id="csize2">Contract</th>
        </tr>`;
        var totalexpenses = 0;
        var totalcontarct = 0;
        var daycount=0;
        for (const customerPhone in data) {
            if (data.hasOwnProperty(customerPhone)) {
                const activity = data[customerPhone];
                if (activity.Name.indexOf(name) !== -1 || activity.College.indexOf(name) !== -1) {
                    if (activity.Contract === 0) {
                        totalexpenses += parseInt(activity.Expenses)
                    }
                    if (activity.Expenses === 0) {
                        totalcontarct += parseInt(activity.Contract)
                    }
                    daycount+=parseInt(activity.Days);
                    out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.College}</td>
                        <td>${activity.Purpose}</td>
                        <td>${activity.Days}</td>
                        <td>${activity.Expenses}</td>
                        <td>${activity.Contract}</td>
                    </tr>`;
                }
            }
        }

        out += `<tr>
    <td colspan="5" id="col">Total Work Analaysis</td>
    <td id="am">${daycount}</td>
    <td id="am">${totalexpenses}</td>
    <td id="am">${totalcontarct}</td>
    </tr>`;
        out += `</table>`;
        document.getElementById("retrive").innerHTML = out;
    }
    else {
        d.style.display = "block";
        RePrint();
    }
}
