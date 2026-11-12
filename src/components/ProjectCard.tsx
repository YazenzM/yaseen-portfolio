import { Button, Flex, Heading, Tag, Text } from "@/once-ui/components";
import { CarouselImage, ImageCarousel } from "@/components/ImageCarousel";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
    href: string;
    title: string;
    date: string;
    stack: string;
    summary: string;
    github: string;
    demoUrl: string;
    featured?: boolean;
    images?: CarouselImage[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    title,
    date,
    stack,
    summary,
    github,
    demoUrl,
    featured = false,
    images = []
}) => {
    const meta = [date, stack].filter(Boolean).join(' · ');

    // A fixed shape keeps cards in the same row lined up
    const carousel = images.length > 0 && (
        <ImageCarousel
            images={images}
            label={`${title} images`}
            aspectRatio="16 / 10"
            sizes="(max-width: 768px) 100vw, 480px"
            href={href}/>
    );

    const details = (
        <>
            {featured && (
                <Flex>
                    <Tag
                        variant="brand"
                        size="m"
                        label="Featured project"/>
                </Flex>
            )}
            <Flex
                direction="column" gap="8">
                <Heading
                    as="h2"
                    wrap="balance"
                    variant={featured ? 'display-strong-xs' : 'heading-strong-l'}>
                    {title}
                </Heading>
                {meta && (
                    <Text
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        {meta}
                    </Text>
                )}
            </Flex>
            {summary && (
                <Text
                    wrap="balance"
                    variant={featured ? 'body-default-l' : 'body-default-m'}
                    onBackground="neutral-medium">
                    {summary}
                </Text>
            )}
            <Flex
                gap="8" wrap
                style={{ marginTop: 'auto' }}>
                <Button
                    href={href}
                    variant={featured ? 'primary' : 'secondary'}
                    size="s"
                    suffixIcon="chevronRight"
                    label="View project"/>
                {demoUrl && (
                    <Button
                        href={demoUrl}
                        variant="secondary"
                        size="s"
                        suffixIcon="arrowUpRight"
                        label="Live demo"/>
                )}
                {github && (
                    <Button
                        href={github}
                        variant="tertiary"
                        size="s"
                        prefixIcon="github"
                        label="GitHub"/>
                )}
            </Flex>
        </>
    );

    const card = {
        fillWidth: true,
        padding: 'l',
        radius: 'l',
        background: 'surface',
        border: featured ? 'brand-medium' : 'neutral-medium',
        borderStyle: 'solid-1',
    } as const;

    // The featured card spans the full width, so its images sit beside the text instead of above it
    if (featured && carousel) {
        return (
            <Flex
                {...card}
                gap="l"
                direction="row" mobileDirection="column">
                <Flex
                    flex={1} gap="m"
                    direction="column">
                    {details}
                </Flex>
                <Flex
                    flex={1}
                    alignItems="center"
                    className={styles.featuredMedia}>
                    {carousel}
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex
            {...card}
            gap="m"
            direction="column">
            {carousel}
            {details}
        </Flex>
    );
};
