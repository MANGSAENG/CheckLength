// 다크 모드 설정/해제를 위한 함수
function setDarkMode(isDark) {
    const body = document.body;

    if (isDark) {
        body.classList.add('dark-mode');
        document.cookie = "darkmode=true; path=/";
    } else {
        body.classList.remove('dark-mode');
        document.cookie = "darkmode=false; path=/";
    }
}

// 쿠키에서 다크 모드 여부를 확인하는 함수
function getDarkModeFromCookies() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        if (cookie.startsWith('darkmode=')) {
            return cookie.split('=')[1] === 'true';
        }
    }
    return false;
}

// 화이트 모드와 다크 모드 버튼에 이벤트 리스너 추가
document.getElementById('lightModeButton').addEventListener('click', function() {
    setDarkMode(false);
});

document.getElementById('darkModeButton').addEventListener('click', function() {
    setDarkMode(true);
});

// 페이지 로드 시 쿠키를 확인하여 다크 모드 적용 여부 결정
window.onload = function() {
    const isDarkMode = getDarkModeFromCookies();
    setDarkMode(isDarkMode);
};

// 결과 확인 버튼 동작
document.getElementById('submitButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const resultContainer = document.getElementById('resultContainer');
    
    let rtText = "결과 - \n";
    rtText += "총용량 : " + formatByteSize(getByteLength(inputText)) + "\n";
    rtText += "글자수 : " + comma(inputText.length) + "\n";
    rtText += "공백 X : " + comma(inputText.replaceAll(" ", "").replaceAll("\n", "").length) + "\n\n";

    let Novp = inputText;
	Novp = Novp.replaceAll("\n", "").replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "")
	Novp = Novp.replaceAll("'", "").replaceAll("\"", "").replaceAll("!", "").replaceAll("?", "")
	Novp = Novp.replaceAll("&", "11111").replaceAll("<", "1111").replaceAll(">", "1111")
    let Monp = inputText.replaceAll("\n", "");

    rtText += "노피아 : " + comma(Novp.length) + "\n";
    rtText += "문피아 : " + comma(Monp.length) + "\n";


    resultContainer.innerText = rtText;
});


function getByteLength(str) {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
        const codePoint = str.charCodeAt(i);
        
        if (codePoint <= 0x7F) {
            // ASCII characters (1 byte)
            byteLength += 1;
        } else {
            // Korean characters and others in EUC-KR (2 bytes)
            byteLength += 2;
        }
    }
    return byteLength;
}
function formatByteSize(byteLength) {
    if (byteLength >= 1024 * 1024) {
        // 메가바이트 이상
        return (byteLength / (1024 * 1024)).toFixed(2) + " MB";
    } else if (byteLength >= 1024) {
        // 킬로바이트 이상
        return (byteLength / 1024).toFixed(2) + " KB";
    } else {
        // 바이트
        return comma(byteLength) + " B";
    }
}
function comma(number) {
    return number.toLocaleString();
}
