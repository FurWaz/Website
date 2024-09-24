export type TranslatedString = string | { fr: string, en: string };
export type ProjectType = 'project' | 'application' | 'website' | 'game';
export type Project = {
    name: string,
    description: TranslatedString,
    image: string,
    imagePadding?: boolean,
    links: {website?: string, github?: string},
    tags: string[],
    type: ProjectType
};

const projects: Project[] = [
    {
        name: 'FullBowody',
        description: {
            fr: 'Traquez votre corps en temps réel avec de simples caméras !',
            en: 'Track your body in real-time with simple cameras!',
        },
        image: 'https://fullbowody.com/img/transparent.png',
        links: {
            website: 'https://fullbowody.com',
            github: 'https://github.com/fullbowody'
        },
        tags: ['tracking', '3d', 'pose', 'vr', 'animation', 'c++'],
        type: 'application'
    },
    {
        name: 'Pypoll',
        description: {
            fr: 'Demandez à des milliers de gens en quelques secondes !',
            en: 'Ask thousands of people within seconds!',
        },
        image: 'https://pypoll.com/img/icon.png',
        links: {
            website: 'https://pypoll.com',
            github: 'https://github.com/pypoll'
        },
        tags: ['poll', 'survey', 'android', 'ios', 'web'],
        type: 'application'
    },
    {
        name: 'VyBeen',
        description: {
            fr: 'Écoutez et partagez votre musique avec le monde entier !',
            en: 'Listen and share your music with the whole world!',
        },
        image: 'https://vybeen.projects.furwaz.com/img/favicon.png',
        imagePadding: true,
        links: {
            website: 'https://vybeen.projects.furwaz.com',
            github: 'https://github.com/vybeen'
        },
        tags: ['music', 'web', 'socketio', 'nodejs', 'deezer', 'spotify'],
        type: 'application'
    },
    {
        name: 'Robot',
        description: {
            fr: 'Un robot humanoïde en impression 3D, animé par un Arduino Nano !',
            en: 'A 3D printed humanoid robot, powered by an Arduino Nano!',
        },
        image: '/icon.png',
        links: {
            website: 'https://furwaz.com'
        },
        tags: ['electronic', '3d', 'printing', 'arduino', 'c++'],
        type: 'project'
    },
    {
        name: 'PixelPets',
        description: {
            fr: 'Programmez votre animal pour le faire évoluer dans son monde !',
            en: 'Code your pet to make it evolve in its world!',
        },
        image: '/icon.png',
        links: {
            website: 'https://furwaz.com'
        },
        tags: ['game', '3d', 'unity', 'c#', 'pet'],
        type: 'game'
    },
    {
        name: 'XRTouch',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            github: 'https://github.com/FurWaz/XRTouch'
        },
        tags: ['vr', 'oculus', 'unity', 'c#', 'hand', 'tracking'],
        type: 'project'
    },
    {
        name: 'WebXR',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            github: 'https://github.com/FurWaz/WebXR',
        },
        tags: ['web', 'xr', 'threejs', 'javascript', 'webgl'],
        type: 'website'
    },
    {
        name: 'Cocktails',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://cocktails.projects.furwaz.com',
            // github: 'https://github.com/FurWaz/WebXR',
        },
        tags: ['school', 'web', 'php', 'mysql'],
        type: 'website'
    },
    {
        name: 'CarShare',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://carshare.projects.furwaz.com',
            // github: 'https://github.com/FurWaz/WebXR',
        },
        tags: ['school', 'web', 'vuejs', 'carpool'],
        type: 'website'
    },
    {
        name: 'CharlySheet',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://charlysheet.projects.furwaz.com',
            github: 'https://github.com/actxLeToucan/CharlySheet',
        },
        tags: ['school', 'excel', 'sheet', 'socketio', 'nodejs', 'vue'],
        type: 'website'
    },
    {
        name: 'AlgoSnipper',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            github: 'https://github.com/FurWaz/AlgoSnipper',
        },
        tags: ['school', 'extension', 'vscode', 'typescript', 'algorithms'],
        type: 'project'
    },
    {
        name: 'ToTheTop',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            // website: '',
            github: 'https://github.com/FurWaz/ToTheTop',
        },
        tags: ['unity', 'c#', '2d', 'music', 'ladder'],
        type: 'game'
    },
    {
        name: 'Obstruct',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://furwaz.itch.io/0bstruct',
            github: 'https://github.com/FurWaz/Obstruct',
        },
        tags: ['c++', 'rpg', '2d', 'hole', 'tile'],
        type: 'game'
    },
    {
        name: 'Steroids',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://furwaz.itch.io/Steroids',
            github: 'https://github.com/FurWaz/Steroids',
        },
        tags: ['c++', 'music', 'space', 'invader', 'ship', '2d'],
        type: 'game'
    },
    {
        name: 'Brainfuck',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            website: 'https://furwaz.github.io/BrainFuck',
            github: 'https://github.com/FurWaz/Brainfuck'
        },
        tags: ['code', 'interpreter', 'web', 'js'],
        type: 'website'
    },
    {
        name: 'Furalizer',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            // website: 'https://github.com/FurWaz/Brainfuck',
            github: 'https://github.com/FurWaz/Furalizer'
        },
        tags: ['music', 'python', 'fft', 'tkinter', 'pygame', 'audio'],
        type: 'application'
    },
    {
        name: 'BigyRenderer',
        description: {
            fr: '',
            en: '',
        },
        image: '/icon.png',
        links: {
            // website: 'https://github.com/FurWaz/Brainfuck',
            github: 'https://github.com/FurWaz/BigyRenderer'
        },
        tags: ['school', 'c++', 'renderer', '3d', 'rasterization'],
        type: 'project'
    },
];

export const useProjects = () => {
    return projects;
}

export function text(obj: any) {
    const { locale } = useI18n();

    if (typeof obj === 'string')
        return obj;
    if (typeof obj === 'object')
        return obj[locale.value];
    return '';
}