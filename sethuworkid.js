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
    try {
        // Access the database and retrieve data
        if (typ === "Expenses") {
            document.getElementById("use").style.display = "block";
            document.getElementById("day").style.display = "none";
            document.getElementById("name").style.display = "block";
            document.getElementById("submit2").style.display = "none";
            document.getElementById("clg").style.display = "none";
        }
        else {
            if (typ === "Contract") {
                document.getElementById("use").style.display = "none";
                document.getElementById("day").style.display = "block";
                document.getElementById("name").style.display = "none";
                document.getElementById("submit2").style.display = "block";
                document.getElementById("clg").style.display = "block";
            }
            else
            {
                document.getElementById("use").style.display = "none";
                document.getElementById("day").style.display = "none";
                document.getElementById("name").style.display = "none";
                document.getElementById("submit2").style.display = "none";
                document.getElementById("clg").style.display = "block";
            }
        }
        const db2 = getDatabase(app);
        const db1 = "Work_Count";
        const dataRefget = ref(db2, `${db1}`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            document.getElementById("wid").value = data["Sethu_Id"];
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});

document.addEventListener("click", function (e1) {
    var btn = document.getElementById("submit2");
    var modal = document.getElementById("myModal"); // Assuming modal has this ID
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


