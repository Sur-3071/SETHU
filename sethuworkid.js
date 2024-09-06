import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
// Get a reference to the database service

document.getElementById("type").addEventListener("change", async function (e1) {

    e1.preventDefault(); // Prevent default form submission behavior
    var typ = document.getElementById("type").value;
    console.log(typ);
    try {
        // Access the database and retrieve data
        if(typ==="Expenses")
        {
            document.getElementById("use").style.display="block";
            document.getElementById("day").style.display="none";
        }
        else
        {
            document.getElementById("use").style.display="none";
            document.getElementById("day").style.display="block";
        }
        const db2 = getDatabase(app);
        const db1 = "Work_Count";
        const dataRefget = ref(db2, `${db1}`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("wid").value = data["Sethu_Id"];
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});


