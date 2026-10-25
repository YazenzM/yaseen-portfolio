import { use } from 'react';
import { Flex, Heading, Tag, Text } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
) {
    const { locale } = await params;

    const t = await getTranslations();
    const { work } = renderContent(t);

	const title = work.title;
	const description = work.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/work`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Work(
    { params }: { params: Promise<{ locale: string }> }
) {
    const { locale } = use(params);
    setRequestLocale(locale);

    const t = useTranslations();
    const { person, work } = renderContent(t);

    return (
        <Flex
			fillWidth maxWidth="m"
			direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        headline: work.title,
                        description: work.description,
                        url: `https://${baseURL}/${locale}/work`,
                        image: `https://${baseURL}/og?title=${encodeURIComponent(work.title)}`,
                        author: {
                            '@type': 'Person',
                            name: person.name,
                        },
                        hasPart: work.projects.map(project => ({
                            '@type': 'CreativeWork',
                            headline: project.title,
                            description: project.summary,
                            url: `https://${baseURL}/${locale}/work/${project.slug}`,
                        })),
                    }),
                }}
            />
            <Flex
                fillWidth paddingX="l" marginBottom="l"
                direction="column" gap="8">
                <Heading
                    variant="display-strong-s">
                    {work.title}
                </Heading>
                <Text
                    variant="body-default-l"
                    onBackground="neutral-weak">
                    {work.description}
                </Text>
            </Flex>
            <Projects locale={locale}/>
            { work.competitions.display && work.competitions.items.length > 0 && (
                <Flex
                    as="section"
                    fillWidth paddingX="l" marginBottom="40"
                    direction="column" gap="l">
                    <Heading
                        as="h2"
                        id={work.competitions.title}
                        variant="display-strong-xs">
                        {work.competitions.title}
                    </Heading>
                    {work.competitions.items.map((competition, index) => (
                        <Flex
                            key={`${competition.title}-${index}`}
                            fillWidth gap="8"
                            direction="column">
                            <Flex
                                fillWidth gap="4"
                                mobileDirection="column"
                                justifyContent="space-between"
                                alignItems="baseline">
                                <Flex
                                    gap="12" wrap
                                    alignItems="center">
                                    <Text
                                        variant="heading-strong-m">
                                        {competition.title}
                                    </Text>
                                    {competition.badge && (
                                        <Tag
                                            variant="accent"
                                            size="s"
                                            label={competition.badge}/>
                                    )}
                                </Flex>
                                {competition.date && (
                                    <Text
                                        variant="body-default-s"
                                        onBackground="neutral-weak">
                                        {competition.date}
                                    </Text>
                                )}
                            </Flex>
                            <Flex
                                as="ul"
                                direction="column" gap="8">
                                {competition.bullets.map((bullet: string, index: number) => (
                                    <Text
                                        as="li"
                                        variant="body-default-s"
                                        onBackground="neutral-medium"
                                        key={`${competition.title}-${index}`}>
                                        {bullet}
                                    </Text>
                                ))}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    );
}
