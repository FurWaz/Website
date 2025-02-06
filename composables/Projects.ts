export type ProjectType = 'project' | 'application' | 'website' | 'game';
export type Project = {
    name: string,
    description: { fr?: string, en?: string },
    explanation?: { fr?: string[], en?: string[] },
    image: string,
    imagePadding?: boolean;
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
        explanation: {
            fr: [
                "FullBowody est une application gratuite permettant de suivre votre corps en temps réel à l'aide d'une ou de plusieurs caméras.",
                "Cette application peut être utilisée pour émuler le suivi du corps entier dans les jeux, ou pour suivre votre corps dans un logiciel 3D (comme Blender par exemple).",
                "Elle prend également en charge Kinect v1 et Kinect v2 (Kinect pour Xbox 360 et Kinect pour Xbox One) pour suivre votre corps avec plus de précision.",
                "L'ensemble de l'application est conçu pour être étendu et personnalisé, vous pouvez donc ajouter vos propres fonctionnalités et l'utiliser comme vous le souhaitez !",
                "L'application est disponible pour Windows et Linux, et le code source est disponible sur GitHub."
            ],
            en: [
                "FullBowody is a free application to track your body in realtime using one or multiple cameras.",
                "This application can be used to emulate full body tracking in games, or to track your body in a 3D software (like Blender for example).",
                "It also supports Kinect v1 and Kinect v2 (Kinect for Xbox 360 and Kinect for Xbox One) to track your body with more precision.",
                "The entire application is made to be extended and customized, so you can add your own features and use it as you want !",
                "The application is available for Windows and Linux, and the source code is available on GitHub."
            ],
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
        explanation: {
            fr: [
                "Pypoll est un nouveau réseau social qui vous permet de poser des questions à des milliers de personnes et de recevoir des réponses instantanées.",
                "Vous pouvez poser des questions sur n'importe quel sujet et obtenir des réponses de personnes du monde entier. Vous pouvez également voter pour les réponses des autres utilisateurs et voir les résultats en temps réel.",
                "Le projet est composé de plusieurs parties : Un site web et application mobile faits en VueJS, une API REST en NodeJS et une base de données MySQL. Regardez le code source sur GitHub pour plus d'informations.",
                "Pypoll est entièrement gratuit et ne nécessite aucune inscription. Alors n'hésitez pas à y jeter un coup d'œil !"
            ],
            en: [
                "Pypoll is a new social network that allows you to ask questions to thousands of people and receive instant answers.",
                "You can ask questions about any subject and get answers from people all around the world. You can also vote for other users' answers and see the results in real-time.",
                "The project is composed of several parts: A website and mobile application made in VueJS, a REST API in NodeJS and a MySQL database. Check the source code on GitHub for more information.",
                "Pypoll is completely free and does not require any registration. So feel free to take a look at it !"
            ]
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
        explanation: {
            fr: [
                "VyBeen est une plateforme web pour écouter et chanter de la musique ensemble.",
                "C'est un projet que j'ai créé pour écouter de la musique avec des amis, et je le mets à jour de temps en temps pour ajouter de nouvelles fonctionnalités.",
                "Ce projet est loin d'être terminé, mais il est déjà utilisable, alors n'hésitez pas à l'essayer (lien ci-dessous) !",
                "Vous pouvez également consulter le code source sur GitHub pour voir comment cela fonctionne et peut-être y contribuer si vous le souhaitez."
            ],
            en: [
                "VyBeen is a web platform to listen and sing music together.",
                "It's a project I created to listen to music with friends, and I update it from time to time to add new features.",
                "This project is far from finished, but it is already usable, so feel free to try it (link below) !",
                "You can also check the source code on GitHub to see how it works and maybe contribute to it if you want."
            ]
        },
        image: '/img/projects/VyBeen.png',
        links: {
            website: 'https://vybeen.projects.furwaz.com',
            github: 'https://github.com/vybeen'
        },
        tags: ['music', 'web', 'socketio', 'nodejs', 'deezer', 'spotify'],
        type: 'application'
    },
    {
        name: 'Robot humanoïde',
        description: {
            fr: 'Un robot humanoïde en impression 3D, animé par un Arduino Nano !',
            en: 'A 3D printed humanoid robot, powered by an Arduino Nano!',
        },
        explanation: {
            fr: [
                "Ce robot est un projet que j'ai réalisé pour m'amuser et apprendre la robotique et l'impression 3D.",
                "Il est entièrement imprimé en ABS, à l'exception de quelques composants électroniques et mécaniques.",
                "Le robot est contrôlé par un Arduino Nano, qui reçoit des commandes via une communication série USB ou Bluetooth. Il renvoie des informations sur ses capteurs et son état via la même communication.",
                "Le code source est disponible sur GitHub, alors n'hésitez pas à le consulter si vous souhaitez en savoir plus sur ce projet !"
            ],
            en: [
                "This robot is a project I made for fun and to learn robotics and 3D printing.",
                "It is entirely printed in ABS, except for some electronic and mechanical components.",
                "The robot is controlled by an Arduino Nano, which receives commands via USB or Bluetooth serial communication. It sends back information about its sensors and state via the same communication.",
                "The source code is available on GitHub, so feel free to check it out if you want to know more about this project!"
            ]
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
            fr: 'Programmez votre animal de companie pour le faire évoluer dans son monde cubique !',
            en: 'Code your pet to make it evolve in its cubic world!',
        },
        explanation: {
            fr: [
                "PixelPets est un jeu ressemblant de loin à un Tamagotchi, mais ce dernier propose de programmer votre animal pour le faire évoluer dans environnement !",
                "Ce jeu est réalisé en 3D sous le moteur Unity, et le code est écrit en C#. Il sera disponible sur Windows, Linux et Android. (Je n'ai pas de mac, désolé)",
                "Le jeu est encore en développement, mais vous pourrez bientôt essayer une version de démonstration sur le site web !",
            ],
            en: [
                "PixelPets is a game that looks like a Tamagotchi, but this one allows you to program your pet to make it evolve in its environment!",
                "This game is made in 3D under the Unity engine, and the code is written in C#. It will be available on Windows, Linux and Android. (I don't have a mac, sorry)",
                "The game is still in development, but you will soon be able to try a demo version on the website!",
            ]
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
            fr: 'Un système d\'interaction physique avec un monde virtuel via un Meta Quest 2 !',
            en: 'A physical interaction system with a virtual world using a Meta Quest 2!',
        },
        explanation: {
            fr: [
                "XRTouch est un projet scolaire que j'ai réalisé avec 2 autres étudiants.",
                "L'objectif de ce projet était de créer des dispositifs réels pouvant donner un retour physique à l'utilisateur sur son environnement virtuel.",
                "Nous avons utilisé un Meta Quest 2 comme casque de réalité virtuelle et dispositif de suivi des mains, et nous avons créé un gant physique capable de donner un retour de force à l'utilisateur.",
                "Le gant est composé d'une coque imprimée en 3D, avec des servomoteurs et d'autres composants. L'ensemble du système est contrôlé par un Arduino, connecté à un ordinateur via une communication série Bluetooth.",
                "Si ce projet vous intéresse, vous pouvez trouver plus d'informations, des ressources, le code source et tout le reste sur le dépôt GitHub !"
            ],
            en: [
                "XRTouch is a school project I made with 2 other students.",
                "The goal of this project was to create real devices that could give physical feedback to the user on his virtual environment.",
                "We used a Meta Quest 2 as a virtual reality headset and hand tracking device, and we created a physical glove capable of giving force feedback to the user.",
                "The glove is made of a 3D printed shell, with servomotors and other components. The whole system is controlled by an Arduino, connected to a computer via Bluetooth serial communication.",
                "If this project interests you, you can find more information, resources, source code and everything else on the GitHub repository!"
            ]
        },
        image: '/img/projects/XRTouch.png',
        links: {
            github: 'https://github.com/FurWaz/XRTouch'
        },
        tags: ['vr', 'oculus', 'unity', 'c#', 'hand', 'tracking'],
        type: 'project'
    },
    {
        name: 'WebXR',
        description: {
            fr: 'Une scène 3D interactive en ligne, combinant réalité virtuelle et retours haptiques !',
            en: 'An online interactive 3D scene, combining virtual reality and haptic feedback!',
        },
        explanation: {
            fr: [
                "WebXR est plutôt un projet de test avec le développement XR (VR/AR) sur les navigateurs web qu'un véritable jeu.",
                "Il s'agit d'une scène 3D avec quelques objets de test, qui prend en charge le suivi des mains et détecte certains gestes pour sélectionner des objets, se téléporter dans la scène et déplacer des accessoires.",
                "Il est compatible (et testé) avec les casques de réalité virtuelle, tels que l'Oculus Quest.",
                "Si ce projet vous intéresse, vous pouvez trouver le code source sur ma page GitHub ! Une version hébergée sera bientôt disponible."
            ],
            en: [
                "WebXR is more of a test project with XR (VR/AR) development on web browsers than a real game.",
                "It is a 3D scene with some test objects, which supports hand tracking and detects some gestures to select objects, teleport in the scene and move accessories.",
                "It is compatible (and tested) with virtual reality headsets, such as the Oculus Quest.",
                "If this project interests you, you can find the source code on my GitHub page! A hosted version will be available soon."
            ]
        },
        image: '/img/projects/WebXR.png',
        links: {
            github: 'https://github.com/FurWaz/WebXR',
            website: 'https://furwaz.github.io/WebXR/client/'
        },
        tags: ['web', 'xr', 'threejs', 'javascript', 'webgl'],
        type: 'website'
    },
    {
        name: 'Cocktails',
        description: {
            fr: 'Un site de recettes de cocktails, pour les amateurs de boissons alcoolisées !',
            en: 'A cocktail recipe site, for lovers of alcoholic drinks!',
        },
        explanation: {
            fr: [
                "Cocktails est un site web réalisé avec un autre étudiant dans le cadre d'un projet scolaire.",
                "C'est un site web où vous pouvez trouver des recettes de cocktails, les ajouter à vos favoris et parcourir l'ensemble de la base de données des cocktails en sélectionnant des filtres et des ingrédients !",
                "Le site web est réalisé avec HTML/CSS/JavaScript et TailwindCSS, et utilise une API écrite en PHP.",
                "L'ensemble du projet est disponible sur mon site web (lien ci-dessous), afin que vous puissiez l'essayer par vous-même !"
            ],
            en: [
                "Cocktails is a website made with another student as part of a school project.",
                "It is a website where you can find cocktail recipes, add them to your favorites and browse the entire cocktail database by selecting filters and ingredients!",
                "The website is made with HTML/CSS/JavaScript and TailwindCSS, and uses an API written in PHP.",
                "The entire project is available on my website (link below), so you can try it out for yourself!"
            ]
        },
        image: '/img/projects/Cocktails.png',
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
            fr: 'Une plateforme de covoiturage entre inconnus ou amis !',
            en: 'A carpool platform for strangers or friends to share a ride!',
        },
        explanation: {
            fr: [
                "Car Share est une application web créée pour un projet scolaire.",
                "Sur Car Share vous pouvez créer un trajet, ou rejoindre un trajet existant, et partager le prix du trajet avec les autres passagers ou groupes d'amis.",
                "Le site est fait avec HTML/CSS/JS en utilisant le framework VueJS, et est basé sur un serveur web fait avec Express, Prisma et une base de données MariaDB.",
                "Le projet entier est gratuit et disponible sur mon site (lien ci-dessous), donc n'hésitez pas à y jeter un oeil!"
            ],
            en: [
                "Car Share is a web application created for a school project.",
                "On Car Share you can create a trip, or join an existing trip, and share the price of the trip with other passengers or groups of friends.",
                "The site is made with HTML/CSS/JS using the VueJS framework, and is based on a web server made with Express, Prisma and a MariaDB database.",
                "The entire project is free and available on my website (link below), so feel free to check it out!"
            ]
        },
        image: '/img/projects/CarShare.png',
        imagePadding: true,
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
            fr: 'Collabore avec tes amis sur des feuilles de calcul !',
            en: 'Collaborate with your friends on spreadsheets!',
        },
        explanation: {
            fr: [
                "CharlySheet est un tableur collaboratif en ligne. Il permet de travailler à plusieurs sur des feuilles de calcul.",
                "Il est possible de créer des feuilles de calcul, de les partager avec ses amis, de les modifier en même temps, et tout cela en temps réel !",
                "CharlySheet est un projet open-source, vous pouvez donc le modifier et l'améliorer à votre guise sur le dépôt GitHub.",
                "Cette application web à réalisé par Paul Loisil, Antonin Rouseau, Antoine Contoux, et Guillaume Renard dans le cadre d'un projet scolaire de 1ère année de Master Informatique à l'Université de Nancy.",
                "Le projet utilise plusieurs technologies telles que Node.js, Express, Socket.io, MongoDB, VueJS et TailwindCSS."
            ],
            en: [
                "CharlySheet is an online collaborative spreadsheet. It allows you to work with others on spreadsheets.",
                "You can create spreadsheets, share them with your friends, edit them at the same time, and all of this in real-time!",
                "CharlySheet is an open-source project, so you can modify and improve it as you wish on the GitHub repository.",
                "This web application was made by Paul Loisil, Antonin Rouseau, Antoine Contoux, and Guillaume Renard as part of a 1st year Master's degree in Computer Science at the University of Nancy.",
                "The project uses several technologies such as Node.js, Express, Socket.io, MongoDB, VueJS and TailwindCSS."
            ]
        },
        image: '/img/projects/CharlySheet.png',
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
            fr: 'Une extension VS Code pour le langage algorithmique à l\'IUT Charlemagne !',
            en: 'A VS Code extension for algorithmic programming at the Charlemagne IT Department!',
        },
        explanation: {
            fr: [
                "AlgoSniper est une extension VS Code qui vous permet de coder dans le langage algorithmique utilisé pour l'apprentissage de la programmation au département informatique de Charlemagne.",
                "Elle offre une mise en évidence syntaxique, une complétion de code et quelques autres fonctionnalités pour faciliter et accélérer l'écriture du code. Elle permet également de générer la documentation et la lexicographie du code.",
                "Cette extension est open source et disponible sur GitHub. Si vous souhaitez contribuer, n'hésitez pas à le faire ! Vous pouvez également tester l'extension en la téléchargeant depuis le Visual Studio Marketplace."
            ],
            en: [
                "AlgoSniper is an extension for VS Code that allows you to code in the algorithmic language used for programming learning at the Charlemagne computer science department.",
                "It offers syntax highlighting, code completion and a few other features to make writing code easier and faster. It also allows you to generate code documentation and lexicography.",
                "This extension is open source and available on GitHub. If you want to contribute, feel free to do so! You can also test the extension by downloading it from the Visual Studio Marketplace."
            ]
        },
        image: '/img/projects/AlgoSnipper.png',
        links: {
            github: 'https://github.com/FurWaz/AlgoSnipper',
        },
        tags: ['school', 'extension', 'vscode', 'typescript', 'algorithms'],
        type: 'project'
    },
    {
        name: 'ToTheTop',
        description: {
            fr: 'Montez le plus haut possible à la vitesse de la musique sans tomber de l\'échelle !',
            en: 'Go as high as you can at the speed of the music without falling off the ladders!',
        },
        explanation: {
            fr: [
                "ToTheTop est un mini-jeu où vous devez monter aussi haut que possible à la vitesse de la musique sans tomber des échelles !",
                "Il est conçu pour les appareils mobiles et a été réalisé avec Unity3D et C#.",
                "Le jeu n'est pas encore disponible sur le Google Play Store car il est toujours en développement, mais l'intégralité du projet peut être trouvée via le lien GitHub ci-dessous."
            ],
            en: [
                "ToTheTop is a mini-game where you have to climb as high as possible at the speed of the music without falling off the ladders!",
                "It is designed for mobile devices and was made with Unity3D and C#.",
                "The game is not yet available on the Google Play Store as it is still in development, but the entire project can be found via the GitHub link below."
            ]
        },
        image: '/img/projects/ToTheTop.png',
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
            fr: 'Terminez tous les niveaux sans tomber dans les trous de la fenêtre de jeu !',
            en: 'Complete all levels without falling into the holes of your game window!',
        },
        explanation: {
            fr: [
                "Obstruct est un petit jeu réalisé pour une game jam Itch.io. Le but du jeu est de terminer tous les niveaux sans tomber dans les trous de la fenêtre.",
                "Ce jeu n'est pas poli ni stable et ce n'est pas le but. C'est juste un petit jeu que j'ai réalisé en quelques heures pour essayer le système de masques de fenêtre de Windows.",
                "Le jeu est disponible sur Itch.io et sur GitHub, si vous souhaitez l'essayer ou consulter le code source !"
            ],
            en: [
                "Obstruct is a small game made for an Itch.io game jam. The goal of the game is to complete all the levels without falling into the holes of the window.",
                "This game is not polished or stable and that's not the goal. It's just a small game I made in a few hours to try out the Windows window masks system.",
                "The game is available on Itch.io and on GitHub, if you want to try it out or check out the source code!"
            ]
        },
        image: '/img/projects/Obstruct.png',
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
            fr: 'Éliminez tous les ennemis sans vous faire toucher, faites attention au refrain !',
            en: 'Kill all enemies without getting hit, watch out for the chorus!',
        },
        explanation: {
            fr: [
                "Steroids est un jeu d'arcade réalisé pour une game jam Itch.io. L'objectif était de créer un jeu sans niveaux prédéfinis, en utilisant la musique pour les générer.",
                "Le jeu est un jeu de tir en vue de dessus, où vous devez éliminer tous les ennemis sans vous faire toucher. La vitesse et le nombre d'ennemis sont basés sur la musique, alors faites attention lorsque le refrain commence !",
                "Ce jeu a été créé à partir de zéro en utilisant le langage de programmation C++ et la bibliothèque SFML, et il est disponible pour Windows.",
                "Le jeu est disponible gratuitement sur Itch.io, et le code source est disponible sur Github."
            ],
            en: [
                "Steroids is an arcade game made for an Itch.io game jam. The goal was to create a game without predefined levels, using music to generate them.",
                "The game is a top-down shooter, where you have to eliminate all enemies without getting hit. The speed and number of enemies are based on the music, so be careful when the chorus starts!",
                "This game was created from scratch using the C++ programming language and the SFML library, and it is available for Windows.",
                "The game is available for free on Itch.io, and the source code is available on Github."
            ]
        },
        image: '/img/projects/Steroids.png',
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
            fr: 'Un interpréteur Brainfuck avec une belle interface pour voir ce qui s\'y passe !',
            en: 'A brainfuck interpreter with a nice graphical interface to see behind the scenes!',
        },
        explanation: {
            fr: [
                "Brainfuck est un interpréteur Brainfuck graphique simple réalisé avec du JavaScript pur.",
                "Ce site web vous permet de visualiser les blocs mémoire du programme, le pointeur du programme actuel et les ajouts/suppressions qu'il effectue sur les blocs en temps réel !",
                "Il met également en évidence la partie du programme en cours d'exécution afin que vous puissiez suivre précisément ce qui se passe, ralentir le programme ou l'accélérer selon vos préférences !"
            ],
            en: [
                "Brainfuck is a simple graphical brainfuck interpreter made with pure JavaScript.",
                "This website makes you able to visualize the program's memory blocks, the current program's pointer and what addition / deletions it does on the blocks in realtime!",
                "It also highlights the part of the program that is running to that you can follow exactly what's happening, slow down the program or speed it up as you like!"
            ]
        },
        image: '/img/projects/Brainfuck.png',
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
            fr: 'Un visualiseur de musique entièrement personnalisable réalisé en python !',
            en: 'A fully customizable music visualizer made in python!',
        },
        explanation: {
            fr: [
                "Furalizer est un visualiseur de musique réalisé en python à l'aide des bibliothèques SFML, TKinter et Numpy.",
                "Il est entièrement personnalisable et peut être utilisé pour afficher des visualisations musicales en temps réel ou pour générer des vidéos à partir de fichiers audio.",
                "L'application peut également être étendue pour contrôler d'autres périphériques tels que des bandes LED ou d'autres visualiseurs.",
                "Vous pouvez consulter le code source sur GitHub ou télécharger la dernière version ci-dessous."
            ],
            en: [
                "Furalizer is a music visualizer made in python using the SFML, TKinter and Numpy libraries.",
                "It is fully customizable and can be used to render music visualizations in real time or to render videos from audio files.",
                "The application can also be extended to control other devices such as LED strips or other visualizers.",
                "You can check out the source code on GitHub or download the latest release below."
            ]
        },
        image: '/img/projects/Furalizer.png',
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
            fr: 'Un moteur de rendu 3D et lecteur OBJ fait de A à Z en c++ !',
            en: 'A 3D renderer and OBj file loader made from scratch in c++ !',
        },
        explanation: {
            fr: [
                "BigyRenderer est un moteur de rendu 3D créé pendant un projet de Master 1 Informatique à l'Université de Lorraine.",
                "Ce moteur supporte la lecture de fichiers OBJ, et leurs différentes textures associées (diffuse, normale, spéculaire).",
                "L'entierté du rendu 3D est faite en C++ sans aucune librairie et tourne donc seulement sur le processeur.",
                "Seul le chargement et la sauvegarde d'images est fait en utilisant la librairie STB."
            ],
            en: [
                "BigyRenderer is a 3D renderer made during a 4th year project in computer science at the University of Lorraine.",
                "This renderer supports the reading of OBJ files, and their different associated textures (diffuse, normal, specular).",
                "The entire 3D rendering is done in C++ without any library and only runs on the CPU.",
                "Only the loading and saving of images is done using the STB library."
            ]
        },
        image: '/img/projects/BigyRenderer.png',
        links: {
            // website: 'https://github.com/FurWaz/Brainfuck',
            github: 'https://github.com/FurWaz/BigyRenderer'
        },
        tags: ['school', 'c++', 'renderer', '3d', 'rasterization'],
        type: 'project'
    },
    {
        name: 'CFS 68',
        description: {
            fr: 'Le site vitrine du Centre Français de Secourisme du Haut Rhin !',
            en: 'Centre Français de Secourisme\'s website !'
        },
        explanation: {
            fr: [],
            en: []
        },
        image: 'https://cfs.projects.furwaz.com/img/Logo512.png',
        links: {
            website: 'https://cfs.projects.furwaz.com'
        },
        tags: ['website', 'cfs', 'nuxtjs', 'vuejs', 'nodejs', 'tailwindcss'],
        type: 'website'
    },
    {
        name: 'TNY-360',
        description: {
            fr: 'Un petit robot-araignée quadrupède, rempli de capteurs et fonctionnant avec un esp32',
            en: 'A small quadruped spider-like robot, full of sensors and powered by an esp32'
        },
        explanation: {
            fr: [
                "TNY-360 est un petit robot-chien dont le but est d'évoluer de la manière la plus autonome et efficace possible dans son environnement.",
                "Il est entièrement imprimé en 3D (Filament PLA sur une imprimante FDM), et est équipé de plusieurs capteurs (camera, micro, lasers, detecteur de pression) pour détecter son environnement et communiquer en retour (moteurs, haut-parleur, ecran).",
                "Le robot est contrôlé par un ESP32, réalisant un maximum de tâches simples lui-même (déplacements, planification), et communiquant avec un serveur distant pour des tâches plus complexes (classification d'objets, de visages, de sons).",
                "L'intégralité du code source du robot, des applications satelites ainsi que les modèles 3D sont disponible sur GitHub, et tout le processus est documenté sur le site internet si vous voulez en réaliser un vous-même !"
            ],
            en: [
                "TNY-360 is a small dog-like robot whose goal is to evolve as autonomously and efficiently as possible in its environment.",
                "It is entirely 3D printed (PLA Filament on an FDM printer), and is equipped with several sensors (camera, microphone, lasers, pressure detector) to detect its environment and communicate back (motors, speaker, screen).",
                "The robot is controlled by an ESP32, performing a maximum of simple tasks itself (movements, planning), and communicating with a remote server for more complex tasks (object, face, sound classification).",
                "The entire source code of the robot, satellite applications as well as the 3D models are available on GitHub, and the entire process is documented on the website if you want to make one yourself!"
            ]
        },
        image: 'https://tny360.projects.furwaz.com/icon.png',
        links: {
            website: 'https://tny360.projects.furwaz.com',
            github: 'https://github.com/FurWaz/TNY-360'
        },
        tags: ['robotic', 'esp32', '3dprinting', 'c++', 'python'],
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