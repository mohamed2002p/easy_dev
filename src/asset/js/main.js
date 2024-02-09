
// Function to handle image input change
function handleImageInputChange(e) {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        handleImageLoaded(img);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }
}

// Function to handle the loaded image
function handleImageLoaded(img) {
  // Set the canvas dimensions to the desired size
  canvas.width = 1100;
  canvas.height = 1100;

  // Draw the user-uploaded image on the canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Load the watermark image
  const watermark = new Image();
  watermark.onload = function () {
    handleWatermarkLoaded(watermark);
  };

  watermark.src = "../images/2bgwIbZ9yJWRFiLsQTxe4qde3lV.svg"; // Replace with the path to your watermark image
}

// Function to handle the loaded watermark image
function handleWatermarkLoaded(watermark) {
  // Set the position for the watermark (adjust as needed)
  const watermarkX = canvas.width - watermark.width * 0.9;
  const watermarkY = canvas.height - watermark.height * 1;

  // Draw the watermark on top of the user-uploaded image
  ctx.drawImage(watermark, watermarkX, watermarkY);

  // Add text on the watermark
  ctx.font = "80px Workbench";
  ctx.fillStyle = "#4f5de0";
  const textX = 400; // Adjust position
  const textY = 760; // Adjust position
  ctx.fillText(document.querySelector("#title").value, textX, textY);
  ctx.fillText(document.querySelector("#description").value, 400, 860);
  ctx.fillText(document.querySelector("#phone").value, 400, 1050);

  // Update the image source
  imagePreview.querySelector("img").src = canvas.toDataURL("image/jpeg");
  finalImageDataURL = canvas.toDataURL("image/jpeg", 1);

  // Enable the download button and store the data URL for later use
  downloadButton.disabled = false;
  downloadButton.finalImageDataURL = canvas.toDataURL("image/jpeg");
}

// Function to handle title input change
function handleTitleInputChange(e) {
  ctx.font = "50px Arial";
  ctx.fillStyle = "#4f5de0";
  const textX = 500;
  const textY = canvas.height - 400;
  ctx.fillText(e.target.value, textX, textY);
}

// Event listeners
document.getElementById("createBtn").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("imageCrop").style.display = "none";
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("imageCrop").style.display = "none";
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("myModal");
  const cropModal = document.getElementById("imageCrop");

  if (event.target === modal || event.target === cropModal) {
    modal.style.display = "none";
    cropModal.style.display = "none";
  }
});

document.querySelector(".imagePreview").addEventListener("click", () => {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const phone = document.querySelector("#phone").value;

  if (title && description && phone) {
    document.querySelector(".imagePreview input").click();
  }
});

document
  .querySelector("#title")
  .addEventListener("input", handleTitleInputChange);

document.getElementById("downloadButton").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = downloadButton.finalImageDataURL;
  link.download = "final_image.jpg";
  link.click();
});
