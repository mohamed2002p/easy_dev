const canvas = new fabric.Canvas('canvas');
let uploadedImage, selectedTemplate;
let undoStack = [];
let redoStack = [];

// Handle image upload
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

// Function to handle image upload
function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgUrl = event.target.result;
        fabric.Image.fromURL(imgUrl, function(img) {
            uploadedImage = img;
            if (!canvas.getWidth() || !canvas.getHeight()) {
                console.error("Canvas size not set properly.");
                return;
            }
            // Set position and size of the image
            uploadedImage.set({
                left: 0,
                top: 0,
                scaleX: canvas.getWidth() / img.width,
                scaleY: canvas.getHeight() / img.height,
                selectable: true,
                hasControls: true,
                hasBorders: true
            });
            canvas.clear();
            if (selectedTemplate) {
                canvas.add(selectedTemplate);
            }
            canvas.add(uploadedImage);
            canvas.renderAll();
            resizeTemplateToFitImage();
        }, function(err) {
            console.error("Error loading image:", err);
        });
    };
    reader.readAsDataURL(file);
}


// Function to resize template to fit uploaded image
function resizeTemplateToFitImage() {
    if (selectedTemplate && uploadedImage) {
        selectedTemplate.scaleToWidth(uploadedImage.width);
        selectedTemplate.scaleToHeight(uploadedImage.height);
        canvas.renderAll();
    }
}

// Function to handle template selection
document.querySelectorAll('.template-preview').forEach(function(element) {
    element.addEventListener('click', function() {
        if (!uploadedImage) {
            alert('Please upload an image first.');
            return;
        }
        const templateUrl = this.src;
        // Load template onto canvas
        fabric.Image.fromURL(templateUrl, function(template) {
            // Remove previously added template (if any)
            canvas.remove(selectedTemplate);
            selectedTemplate = template;
            canvas.add(selectedTemplate);
            selectedTemplate.scaleToWidth(canvas.getWidth());
            selectedTemplate.scaleToHeight(canvas.getHeight());
            selectedTemplate.set({
                left: 0,
                top: 0,
                selectable: true // Make template selectable or draggable
            });
            canvas.bringToFront(selectedTemplate); // Bring template to front
            canvas.renderAll();
            addToUndoStack();
        });
    });
});
  // Function to validate title and description
  function validateText(title, description) {
    if (title.trim() === '' || description.trim() === '') {
        alert('Please enter both title and description.');
        return false;
    }
    if (title.length > 30 || description.length > 100) {
        alert('Title should be maximum 30 characters and description should be maximum 100 characters.');
        return false;
    }
    return true;
}
// Function to update UI panel with text properties
function updateTextPropertiesPanel(textObject) {
    // Display text properties in UI panel
    document.getElementById('textColorInput').value = textObject.fill;
    document.getElementById('fontSizeInput').value = textObject.fontSize;
    document.getElementById('fontWeightInput').value = textObject.fontWeight;
}

// Event listener for object selection on canvas
canvas.on('object:selected', function(event) {
    const selectedObject = event.target;
    if (selectedObject.type === 'textbox') {
        updateTextPropertiesPanel(selectedObject);
    }
});

// Event listeners to update text object properties
document.getElementById('textColorInput').addEventListener('change', function() {
    const selectedObject = canvas.getActiveObject();
    if (selectedObject && selectedObject.type === 'textbox') {
        selectedObject.set('fill', this.value);
        canvas.renderAll();
    }
});

document.getElementById('fontSizeInput').addEventListener('change', function() {
    const selectedObject = canvas.getActiveObject();
    if (selectedObject && selectedObject.type === 'textbox') {
        selectedObject.set('fontSize', parseInt(this.value));
        canvas.renderAll();
    }
});

document.getElementById('fontWeightInput').addEventListener('change', function() {
    const selectedObject = canvas.getActiveObject();
    if (selectedObject && selectedObject.type === 'textbox') {
        selectedObject.set('fontWeight', this.value);
        canvas.renderAll();
    }
});

// Example function to add text to canvas
function addText() {
    if (!uploadedImage) {
        alert('Please upload an image first.');
        return;
    }
    // Get text input values
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const textColor = document.getElementById('textColorInput').value; // Get user-selected text color
    const fontSize = document.getElementById('fontSizeInput').value; // Get user-selected font size
    const fontWeight = document.getElementById('fontWeightInput').value; // Get user-selected font weight
     // Validate text inputs
     if (!validateText(title, description)) {
        return;
    }
    // Create title text object
    const titleText = new fabric.Textbox(title, {
        left: 20,
        top: 20,
        fill: textColor,
        fontSize: parseInt(fontSize), // Convert font size to integer
        fontWeight: fontWeight, // Set font weight
        fontFamily: 'Arial', // Choose a suitable font family
        textAlign: 'left',
        selectable: true // Make text selectable
    });
    canvas.add(titleText);

    // Create description text object
    const descText = new fabric.Textbox(description, {
        left: 20,
        top: 70,
        fill: textColor,
        fontSize: parseInt(fontSize), // Convert font size to integer
        fontWeight: fontWeight, // Set font weight
        fontFamily: 'Arial', // Choose a suitable font family
        textAlign: 'left',
        selectable: true // Make text selectable
    });
    canvas.add(descText);
}
 
 // Function to compose image and send to backend
 async function composeAndSendToBackend() {
    if (!uploadedImage || !selectedTemplate) {
        alert('Please upload an image and select a template.');
        return;
    }
    // Overlay text on canvas
    addText();

    // Wait for canvas rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    // Compose image
    const composedImage = canvas.toDataURL({ format: 'png', quality: 1 });

    // Send composed image to backend
    fetch('/upload-composed-image', {
        method: 'POST',
        body: JSON.stringify({
            image: composedImage
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload composed image');
        }
        return response.json();
    })
    .then(data => {
        console.log('Composed image uploaded successfully:', data);
        alert('Image composed and uploaded successfully!');
    })
    .catch(error => {
        console.error('Error uploading composed image:', error);
        alert('Failed to compose and upload image.');
    });
}

// Function to compose image
function composeImage() {
    composeAndSendToBackend();
}
// Function to download image
function downloadImage() {
    if (!uploadedImage) {
        alert('Please upload an image.');
        return;
    }

    // Save canvas as image
    const image = canvas.toDataURL({ format: 'png', quality: 0.8 });

    // Download the image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Undo function
function undo() {
    if (undoStack.length > 0) {
        const prevState = undoStack.pop();
        redoStack.push(canvas.toDatalessJSON());
        canvas.loadFromDatalessJSON(prevState, canvas.renderAll.bind(canvas));
    }
}

// Redo function
function redo() {
    if (redoStack.length > 0) {
        const nextState = redoStack.pop();
        undoStack.push(canvas.toDatalessJSON());
        canvas.loadFromDatalessJSON(nextState, canvas.renderAll.bind(canvas));
    }
}

// Add to undo stack
function addToUndoStack() {
    undoStack.push(canvas.toDatalessJSON());
    redoStack = []; // Clear redo stack
}

// Zoom in function
function zoomIn() {
    canvas.setZoom(canvas.getZoom() * 1.1);
    canvas.renderAll();
}

// Zoom out function
function zoomOut() {
    canvas.setZoom(canvas.getZoom() / 1.1);
    canvas.renderAll();
}

// Delete selected object
function deleteSelectedObject() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        // Check if the active object is the uploaded image
        if (activeObject === uploadedImage) {
            // Remove uploaded image, selected template, and clear canvas
            uploadedImage = null;
            selectedTemplate = null;
            canvas.clear();
            document.getElementById('imageInput').value = ''; // Reset file input
        } else {
            canvas.remove(activeObject);
        }
        canvas.renderAll();
        addToUndoStack();
    }
}


// Add event listener to show delete button when object is selected
canvas.on('object:selected', function(event) {
    const deleteButton = document.getElementById('delete-button');
    deleteButton.style.display = 'inline-block';
});

// Add event listener to hide delete button when object is deselected
canvas.on('selection:cleared', function(event) {
    const deleteButton = document.getElementById('delete-button');
    deleteButton.style.display = 'none';
});
