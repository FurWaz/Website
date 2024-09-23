class HeaderController {
    private listeners: Record<string, Function[]> = {};

    on(event: 'title', callback: (title: string) => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    setTitle(title: string) {
        if (this.listeners['title']) {
            this.listeners['title'].forEach(callback => callback(title));
        }
    }
}

const headerController = ref(new HeaderController())
export const useHeader = () => {
    return headerController.value;
}
