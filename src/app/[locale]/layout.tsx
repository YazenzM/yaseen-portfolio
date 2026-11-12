import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Flex, Background } from '@/once-ui/components'
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style, palettes } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";

export async function generateMetadata(
	{ params }: { params: Promise<{ locale: string }> }
) {
	const { locale } = await params;

	const t = await getTranslations();
	const { person, home } = renderContent(t);

	return {
		metadataBase: new URL(`https://${baseURL}/${locale}`),
		title: home.title,
		description: home.description,
		openGraph: {
			title: `${person.firstName}'s Portfolio`,
			description: 'Portfolio website showcasing my work.',
			url: baseURL,
			siteName: `${person.firstName}'s Portfolio`,
			locale: 'en_US',
			type: 'website',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}
};

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

// The server HTML uses this theme; themeScript then applies the visitor's saved
// choice or device setting before the first paint
const defaultTheme = style.theme === 'light' ? 'light' : 'dark';

const themeScript = `(function () {
	var saved = null;
	try { saved = localStorage.getItem('theme'); } catch (e) {}
	var theme = saved === 'light' || saved === 'dark' ? saved : ${JSON.stringify(style.theme)};
	if (theme !== 'light' && theme !== 'dark') {
		theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	}
	var palette = ${JSON.stringify(palettes)}[theme];
	var root = document.documentElement;
	root.setAttribute('data-theme', theme);
	root.setAttribute('data-neutral', palette.neutral);
	root.setAttribute('data-brand', palette.brand);
	root.setAttribute('data-accent', palette.accent);
})();`;

interface RootLayoutProps {
	children: React.ReactNode;
	params: Promise<{locale: string}>;
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({locale}));
  }

export default async function RootLayout({
	children,
	params
} : RootLayoutProps) {
	const { locale } = await params;
	// Reject locales that aren't configured
	if (!routing.locales.includes(locale as any)) notFound();
	setRequestLocale(locale);
	const messages = await getMessages();
	return (
		<NextIntlClientProvider messages={messages}>
			<Flex
				as="html" lang="en"
				suppressHydrationWarning
				background="page"
				data-neutral={palettes[defaultTheme].neutral} data-brand={palettes[defaultTheme].brand} data-accent={palettes[defaultTheme].accent}
				data-solid={style.solid} data-solid-style={style.solidStyle}
				data-theme={defaultTheme}
				data-border={style.border}
				data-surface={style.surface}
				data-transition={style.transition}
				className={classNames(
					primary.variable,
					secondary ? secondary.variable : '',
					tertiary ? tertiary.variable : '',
					code.variable)}>
				<Flex style={{minHeight: '100vh'}}
					as="body"
					fillWidth margin="0" padding="0"
					direction="column">
					<script dangerouslySetInnerHTML={{ __html: themeScript }}/>
					<Background
						gradient={effects.gradient}
						dots={effects.dots}
						lines={effects.lines}/>
					<Flex
						fillWidth
						minHeight="16">
					</Flex>
					<Header/>
					<Flex
						zIndex={0}
						fillWidth paddingY="l" paddingX="l"
						justifyContent="center" flex={1}>
						<Flex
							justifyContent="center"
							fillWidth minHeight="0">
							<RouteGuard>
								{children}
							</RouteGuard>
						</Flex>
					</Flex>
					<Footer/>
				</Flex>
			</Flex>
		</NextIntlClientProvider>
	);
}