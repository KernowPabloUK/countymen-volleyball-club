document.addEventListener("DOMContentLoaded", function () {
    //#region Global Variables
    const tableBody = document.querySelector("tbody");
    const trainingDates = {
        // 2025
        "29/06/2025": "Cornwall College",
        "06/07/2025": "Cornwall College",
        "13/07/2025": "Cornwall College",
        "20/07/2025": "Cornwall College",
        "27/07/2025": "Cornwall College",
        "03/08/2025": "NO TRAINING - SALISBURY TOURNAMENT",
        "10/08/2025": "Cornwall College",
        "17/08/2025": "Cornwall College",
        "24/08/2025": "Cornwall College",
        "31/08/2025": "Cornwall College",
        "07/09/2025": "Cornwall College",
        "14/09/2025": "Cornwall College",
        "21/09/2025": "Cornwall College",
        "28/09/2025": "Cornwall College",
        "05/10/2025": "Cornwall College",
        "12/10/2025": "Cornwall College",
        "19/10/2025": "Cornwall College",
        "26/10/2025": "Cornwall College",
        "02/11/2025": "Cornwall College",
        "09/11/2025": "Cornwall College",
        "16/11/2025": "Cornwall College",
        "23/11/2025": "Cornwall College",
        "30/11/2025": "Cornwall College",
        "07/12/2025": "Cornwall College",
        "14/12/2025": "Cornwall College",
        "21/12/2025": "Cornwall College",
        "28/12/2025": "Cornwall College",
        // 2026
        "04/01/2026": "Cornwall College",
        "11/01/2026": "Cornwall College",
        "18/01/2026": "Cornwall College",
        "25/01/2026": "Cornwall College",
        "01/02/2026": "Cornwall College",
        "08/02/2026": "Cornwall College",
        "15/02/2026": "Cornwall College",
        "22/02/2026": "Cornwall College",
        "01/03/2026": "Cornwall College",
        "08/03/2026": "Cornwall College",
        "15/03/2026": "Cornwall College",
        "22/03/2026": "Cornwall College",
        "29/03/2026": "Cornwall College",
        "05/04/2026": "Cornwall College",
        "12/04/2026": "Cornwall College",
        "19/04/2026": "Cornwall College",
        "26/04/2026": "Cornwall College",
        "03/05/2026": "Cornwall College",
        "10/05/2026": "Cornwall College",
        "17/05/2026": "Cornwall College",
        "24/05/2026": "Cornwall College",
        "31/05/2026": "Cornwall College",
        "07/06/2026": "Cornwall College",
        "14/06/2026": "Cornwall College",
        "21/06/2026": "Cornwall College",
        "28/06/2026": "Cornwall College",
        "05/07/2026": "Cornwall College",
        "12/07/2026": "Cornwall College",
        "19/07/2026": "Cornwall College",
        "26/07/2026": "Cornwall College",
        "02/08/2026": "Cornwall College",
        "09/08/2026": "Cornwall College",
        "16/08/2026": "Cornwall College",
        "23/08/2026": "Cornwall College",
        "30/08/2026": "Cornwall College",
        "06/09/2026": "Cornwall College",
        "13/09/2026": "Cornwall College",
        "20/09/2026": "Cornwall College",
        "27/09/2026": "Cornwall College",
        "04/10/2026": "Cornwall College",
        "11/10/2026": "Cornwall College",
        "18/10/2026": "Cornwall College",
        "25/10/2026": "Cornwall College",
        "01/11/2026": "Cornwall College",
        "08/11/2026": "Cornwall College",
        "15/11/2026": "Cornwall College",
        "22/11/2026": "Cornwall College",
        "29/11/2026": "Cornwall College",
        "06/12/2026": "Cornwall College",
        "13/12/2026": "Cornwall College",
        "20/12/2026": "Cornwall College",
        "27/12/2026": "Cornwall College",
    };
    //#endregion

    populateTimetable();

    //#region Functions
    function populateTimetable() {
        const now = new Date();
        const todaysDate = formatDate(now);
        const dates = Object.keys(trainingDates);
        let tableIsPopulated = false;

        const todaysDateObj = parseDateString(todaysDate);
        const nextDate = dates.find((date) => {
            const dateObj = parseDateString(date);
            return todaysDateObj.getTime() <= dateObj.getTime();
        });

        if (nextDate) {
            populateTrainingDates(nextDate);
            tableIsPopulated = true;
        }

        if (!tableIsPopulated && tableBody !== null) {
            tableBody.innerHTML = `<tr>
            <td colspan="4">NO TRAINING THIS WEEK</td>
        </tr>`;
        }
    }

    function populateTrainingDates(date) {
        const indexOfDate = Object.keys(trainingDates).indexOf(date);
        const datesArray = Object.keys(trainingDates);
        const remainingDates = datesArray.length - indexOfDate;
        const rowsToAdd = Math.min(5, remainingDates);
        let currentDate = date;
        let rowsHtml = "";

        if (tableBody !== null) {
            for (let i = 0; i < rowsToAdd; i++) {
                if (trainingDates[currentDate]) {
                    rowsHtml += `<tr>
            <td>Sunday</td>
            <td>${currentDate}</td>
            <td>18:00 - 20:00</td>
            <td>${trainingDates[currentDate]}</td>
            </tr>`;
                }
                currentDate = add7DaysToDate(currentDate);
                if (!trainingDates[currentDate]) break;
            }
            tableBody.innerHTML += rowsHtml;
        }

        return { indexOfDate, date };
    }

    function add7DaysToDate(date) {
        let dateObj = parseDateString(date);
        dateObj.setDate(dateObj.getDate() + 7);
        const nextDate = dateObj.toLocaleDateString("en-GB");
        return nextDate;
    }

    function formatDate(dateObj) {
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function parseDateString(dateStr) {
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}`);
    }
    //#endregion
});
