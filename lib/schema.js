/**
 * @typedef {Object} AppSchema
 * @property {string} id - Unique ID of the app
 * @property {string} name - Display name
 * @property {string} description - Short description
 * @property {string} themeColor - Key color for the app
 * @property {AppPage[]} pages - List of pages in the app
 */

/**
 * @typedef {Object} AppPage
 * @property {string} id - Unique page ID
 * @property {string} title - Page title
 * @property {AppComponent[]} components - Ordered list of UI components
 */

/**
 * @typedef {Object} AppComponent
 * @property {string} id - Unique component instance ID
 * @property {string} type - Component type key (e.g. 'Header', 'Input', 'Chart')
 * @property {Object} props - Configuration props for the component
 */

export const INITIAL_APP_SCHEMA = {
    id: 'draft_1',
    name: 'New App',
    description: 'Describe your app to start building...',
    themeColor: 'blue',
    pages: [
        {
            id: 'page_home',
            title: 'Home',
            components: []
        }
    ]
};

export const COMPONENT_TYPES = {
    HEADER: 'Header',
    TEXT: 'Text',
    INPUT: 'Input',
    BUTTON: 'Button',
    LIST: 'List',
    STATS_CARD: 'StatsCard'
};
