// Get the modal
let modal = document.getElementById("myModal");

// Get the Create button that opens the modal
// Get all elements with the class editBtn
let btn = document.getElementById("createBtn");
const editButtons = document.querySelectorAll(".editBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

editButtons.forEach((button) => {
  button.addEventListener("click", function () {
    modal.style.display = "block";
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Validate uploads files just as images

document.getElementById("imageUpload").addEventListener("change", validateFile);

function validateFile() {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileInput = document.getElementById("imageUpload");
  const filePath = fileInput.value;
  const fileExtension = filePath.split(".").pop().toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    // Valid image file
    // You can add further actions here if needed
  } else {
    // Invalid file type
    alert("Please select a valid image file (jpg, jpeg, png, gif).");
    fileInput.value = ""; // Clear the input field
  }
}
