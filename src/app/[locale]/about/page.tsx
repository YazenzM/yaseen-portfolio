import fs from 'fs';
import path from 'path';
import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import { baseURL, routes, renderContent } from '@/app/resources';
import TableOfContents from '@/components/about/TableOfContents';
import styles from '@/components/about/about.module.scss'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata(
    {params: {locale}}: { params: { locale: string }}
) {
    const t = await getTranslations();
    const {person, about, social } = renderContent(t);
	const title = about.title;
	const description = about.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/about`,
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

export default function About(
    { params: {locale}}: { params: { locale: string }}
) {
    unstable_setRequestLocale(locale);
    const t = useTranslations();
    const {person, about, social, work } = renderContent(t);
    // Only show the download button once the PDF has been added to /public
    const resumeAvailable = about.resume.display
        && fs.existsSync(path.join(process.cwd(), 'public', about.resume.file));
    const structure = [
        {
            title: about.intro.title,
            display: about.intro.display,
            items: []
        },
        {
            title: about.studies.title,
            display: about.studies.display,
            items: []
        },
        {
            title: about.technical.title,
            display: about.technical.display,
            items: []
        },
        {
            title: about.work.title,
            display: about.work.display,
            items: about.work.experiences.map(experience => experience.company)
        },
        {
            title: about.projects.title,
            display: about.projects.display,
            items: []
        },
        {
            title: about.additional.title,
            display: about.additional.display,
            items: []
        },
    ]
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
                        '@type': 'Person',
                        name: person.name,
                        jobTitle: person.role,
                        description: about.intro.description,
                        url: `https://${baseURL}/about`,
                        image: `https://${baseURL}${person.avatar}`,
                        sameAs: social
                            .filter((item) => item.link && !item.link.startsWith('mailto:')) // Filter out empty links and email links
                            .map((item) => item.link),
                        worksFor: {
                            '@type': 'Organization',
                            name: about.work.experiences[0].company || ''
                        },
                    }),
                }}
            />
            { about.tableOfContent.display && (
                <Flex
                    style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
                    position="fixed"
                    paddingLeft="24" gap="32"
                    direction="column" hide="s">
                    <TableOfContents
                        structure={structure}
                        about={about} />
                </Flex>
            )}
            <Flex
                fillWidth
                mobileDirection="column" justifyContent="center">
                { about.avatar.display && (
                    <Flex
                        minWidth="160" paddingX="l" paddingBottom="xl" gap="m"
                        flex={3} direction="column" alignItems="center">
                        <Avatar
                            src={person.avatar}
                            size="xl"/>
                        <Flex
                            gap="8"
                            alignItems="center">
                            <Icon
                                onBackground="accent-weak"
                                name="globe"/>
                            {person.city}
                        </Flex>
                        { person.languages.length > 0 && (
                            <Flex
                                wrap
                                gap="8">
                                {person.languages.map((language, index) => (
                                    <Tag
                                        key={index}
                                        size="l">
                                        {language}
                                    </Tag>
                                ))}
                            </Flex>
                        )}
                    </Flex>
                )}
                <Flex
                    className={styles.blockAlign}
                    fillWidth flex={9} maxWidth={40} direction="column">
                    <Flex
                        id={about.intro.title}
                        fillWidth minHeight="160"
                        direction="column" justifyContent="center"
                        marginBottom="32">
                        {about.calendar.display && (
                            <Flex
                                className={styles.blockAlign}
                                style={{
                                    backdropFilter: 'blur(var(--static-space-1))',
                                    border: '1px solid var(--brand-alpha-medium)',
                                    width: 'fit-content'
                                }}
                                alpha="brand-weak" radius="full"
                                fillWidth padding="4" gap="8" marginBottom="m"
                                alignItems="center">
                                <Flex paddingLeft="12">
                                    <Icon
                                        name="calendar"
                                        onBackground="brand-weak"/>
                                </Flex>
                                <Flex
                                    paddingX="8">
                                    Schedule a call
                                </Flex>
                                <IconButton
                                    href={about.calendar.link}
                                    data-border="rounded"
                                    variant="tertiary"
                                    icon="chevronRight"/>
                            </Flex>
                        )}
                        <Heading
                            className={styles.textAlign}
                            variant="display-strong-xl">
                            {person.name}
                        </Heading>
                        <Text
                            className={styles.textAlign}
                            variant="display-default-xs"
                            onBackground="neutral-weak">
                            {person.role}
                        </Text>
                        {(resumeAvailable || social.length > 0) && (
                            <Flex
                                className={styles.blockAlign}
                                paddingTop="20" paddingBottom="8" gap="8" wrap>
                                {resumeAvailable && (
                                    <Button
                                        href={about.resume.file}
                                        target="_blank"
                                        rel="noopener"
                                        prefixIcon="download"
                                        label={about.resume.label}
                                        size="s"
                                        variant="primary"/>
                                )}
                                {social.map((item) => (
                                    item.link && (
                                        <Button
                                            key={item.name}
                                            href={item.link}
                                            prefixIcon={item.icon}
                                            label={item.name}
                                            size="s"
                                            variant="tertiary"/>
                                    )
                                ))}
                            </Flex>
                        )}
                    </Flex>

                    { about.intro.display && (
                        <Flex
                            direction="column"
                            textVariant="body-default-l"
                            fillWidth gap="m" marginBottom="xl">
                            {about.intro.description}
                        </Flex>
                    )}

                    { about.studies.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.studies.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                {about.studies.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40">
                                {about.studies.institutions.map((institution, index) => (
                                    <Flex
                                        key={`${institution.name}-${index}`}
                                        fillWidth gap="4"
                                        direction="column">
                                        <Flex
                                            fillWidth gap="4"
                                            mobileDirection="column"
                                            justifyContent="space-between"
                                            alignItems="baseline"
                                            marginBottom="4">
                                            <Text
                                                id={institution.name}
                                                variant="heading-strong-l">
                                                {institution.name}
                                            </Text>
                                            <Text
                                                variant="heading-default-xs"
                                                onBackground="neutral-weak">
                                                {institution.timeframe}
                                            </Text>
                                        </Flex>

                                        <Text
                                            variant="heading-default-xs"
                                            onBackground="neutral-weak">
                                            {institution.description}
                                        </Text>
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    { about.technical.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.technical.title}
                                variant="display-strong-s" marginBottom="40">
                                {about.technical.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40">
                                {about.technical.skills.map((skill, index) => (
                                    <Flex
                                        key={`${skill}-${index}`}
                                        fillWidth gap="4"
                                        direction="column">
                                        <Text
                                            variant="heading-strong-l">
                                            {skill.title}
                                        </Text>
                                        <Text
                                            variant="body-default-m"
                                            onBackground="neutral-weak">
                                            {skill.description}
                                        </Text>
                                        {skill.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" gap="12"
                                                wrap>
                                                {skill.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    { about.work.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.work.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                {about.work.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40">
                                {about.work.experiences.map((experience, index) => (
                                    <Flex
                                        key={`${experience.company}-${experience.role}-${index}`}
                                        fillWidth
                                        direction="column">
                                        <Flex
                                            fillWidth gap="4"
                                            mobileDirection="column"
                                            justifyContent="space-between"
                                            alignItems="baseline"
                                            marginBottom="4">
                                            <Text
                                                id={experience.company}
                                                variant="heading-strong-l">
                                                {experience.company}
                                            </Text>
                                            <Text
                                                variant="heading-default-xs"
                                                onBackground="neutral-weak">
                                                {experience.timeframe}
                                            </Text>
                                        </Flex>
                                        <Text
                                            variant="body-default-s"
                                            onBackground="brand-weak"
                                            marginBottom="m">
                                            {experience.role}
                                        </Text>
                                        <Flex
                                            as="ul"
                                            direction="column" gap="16">
                                            {experience.achievements.map((achievement: string, index: any) => (
                                                <Text
                                                    as="li"
                                                    variant="body-default-m"
                                                    key={`${experience.company}-${index}`}>
                                                    {achievement}
                                                </Text>
                                            ))}
                                        </Flex>
                                        {experience.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" paddingLeft="40"
                                                wrap>
                                                {experience.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    { about.projects.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.projects.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                {about.projects.title}
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l" marginBottom="40">
                                {about.projects.items.map((project, index) => {
                                    // Link to the full project page when one exists for this title
                                    const projectPage = routes['/work']
                                        && work.projects.find((item) => item.title === project.title);
                                    return (
                                    <Flex
                                        key={`${project.title}-${index}`}
                                        fillWidth
                                        direction="column">
                                        <Flex
                                            fillWidth gap="4"
                                            mobileDirection="column"
                                            justifyContent="space-between"
                                            alignItems="baseline"
                                            marginBottom="4">
                                            <Text
                                                id={project.title}
                                                variant="heading-strong-l">
                                                {project.title}
                                            </Text>
                                            {project.timeframe && (
                                                <Text
                                                    variant="heading-default-xs"
                                                    onBackground="neutral-weak">
                                                    {project.timeframe}
                                                </Text>
                                            )}
                                        </Flex>
                                        <Text
                                            variant="body-default-s"
                                            onBackground="brand-weak"
                                            marginBottom="m">
                                            {project.stack}
                                        </Text>
                                        <Flex
                                            as="ul"
                                            direction="column" gap="16">
                                            {project.bullets.map((bullet: string, index: number) => (
                                                <Text
                                                    as="li"
                                                    variant="body-default-m"
                                                    key={`${project.title}-${index}`}>
                                                    {bullet}
                                                </Text>
                                            ))}
                                        </Flex>
                                        {projectPage && (
                                            <SmartLink
                                                suffixIcon="chevronRight"
                                                style={{margin: '0', marginTop: 'var(--static-space-16)', width: 'fit-content'}}
                                                href={`/${locale}/work/${projectPage.slug}`}>
                                                <Text
                                                    variant="body-default-s">
                                                    View full project
                                                </Text>
                                            </SmartLink>
                                        )}
                                    </Flex>
                                    );
                                })}
                            </Flex>
                        </>
                    )}

                    { about.additional.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.additional.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                {about.additional.title}
                            </Heading>
                            <Text
                                variant="body-default-m">
                                {about.additional.description}
                            </Text>
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}
