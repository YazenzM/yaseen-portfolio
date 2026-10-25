import { getPosts } from '@/app/utils'
import { baseURL, routes as routesConfig } from '@/app/resources'
import { work } from '@/app/resources/content'
import { routing } from '@/i18n/routing'

export default async function sitemap() {

    const locales = routing.locales;

    // Only list pages that are enabled in config.js
    let blogs = !routesConfig['/blog'] ? [] : locales.flatMap((locale) =>
        getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).map((post) => ({
            url: `https://${baseURL}/${locale}/blog/${post.slug}`,
            lastModified: post.metadata.publishedAt,
        }))
    );

    let works = !routesConfig['/work'] ? [] : locales.flatMap((locale) =>
        work.projects.map((project) => ({
            url: `https://${baseURL}/${locale}/work/${project.slug}`,
            lastModified: new Date().toISOString().split('T')[0],
        }))
    );

    let routes = locales.flatMap((locale)=>
        Object.entries(routesConfig)
            .filter(([, enabled]) => enabled)
            .map(([route]) => ({
                url: `https://${baseURL}/${locale}${route === '/' ? '' : route}`,
                lastModified: new Date().toISOString().split('T')[0],
            }))
    );

    return [...routes, ...blogs, ...works]
}