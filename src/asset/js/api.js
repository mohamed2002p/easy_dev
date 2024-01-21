
document.addEventListener('DOMContentLoaded', function () {
 // Assuming you have a form with the id "uploadForm"
const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(uploadForm);
      const url = 'http://192.168.1.112:4000/addContent';
      // Fetch API POST request
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          // Handle success, if needed

          // Clear the form or do any additional actions after saving
          uploadForm.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error, if needed
        });
    });
  });