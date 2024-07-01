const COOKIES = [{
        name: "NID_AUT",
        domain: ".naver.com",
        url: "https://nid.naver.com/nidlogin.login",
    },
    {
        name: "NID_SES",
        domain: ".naver.com",
        url: "https://nid.naver.com/nidlogin.login",
    },
    {
        name: "PdboxTicket",
        domain: ".afreecatv.com",
        url: "https://login.afreecatv.com/app/LoginAction.php",
    },
    {
        name: "PdboxUser",
        domain: ".afreecatv.com",
        url: "https://login.afreecatv.com/app/LoginAction.php",
    },
];
const partitionKey = {
    topLevelSite: "https://mul.live"
};
const checkPermission = async () => {
    const granted = await chrome.permissions.contains({
        origins: [
            "*://*.mul.live/*",
            "*://*.naver.com/*",
            "*://*.chzzk.naver.com/*",
            "*://*.afreecatv.com/*",
        ],
    });
    if (!granted) {
        chrome.tabs.create({
            url: chrome.runtime.getURL("permission.html"),
        });
    }
    return granted;
};
const setPartitonedCookie = async (cookie, url) => {
    if (cookie.partitionKey != null) {
        return;
    }
    delete cookie.hostOnly;
    delete cookie.session;
    await chrome.cookies.set({
        ...cookie,
        sameSite: chrome.cookies.SameSiteStatus.NO_RESTRICTION,
        secure: true,
        url,
        partitionKey,
    });
};
chrome.runtime.onInstalled.addListener(checkPermission);
chrome.runtime.onStartup.addListener(async () => {
    const granted = await checkPermission();
    if (!granted) {
        return;
    }
    for (const {
            name,
            url
        }
        of COOKIES) {
        const cookie = await chrome.cookies.get({
            name,
            url
        });
        if (cookie != null) {
            await setPartitonedCookie(cookie, url);
        }
    }
});
chrome.permissions.onRemoved.addListener(checkPermission);
chrome.storage.local.onChanged.addListener(({
    streams
}) => {
    if (streams != null) {
        chrome.action.setBadgeBackgroundColor({
            color: "#737373"
        });
        chrome.action.setBadgeText({
            text: `${streams.newValue.length}`
        });
    }
});
chrome.cookies.onChanged.addListener(async ({
    cookie,
    removed
}) => {
    if (removed) {
        return;
    }
    for (const {
            name,
            domain,
            url
        }
        of COOKIES) {
        if (
            cookie.name === name &&
            cookie.domain === domain &&
            cookie.partitionKey == null
        ) {
            await setPartitonedCookie(cookie, url);
            break;
        }
    }
});
