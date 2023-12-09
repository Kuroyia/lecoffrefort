function checkWord() {
    const wordInput = document.getElementById('wordInput');
    const wordContainer = document.getElementById('wordContainer');
    const squareContainer = document.getElementById('squareContainer');

    // Check if the entered word is correct (you can replace 'example' with the actual correct word)
    if (wordInput.value.toLowerCase() === 'quoicoubeh') {
        // Hide the word input
        wordContainer.style.display = 'none';
        // Show the square container
        squareContainer.style.display = 'flex';
    }
}

function showImage(squareNumber) {
    // Replace 'image1.jpg' and 'image2.jpg' with the actual paths to your images
    const imagePath = (squareNumber === 1) ? 'image1.png' : 'image2.png';

    // Open the image in a new tab
    window.open(imagePath);
}
