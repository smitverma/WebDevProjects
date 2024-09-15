async function calculateHash() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        shakeTextField("fileInput");
        return;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileResult = event.target.result;
            const wordArray = CryptoJS.lib.WordArray.create(fileResult);

            const md5Hash = CryptoJS.MD5(wordArray).toString();
            const sha1Hash = CryptoJS.SHA1(wordArray).toString();
            const sha256Hash = CryptoJS.SHA256(wordArray).toString();

            document.getElementById('md5').textContent = md5Hash;
            document.getElementById('sha1').textContent = sha1Hash;
            document.getElementById('sha256').textContent = sha256Hash;

            resolve();
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

async function checkIntegrity() {

    const knownHash = document.getElementById('knownHash').value.trim().toLowerCase();

    if (knownHash.length === 0) {
        shakeTextField("knownHash");
        return;
    }

    if (document.getElementById("md5").textContent.length < 7){
        await calculateHash();
    }

    const calculatedMd5 = document.getElementById('md5').textContent.toLowerCase();
    const calculatedSha1 = document.getElementById('sha1').textContent.toLowerCase();
    const calculatedSha256 = document.getElementById('sha256').textContent.toLowerCase();

    const integrityHashElement = document.getElementById('integrityHash');
    integrityHashElement.innerHTML = '';

    if (calculatedMd5 === knownHash) {
        var video = document.getElementById("resultVideoYa");
        video.style.display = 'block';
        video.play()
        video.onended = function () {
            video.style.display = 'none';
        }
        document.getElementById("integrityImg").src = 'imgs/tick.svg';
        integrityHashElement.innerHTML += "The file integrity is not compromised!<br>Hash matched : <b>MD5</b>";
    } else if (calculatedSha1 === knownHash) {
        document.getElementById("integrityImg").src = 'imgs/tick.svg';
        integrityHashElement.innerHTML += "The file integrity is not compromised!<br>Hash matched : <b>SHA1</b>";
    } else if (calculatedSha256 === knownHash) {
        document.getElementById("integrityImg").src = 'imgs/tick.svg';
        integrityHashElement.innerHTML += "The file integrity is not compromised!<br>Hash matched : <b>SHA256</b>";
    } else {
        var video = document.getElementById("resultVideoNo");
        video.style.display = 'block';
        video.play()
        video.onended = function () {
            video.style.display = 'none';
        }
        document.getElementById("integrityImg").src = 'imgs/cross.svg';
        integrityHashElement.innerHTML += "No matching hash found.<br>The integrity is compromised!";
    }
}

// script.js
function shakeTextField(fieldID) {
    const textField = document.getElementById(fieldID);
    textField.classList.add('shake');
    setTimeout(() => {
        textField.classList.remove('shake');
    }, 500); // Duration of the animation
}

document.getElementById('checkButton').addEventListener('click', checkIntegrity);

