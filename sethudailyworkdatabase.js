import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
const db = getDatabase(app);

document.getElementById('submit').addEventListener('click', async function (e) {
    e.preventDefault();
    var checkboxes = document.querySelectorAll('input[name="vehicle"]:checked');

    // Create an array from the selected checkboxes' values
    var selectedValues = Array.from(checkboxes).map(function (checkbox) {
        return checkbox.value;
    });

    // Join the values into a single string with new lines
    var selectedString = selectedValues.join(',');  // You can use ', ' or any other delimiter

    // Log the string to the console or display it
    console.log(selectedString);
    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    var name = document.getElementById("name").value;
    var clg = document.getElementById("clg").value;
    var pur = document.getElementById("use").value;
    var type = document.getElementById("type").value;
    const rate = document.getElementById("rate").value;
    var days = document.getElementById("day").value;
    document.getElementById("userForm").reset();
    if (type === "Contract") {
        var exp = 0;
        var con = rate;
        pur = "--"
        name = selectedString;
        var tax=0;
    }
    else {
        if (type === "Expenses") {
            var exp = rate;
            var con = 0;
            days = 0;
            clg = "--";
            var tax=0;
        }
        else {
            var exp = 0;
            var con = 0;
            pur = "--"
            name = "--";
            days=0;
            var tax=rate;
        }
    }
    if (dat.length > 0) {
        if (name !== "Select Staff Name") {
            if (clg !== "Select College Name") {
                if (type !== "Select Purpose Type") {
                    if (rate.length > 0) {
                        const db1 = "Sethu";
                        const db2 = "Work_Count";
                        const db3 = "Sethu_Id";
                        const db4 = "Work_Id";
                        const w_id = ref(db, `${db2}`);
                        const dataRefset = ref(db, `${db1}/${wid}`);
                        var sethu_databasecount = ref(db, `${db2}/${db3}`);
                        const sethu_snapshot = await get(sethu_databasecount);
                        var sethuid = parseInt(sethu_snapshot.val());
                        var work_databasecount = ref(db, `${db2}/${db4}`);
                        const work_snapshot = await get(work_databasecount);
                        var workid = parseInt(work_snapshot.val());
                        try {
                            if (sethuid == wid) {
                                await set(w_id, {
                                    Sethu_Id: parseInt(wid) + 1,
                                    Work_Id: parseInt(workid)
                                });
                            }
                            await set(dataRefset, {
                                Date: dat,
                                Name: name,
                                College: clg,
                                Days: days,
                                Purpose: pur,
                                Expenses: exp,
                                Tax:tax,
                                Contract: con,
                                Price: rate
                            });
                            document.getElementById("done").style.display = "block";
                            removedone();
                        } catch (error) {
                            console.error("Error adding document: ", error);
                            alert("An error occurred. Please try again.");
                        }
                    }
                    else {
                        alert("Enter Price");
                    }
                }
                else {
                    alert("Select Purpose");
                }

            }
            else {
                alert("Select College Name");
            }
        }
        else {
            alert("Please Select Staff Name");
        }
    }
    else {
        alert("Please Choose Date");
    }
});
function removedone() {
    setTimeout(function () {
        var v7 = document.getElementById("done");
        v7.style.display = "none";
    }, 3000);
}
