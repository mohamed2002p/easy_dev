// Get the modal
let modal = document.getElementById("myModal");
let cropModal = document.getElementById("imageCrop");

// Get the Create button that opens the modal
// Get all elements with the class editBtn
let createbtn = document.getElementById("createBtn");
const editButtons = document.querySelectorAll(".editBtn");
let editImageBtn = document.getElementById("editImage");
let cancelBtn = document.getElementById("cancelBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
createbtn.onclick = function () {
  modal.style.display = "block";
};
editImageBtn.onclick = function () {
  cropModal.style.display = "block";
};
editButtons.forEach((button) => {
  button.addEventListener("click", function () {
    modal.style.display = "block";
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  cropModal.style.display = "none";
};

// when the user click on Cancel Button, close the Editing model
cancelBtn.onclick = function () {
  cropModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == cropModal) {
    modal.style.display = "none";
    cropModal.style.display = "none";
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

// Crop the image

const image = document.getElementById("croppedImage");
const cropper = new Cropper(image, {
  aspectRatio: 0,
  viewMode: 0,
});
document.getElementById("cropImageBtn").addEventListener("click", function () {
  var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
  console.log(croppedImage); // Replace with your code to Update the database
  cropModal.style.display = "none";
});
