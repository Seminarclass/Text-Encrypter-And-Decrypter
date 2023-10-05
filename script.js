// Function to encrypt text using a simple Caesar cipher
function encryptText(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            result += String.fromCharCode(((charCode - 65 + shift) % 26 + 26) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            result += String.fromCharCode(((charCode - 97 + shift) % 26 + 26) % 26 + 97);
        } else {
            // Non-alphabet characters remain unchanged
            result += text.charAt(i);
        }
    }
    return result;
}

// Function to decrypt text using the same Caesar cipher with an automatically calculated negative shift
function decryptText(text, shift) {
    return encryptText(text, -shift);
}

// Function to copy text to the clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Function to trigger the download of text as a file
function downloadTextAsFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');
    const copyButton = document.getElementById('copyButton');
    const downloadButton = document.getElementById('downloadButton');
    const formatSelect = document.getElementById('formatSelect');
    const customFormatInput = document.getElementById('customFormat');
    const outputText = document.getElementById('outputText');
    const fileInput = document.getElementById('fileInput');
    const shiftValueInput = document.getElementById('shiftValue');

    formatSelect.addEventListener('change', function () {
        const selectedOption = formatSelect.value;
        if (selectedOption === 'other') {
            customFormatInput.style.display = 'block';
        } else {
            customFormatInput.style.display = 'none';
        }
    });

    fileInput.addEventListener('change', function (event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                inputText.value = e.target.result;
            };
            reader.readAsText(selectedFile);
        }
    });

    encryptButton.addEventListener('click', function () {
        const textToEncrypt = inputText.value;
        const shiftValue = parseInt(shiftValueInput.value);
        const encryptedText = encryptText(textToEncrypt, shiftValue);
        outputText.textContent = 'Encrypted: ' + encryptedText;
        downloadButton.style.display = 'block';
    });

    decryptButton.addEventListener('click', function () {
        const textToDecrypt = inputText.value;
        const shiftValue = parseInt(shiftValueInput.value);
        const decryptedText = decryptText(textToDecrypt, shiftValue);
        outputText.textContent = 'Decrypted: ' + decryptedText;
        downloadButton.style.display = 'block';
    });

    copyButton.addEventListener('click', function () {
        const textToCopy = outputText.textContent.replace('Encrypted: ', '').replace('Decrypted: ', '');
        copyToClipboard(textToCopy);
        alert('Copied to clipboard: ' + textToCopy);
    });

    downloadButton.addEventListener('click', function () {
        const textToDownload = outputText.textContent.replace('Encrypted: ', '').replace('Decrypted: ', '');
        let selectedFormat = formatSelect.value;
        if (selectedFormat === 'other') {
            selectedFormat = customFormatInput.value;
        }
        const filename = 'encrypted_text.' + selectedFormat;
        downloadTextAsFile(textToDownload, filename);
    });
});
