export const escape = (htmlStr) => {
    if (typeof htmlStr !== 'undefined') {
        return htmlStr.trim().replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    } else {
        return htmlStr;
    }
}
