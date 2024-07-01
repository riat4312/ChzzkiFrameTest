try {
    window.top.location.hostname;
} catch {
    if (window.location.hostname === "chzzk.naver.com") {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("web/chzzk.js");
        document.body.appendChild(script);
    }
}
