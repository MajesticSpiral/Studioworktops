// Ensure everything runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Trade Form fields
    const form = document.getElementById('trade-enquiry-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Clear previous error messages
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');

            if (nameError) nameError.style.display = 'none';
            if (emailError) emailError.style.display = 'none';

            // Validate fields
            let valid = true;

            // Check if name is filled
            const nameInput = document.getElementById('name');
            if (nameInput && nameInput.value.trim() === '') {
                if (nameError) nameError.style.display = 'block'; // Show error message
                valid = false;
            }

            // Check if email is filled
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value.trim() === '') {
                if (emailError) emailError.style.display = 'block'; // Show error message
                valid = false;
            }

            // If all fields are valid, you can submit the form or perform further actions
            if (valid) {
                alert("Form submitted successfully!"); // Replace with your form submission logic
                // form.submit(); // Uncomment to actually submit the form
            }
        });

        // Add event listeners to input fields to hide error messages when typing
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('input', function () {
                const nameError = document.getElementById('nameError');
                if (nameError) nameError.style.display = 'none';
            });
        }

        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                const emailError = document.getElementById('emailError');
                if (emailError) emailError.style.display = 'none';
            });
        }
    }

    // Modal handling
    const modal = document.getElementById("orderModal");
    const closeButton = document.querySelector(".close");
    const orderButtons = document.querySelectorAll(".order-button");

    if (orderButtons && modal) {
        // Set current date in the orderDate input field when the modal is opened
        orderButtons.forEach(button => {
            button.addEventListener("click", () => {
                modal.style.display = "block";

                // Set the current date in the orderDate input
                const orderDateInput = document.getElementById('orderDate');
                if (orderDateInput) {
                    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
                    orderDateInput.value = today; // Set the value of the input field to today's date
                    orderDateInput.setAttribute("disabled", true); // Disable the date input to prevent editing
                }
            });
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Product gallery auto scroller
    const gallery = document.querySelector('.gallery');
    const bullets = document.querySelectorAll('.bullet');
    let currentIndex = 0;
    let scrollInterval;

    // Only run gallery logic if the gallery and bullets exist
    if (gallery && bullets.length) {
        scrollInterval = setInterval(autoScroll, 3000); // Change image every 3 seconds

        // Function to update the gallery's position and bullet active state
        function updateGallery() {
            gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
            bullets.forEach((bullet, index) => {
                bullet.classList.toggle('active', index === currentIndex);
            });
        }

        // Auto-scroll function
        function autoScroll() {
            currentIndex = (currentIndex + 1) % bullets.length;
            updateGallery();
        }

        // Add event listeners for bullet clicks
        bullets.forEach(bullet => {
            bullet.addEventListener('click', () => {
                clearInterval(scrollInterval); // Stop auto-scrolling when user clicks a bullet
                currentIndex = parseInt(bullet.dataset.index);
                updateGallery();
                scrollInterval = setInterval(autoScroll, 3000); // Restart auto-scrolling
            });
        });
    }

    // JavaScript to toggle the dropdown
    document.querySelector('li:nth-child(1)').addEventListener('mouseenter', function() {
        this.querySelector('.dropdown').style.display = 'block';
    });
    
    document.querySelector('li:nth-child(1)').addEventListener('mouseleave', function() {
        this.querySelector('.dropdown').style.display = 'none';
    });


    // FAQ dropdown handling
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');

            if (content) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                if (arrow) {
                    arrow.classList.toggle('up');
                }
            }
        });
    });
});




function toggleDescription() {
    const description = document.getElementById('description');
    const button = document.querySelector('.read-more');

    // If the description is collapsed (i.e., the max-height is 100px)
    if (description.style.maxHeight === '100px' || description.style.maxHeight === '') {
        description.style.maxHeight = 'none';  // Allow the description to expand fully
        button.textContent = 'Read Less';      // Change button text to "Read Less"
    } else {
        description.style.maxHeight = '100px'; // Collapse the description back
        button.textContent = 'Read More';      // Change button text to "Read More"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for form submit
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('Form submit clicked'); // Log for debugging

        // Automatically set orderdate to today's date
        const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
        console.log('Order date set to:', today); // Log today's date

        // Gather form data
        const formdata = {
            orderdate: today, // Use today's date
            billingfirstname: document.getElementById('billingfirstname').value,
            billinglastname: document.getElementById('billinglastname').value,
            billingaddress1: document.getElementById('billingaddress1').value,
            billingaddress2: document.getElementById('billingaddress2').value,
            billingcity: document.getElementById('billingcity').value,
            billingpostcode: document.getElementById('billingpostcode').value,
            sku1: document.getElementById('sku1').value || null, // Allow empty SKU field
            billingemailaddress: document.getElementById('billingemailaddress').value,
            billingphone: document.getElementById('billingphone').value,
        };

        console.log('Form data collected:', formdata); // Log the form data

        // Validate the form data (basic validation check)
        if (
            !formdata.billingfirstname || !formdata.billinglastname || !formdata.billingaddress1 || 
            !formdata.billingcity || !formdata.billingpostcode || !formdata.billingemailaddress || 
            !formdata.billingphone
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log('Validation passed. Submitting form data...'); // Log validation success

        // Send the form data to the server via a POST request
        fetch('/api/studio_samples', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata), // Send form data as JSON
        })
        .then((response) => {
            console.log('Response received:', response); // Log the response
            return response.text(); // Expect a text response (success message)
        })
        .then((message) => {
            console.log('Message from server:', message); // Log the success message
            alert(message); // Show a success message
            document.getElementById('orderForm').reset(); // Reset the form after successful submission

            // Close the modal (if required)
            document.getElementById('orderModal').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error submitting form:', error); // Log the error
            alert('There was an error submitting your order. Please try again later.');
        });
    });
});


    // Function to toggle the visibility of the navigation menu
    function toggleMenu() {
        var nav = document.getElementById("nav-links");
        if (nav.style.display === "none" || nav.style.display === "") {
            nav.style.display = "flex";  // Show the navigation links
        } else {
            nav.style.display = "none";  // Hide the navigation links
        }
    }

// Function to set today's date as the value for the orderdate input
function setOrderDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const year = today.getFullYear();

    const formattedDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    document.getElementById('orderdate').value = formattedDate;
}



// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('ordermodal').style.display = 'none';
});






