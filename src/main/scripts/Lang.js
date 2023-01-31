import en from "./langs/en.js";
import fr from "./langs/fr.js";

class Lang {
    static callbackIndex = 0;
    static callbacks = [];
    static current_lang = null;

    static langs = [
        {label: "English", value: "en"},
        {label: "Français", value: "fr"},
    ];

    static get CurrentLang() {
        if (this.current_lang == null)
            this.loadLang( localStorage.getItem("lang") || "en" );
        return this.current_lang;
    }

    static loadLang(code) {
        if (this.langs.map(l => l.value).indexOf(code) === -1)
            return false;
        
        this.current_lang = (code == "en")? en : fr;
        for (const key in en) {
            if (!this.current_lang[key])
                this.current_lang[key] = en[key];
        }

        this.callbacks.forEach(c => {
            if (c.callback)
                c.callback(this.current_lang);
        });
        return true;
    }

    static addCallback(c) {
        const i = this.callbackIndex++;
        this.callbacks.push( {index: i, callback: c} );
        return i;
    }

    static remCallback(i) {
        const ind = this.callbacks.findIndex(e => e.index === i);
        if (ind === -1) return false;
        this.callbacks.splice(ind, 1);
        return true;
    }
}

export default Lang;