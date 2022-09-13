export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Redirects the user back in history or on the home page
 * @param {boolean} wait Should the function wait 1s before redirecting
 */
export function redirectHome(wait=true) {
    setTimeout(() => {
        if (document.referrer.startsWith(window.location.origin))
            window.location.href = document.referrer;
        else window.location.href = window.location.origin;
    }, wait?1000:0);
}

export function redirectTo(url, wait=false) {
    setTimeout(() => {
        window.location.href = url;
    }, wait?1000:0);
}

/**
 * Converts a number of seconds to a stringified time
 * @param {number} time time in seconds to convert to a string
 * @returns stringified time (minutes+seconds)
 */
export function stringTime(time) {
    let nbMinutes = Math.floor(time / 60);
    let nbSeconds = time % 60;
    let minutes = "";
    if (nbMinutes > 0) {
        minutes = `${Math.round(nbMinutes)} ${nbMinutes >= 2 ? LANGUAGE.DATA.TIME.MINUTES : LANGUAGE.DATA.TIME.MINUTE}`;
        minutes += ` ${LANGUAGE.DATA.COMMON.AND} `;
    }
    let seconds = `${Math.round(nbSeconds)} ${nbSeconds >= 2 ? LANGUAGE.DATA.TIME.SECONDS : LANGUAGE.DATA.TIME.SECOND}`;
    return (minutes + seconds).toLowerCase();
}

/** FOR EXIT PREVENT POPUP **/
// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = "Certaines modifications ne seront pas enregistrés si vous quittez la page maintenant.\n"+
//                               "Enregistrez vos modifications avant de quitter.";
//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
// });