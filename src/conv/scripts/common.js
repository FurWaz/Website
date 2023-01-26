export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Redirects the user back in history or on the home page
 * @param {boolean} wait Should the function wait 1s before redirecting
 */
export function redirectHome(wait=true) {
    setTimeout(() => {
        if (document.referrer.startsWith(window.location.origin))
            window.location.href = window.location.origin;
        else window.location.href = document.referrer;
    }, wait?1000:0);
}

export function redirectTo(url, wait=false) {
    setTimeout(() => {
        window.location.href = url;
    }, wait?1000:0);
}

export function goBack() {
    if (document.referrer.startsWith(window.location.origin))
        window.history.back();
    else window.location.href = window.location.origin;
}

/**
 * Converts a number of seconds to a stringified time
 * @param {number} time time in seconds to convert to a string
 * @returns stringified time (minutes+seconds)
 */
export function stringTime(time) {
    let nbMinutes = Math.floor(time / 60);
    let nbSeconds = time % 60;
    const minuteTxt = nbMinutes < 10 ? "0" + nbMinutes : nbMinutes;
    const secondTxt = nbSeconds < 10 ? "0" + nbSeconds : nbSeconds;
    return minuteTxt + ":" + secondTxt;
}

/** FOR EXIT PREVENT POPUP **/
// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = "Certaines modifications ne seront pas enregistrés si vous quittez la page maintenant.\n"+
//                               "Enregistrez vos modifications avant de quitter.";
//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
// });