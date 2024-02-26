document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generatePassword");

  generateButton.addEventListener("click", function () {
    const passwordLength = document.getElementById("passwordLength").value;
    const includeLowercase =
      document.getElementById("includeLowercase").checked;
    const includeUppercase =
      document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecialChars = document.getElementById(
      "includeSpecialChars"
    ).checked; // Ensure this line is correct

    const specialChars = "!@#$%^&*()_-+<>?";

    // Check if at least one checkbox is selected
    if (
      !includeLowercase &&
      !includeUppercase &&
      !includeNumbers &&
      !includeSpecialChars
    ) {
      // Display an error message if none are selected
      document.getElementById("generatedPassword").textContent =
        "Please select at least one option above.";
      return; // Exit the function early to prevent password generation
    }

    const generatedPassword = generatePassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSpecialChars,
      specialChars
    );

    document.getElementById(
      "generatedPassword"
    ).textContent = `${generatedPassword}`;

    document
      .getElementById("generatedPassword")
      .addEventListener("click", function () {
        const password = this.textContent;
        navigator.clipboard
          .writeText(password)
          .then(
            function () {
              // Change text content to indicate password has been copied
              this.textContent = "Password copied to clipboard!";
              // Optionally, reset the text content after a delay
              setTimeout(() => {
                this.textContent = password;
              }, 2000); // Reset after  2 seconds
            }.bind(this)
          )
          .catch(function (err) {
            // Error message
            alert("Failed to copy password: ", err);
          });
      });
  });

  const passwordLengthSlider = document.getElementById("passwordLength");
  const lengthValue = document.getElementById("lengthValue");

  passwordLengthSlider.addEventListener("input", function () {
    lengthValue.textContent = passwordLengthSlider.value;
  });

  function generatePassword(
    length,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSpecialChars,
    specialChars
  ) {
    let charset = "";

    if (includeLowercase) {
      charset += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeUppercase) {
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeNumbers) {
      charset += "0123456789";
    }

    if (includeSpecialChars) {
      charset += specialChars;
    }
    console.log(charset);
    console.log(length);

    // Calculate the actual length of the charset
    const actualCharsetLength = charset.length;
    console.log("actual charset length: " + actualCharsetLength);

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * actualCharsetLength);
      password += charset.charAt(randomIndex);
    }
    console.log(password);
    return password;
  }
});
