import en from "../langs/en.js";
// import fr from "../langs/fr.js";

class Lang {
    static Langs = [
        {id: "English", value: "en", data: en},
        // {id: "French", value: "fr", data: fr},
        {id: "Default", value: "-", data: en},
    ];

    static #callbackIndex = 0;
    static #callbacks = [];
    static #current_lang = null;
    static #current_code = null;
    static #defaultCode = null;
    static #defaultLanguage = null;

    static #sanitizeCode = (code) => {
        if (!code) return this.DefaultCode;
        if (code.length > 2) code = code.split("-")[0];
        if (code.length > 2) code = code.substring(0, 2);
        return code.toLowerCase();
    }

    static get DefaultCode() {
        if (this.#defaultCode == null)
            this.#defaultCode = this.#sanitizeCode( navigator.language || navigator.userLanguage );
        return this.#defaultCode;
    }

    static get DefaultLanguage() {
        if (this.#defaultLanguage == null)
            this.#defaultLanguage = this.Langs.find(l => l.value === this.DefaultCode).data;
        return this.#defaultLanguage;
    }

    static get CurrentLang() {
        if (this.#current_lang == null)
            this.LoadLang( localStorage.getItem("lang") || this.DefaultCode, false );
        return this.#current_lang;
    }

    static get CurrentCode() {
        let temp = this.CurrentLang;
        return this.#current_code;
    }

    static LoadLang(code, save = true) {
        if (!code) {
            localStorage.removeItem("lang");
            save = false;
            if (this.#defaultCode) code = this.#defaultCode;
        }

        code = this.#sanitizeCode(code);
        
        let language = this.Langs.find(l => l.value === code);
        if (!language) {
            language = this.Langs[0];
            code = language.value;
            localStorage.removeItem("lang");
            save = false;
        }
        
        this.#current_lang = language.data;
        for (const key in Lang.defaultLanguage) {
            if (!this.#current_lang[key])
                this.#current_lang[key] = Lang.defaultLanguage[key];
        }

        this.#callbacks.forEach(c => {
            if (c.callback)
                c.callback(this.#current_lang);
        });

        this.#current_code = code;
        if (save) localStorage.setItem("lang", code);
        return true;
    }

    static AddCallback(c) {
        const i = this.#callbackIndex++;
        this.#callbacks.push( {index: i, callback: c} );
        return i;
    }

    static RemCallback(i) {
        const ind = this.#callbacks.findIndex(e => e.index === i);
        if (ind === -1) return false;
        this.#callbacks.splice(ind, 1);
        return true;
    }
}

window.Lang = Lang;
export default Lang;