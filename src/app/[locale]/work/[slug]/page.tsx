import { notFound } from 'next/navigation'
import { Button, Flex, Heading, Text } from '@/once-ui/components'
import { baseURL, renderContent } from '@/app/resources';
import { work as workContent } from '@/app/resources/content';
import { routing } from '@/i18n/routing';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface WorkParams {
    params: {
        slug: string;
		locale: string;
    };
}

// Every project page is built ahead of time; any other slug is a real 404
export const dynamicParams = false;

export async function generateStaticParams() {
	return routing.locales.flatMap((locale) =>
		workContent.projects.map((project) => ({
			slug: project.slug,
			locale: locale,
		}))
	);
}

export async function generateMetadata({ params: { slug, locale } }: WorkParams) {
	const t = await getTranslations();
	const { work } = renderContent(t);
	const project = work.projects.find((project) => project.slug === slug);

	if (!project) {
		return
	}

	const title = project.title;
	const description = project.summary;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			url: `https://${baseURL}/${locale}/work/${project.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default function Project({ params }: WorkParams) {
	unstable_setRequestLocale(params.locale);

	const t = useTranslations();
	const { person, work } = renderContent(t);
	const project = work.projects.find((project) => project.slug === params.slug);

	if (!project) {
		notFound()
	}

	const meta = [project.date, project.stack].filter(Boolean).join(' · ');

	return (
		<Flex as="section"
			fillWidth maxWidth="m"
			direction="column" alignItems="center"
			gap="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CreativeWork',
						headline: project.title,
						description: project.summary,
						image: `https://${baseURL}/og?title=${encodeURIComponent(project.title)}`,
						url: `https://${baseURL}/${params.locale}/work/${project.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex
				fillWidth maxWidth="xs" gap="16"
				direction="column">
				<Button
					href={`/${params.locale}/work`}
					variant="tertiary"
					size="s"
					prefixIcon="chevronLeft">
					Projects
				</Button>
				<Heading
					variant="display-strong-s">
					{project.title}
				</Heading>
				{meta && (
					<Text
						variant="body-default-s"
						onBackground="neutral-weak">
						{meta}
					</Text>
				)}
				{project.summary && (
					<Text
						variant="body-default-l"
						onBackground="neutral-medium">
						{project.summary}
					</Text>
				)}
				{(project.demoUrl || project.github) && (
					<Flex
						gap="8" wrap>
						{project.demoUrl && (
							<Button
								href={project.demoUrl}
								variant="primary"
								size="s"
								suffixIcon="arrowUpRight"
								label="Live demo"/>
						)}
						{project.github && (
							<Button
								href={project.github}
								variant="secondary"
								size="s"
								prefixIcon="github"
								label="View on GitHub"/>
						)}
					</Flex>
				)}
			</Flex>
			<Flex
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<Flex
					as="ul"
					direction="column" gap="16">
					{project.bullets.map((bullet: string, index: number) => (
						<Text
							as="li"
							variant="body-default-m"
							key={`${project.slug}-${index}`}>
							{bullet}
						</Text>
					))}
				</Flex>
			</Flex>
		</Flex>
	)
}
