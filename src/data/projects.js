import Lang from "../scripts/Lang";
import DownHillVue from "../components/projects/DownHill.vue";

const projects = [
    {
        name: Lang.CreateTranslationContext('projects', 'XRTouch'),
        icon: `<rect width="18" height="10" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line>`,
        description: Lang.CreateTranslationContext('projects', 'XRTouchDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'XRTouchBtn'),
                url: "https://github.com/XRTouch"
            }
        ],
        tags: ["project", "xr", "vr", "oculus", "quest", "web", "webxr", "js", "html", "css", "threejs", "virtual", "reality"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'WebXR'),
        icon: `<circle cx="6" cy="15" r="4"></circle><circle cx="18" cy="15" r="4"></circle><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"></path><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"></path><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"></path>`,
        description: Lang.CreateTranslationContext('projects', 'WebXRDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'WebXRBtn'),
                url: "https://github.com/FurWaz/WebXR"
            }
        ],
        tags: ["project", "xr", "vr", "oculus", "quest", "web", "webxr", "js", "html", "css", "threejs", "virtual", "reality"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Cocktails'),
        icon: `<path d="M8 22h8"></path><path d="M12 11v11"></path><path d="m19 3-7 8-7-8Z"></path>`,
        description: Lang.CreateTranslationContext('projects', 'CocktailsDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'CocktailsBtn'),
                url: "https://cocktails.projects.furwaz.fr"
            }
        ],
        tags: ["school", "cocktail", "web", "js", "html", "css", "tailwind", "drink"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'VyBeen'),
        icon: `<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>`,
        description: Lang.CreateTranslationContext('projects', 'VyBeenDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'VyBeenBtn'),
                url: "https://vybeen.projects.furwaz.fr"
            }
        ],
        tags: ["app", "music", "web", "js", "html", "css", "vue", "tailwind", "youtube", "spotify", "potify"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'AlgoSnipper'),
        icon: `<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"></path><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"></path>`,
        description: Lang.CreateTranslationContext('projects', 'AlgoSnipperDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'AlgoSnipperBtn'),
                url: "https://github.com/FurWaz/AlgoSnipper"
            }
        ],
        tags: ["school", "extension", "vscode", "visual", "studio", "code", "ts", "algo"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Codec'),
        icon: `<rect width="18" height="10" x="3" y="11" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" x2="8" y1="16" y2="16"></line><line x1="16" x2="16" y1="16" y2="16"></line>`,
        description: Lang.CreateTranslationContext('projects', 'CodecDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'CodecBtn'),
                url: "https://github.com/FurWaz/Codec"
            }
        ],
        tags: ["project", "discord", "bot", "nodejs", "js"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'ToTheTop'),
        icon: `<path d="M9 19h6"></path><path d="M9 15v-3H5l7-7 7 7h-4v3H9z"></path>`,
        description: Lang.CreateTranslationContext('projects', 'ToTheTopDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'ToTheTopBtn'),
                url: ""
            }
        ],
        tags: ["game", "unity", "c#", "2d", "music", "ladder", "android"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Obstruct'),
        icon: `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="9" x2="15" y1="9" y2="15"></line><line x1="15" x2="9" y1="9" y2="15"></line>`,
        description: Lang.CreateTranslationContext('projects', 'ObstructDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'ObstructBtn'),
                url: "https://furwaz.itch.io/0bstruct"
            }
        ],
        tags: ["game", "c++", "rpg", "2d", "hole", "tile", "window"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'DownHill'),
        icon: `<path fill="currentColor" d="M380.7 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM2.7 268.9c6.1-11.8 20.6-16.3 32.4-10.2L232.7 361.3l46.2-69.2-75.1-75.1c-14.6-14.6-20.4-33.9-18.4-52.1l108.8 52 39.3 39.3c16.2 16.2 18.7 41.5 6 60.6L289.8 391l128.7 66.8c13.6 7.1 29.8 7.2 43.6 .3l15.2-7.6c11.9-5.9 26.3-1.1 32.2 10.7s1.1 26.3-10.7 32.2l-15.2 7.6c-27.5 13.7-59.9 13.5-87.2-.7L12.9 301.3C1.2 295.2-3.4 280.7 2.7 268.9zM118.9 65.6L137 74.2l8.7-17.4c4-7.9 13.6-11.1 21.5-7.2s11.1 13.6 7.2 21.5l-8.5 16.9 54.7 26.2c1.5-.7 3.1-1.4 4.7-2.1l83.4-33.4c34.2-13.7 72.8 4.2 84.5 39.2l17.1 51.2 52.1 26.1c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-58.1-29c-11.4-5.7-20-15.7-24.1-27.8l-5.8-17.3-27.3 12.1-6.8 3-6.7-3.2L151.5 116.7l-9.2 18.4c-4 7.9-13.6 11.1-21.5 7.2s-11.1-13.6-7.2-21.5l9-18-17.6-8.4c-8-3.8-11.3-13.4-7.5-21.3s13.4-11.3 21.3-7.5z"/>`,
        iconViewBox: "0 0 512 512",
        description: Lang.CreateTranslationContext('projects', 'DownHillDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'DownHillBtn'),
                vue: DownHillVue
            }
        ],
        tags: ["game", "unity", "action", "ski", "snow", "winter", "android", "google", "ads"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Steroids'),
        icon: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>`,
        description: Lang.CreateTranslationContext('projects', 'SteroidsDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'SteroidsBtn'),
                url: "https://furwaz.itch.io/steroids"
            }
        ],
        tags: ["game", "c++", "speed", "music", "space", "invader", "ship", "2d"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Brainfuck'),
        icon: `<path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 9.5 22c1.21 0 2.5-.74 2.5-2.5m0-15a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 14.5 22c-1.21 0-2.5-.74-2.5-2.5m0-15V5m0 14.5V19"></path><circle cx="12" cy="12" r="2"></circle><path d="M12 9v1"></path><path d="M12 14v1"></path><path d="m14.6 10.5-.87.5"></path><path d="m10.27 13-.87.5"></path><path d="m14.6 13.5-.87-.5"></path><path d="m10.27 11-.87-.5"></path>`,
        description: Lang.CreateTranslationContext('projects', 'BrainfuckDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'BrainfuckBtn'),
                url: "https://github.com/FurWaz/Brainfuck"
            }
        ],
        tags: ["project", "code", "web", "js", "html", "css", "interpreter"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Fullbowody'),
        icon: `<circle cx="12" cy="5" r="1"></circle><path d="m9 20 3-6 3 6"></path><path d="m6 8 6 2 6-2"></path><path d="M12 10v4"></path>`,
        description: Lang.CreateTranslationContext('projects', 'FullbowodyDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'FullbowodyBtn'),
                url: "https://github.com/FullBowody"
            }
        ],
        tags: ["app", "c++", "tracking", "3d", "full", "body", "xr", "vr", "kinect", "camera", "blender", "ia", "mediapipe", "electron", "web", "vue", "tailwind", "ts"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'FyneWav'),
        icon: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`,
        description: Lang.CreateTranslationContext('projects', 'FyneWavDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'FyneWavBtn'),
                url: "https://github.com/FurWaz/FyneWav"
            }
        ],
        tags: ["app", "c++", "electron", "music"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Furalizer'),
        icon: `<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>`,
        description: Lang.CreateTranslationContext('projects', 'FuralizerDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'FuralizerBtn'),
                url: "https://github.com/FurWaz/Furalizer"
            }
        ],
        tags: ["app", "python", "music", "fft", "fourier", "transform", "audio", "wav", "visualizer", "tkinter", "tk"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Quid'),
        icon: `<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>`,
        description: Lang.CreateTranslationContext('projects', 'QuidDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'QuidBtn'),
                url: "https://quid.projects.furwaz.fr"
            } // TODO : make the apps subdomain + add github link to the app
        ],
        tags: ["app", "quiz", "web", "js", "html", "css", "vue", "tailwind", "school"]
    },
    {
        name: Lang.CreateTranslationContext('projects', 'Converter'),
        icon: `<path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path>`,
        description: Lang.CreateTranslationContext('projects', 'ConverterDesc'),
        links: [
            {
                name: Lang.CreateTranslationContext('projects', 'ConverterBtn'),
                url: "https://conv.projects.furwaz.fr/"
            }
        ],
        tags: ["app", "convert", "video", "music", "mp3", "wav", "ogg", "mp4", "avi", "web", "js", "html", "css", "vue", "tailwind"]
    }
];
export default projects;

projects.forEach(async project => {
    project.name_str = await Lang.GetTextAsync(project.name);
    project.description_str = await Lang.GetTextAsync(project.description);
});