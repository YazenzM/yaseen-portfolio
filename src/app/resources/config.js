const baseURL = 'yaseen-portfolio-tau.vercel.app'

// Enable localization
const i18n = false;

// Manage localized content in the messages folder
const i18nOptions = {
    locales: ['en'],            // A list of all locales that are supported, e.g. ['en','id']
    defaultLocale: 'en'         // Locale used by default and as a fallback
}

const routes = {
    '/':        false,
    '/about':   true,
    '/work':    true,
    '/blog':    false,
    '/gallery': false,
}

// Enable password protection on selected routes, e.g. '/work/valatlas': true
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
}

const effects = {
    gradient: true,
    dots:     true,
    lines:    false,
}

const style = {
    theme:       'system',       // dark | light | system (follows the visitor's device setting)
    solid:       'contrast',     // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'playful',      // rounded | playful | conservative
    surface:     'translucent',  // filled | translucent
    transition:  'all'           // all | micro | macro
}

// Colors for each theme; the theme button in the header switches between them
// neutral:       sand | gray | slate
// brand, accent: blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
const palettes = {
    dark: {
        neutral: 'slate',
        brand:   'blue',
        accent:  'red',
    },
    light: {
        neutral: 'slate',
        brand:   'blue',
        accent:  'blue',
    },
}

const display = {
    location: false,
    time:     false
}

const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        gradient: true,
        dots:     true,
        lines:    true,
    }
}

export { routes, protectedRoutes, effects, style, palettes, display, mailchimp, baseURL, i18n, i18nOptions };