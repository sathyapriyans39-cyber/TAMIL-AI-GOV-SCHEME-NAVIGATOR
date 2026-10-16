
/* =====================================
   NEAREST SERVICE CENTRE SEARCH
===================================== */

const centreButton = document.getElementById("centreButton");
const centreDistrict = document.getElementById("centreDistrict");

if (centreButton) {
    centreButton.addEventListener("click", function () {
        const district = centreDistrict
            ? centreDistrict.value.trim()
            : "";

        if (!district) {
            alert("Please select your district first.");
            return;
        }

        const searchText =
            "e-Sevai Maiyam CSC service centre " + district +
            " Tamil Nadu";

        const mapsUrl =
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(searchText);

        window.open(mapsUrl, "_blank", "noopener,noreferrer");
    });
}
