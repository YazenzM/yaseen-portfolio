import { Button, Flex, Heading, Tag, Text } from "@/once-ui/components";

interface ProjectCardProps {
    href: string;
    title: string;
    date: string;
    stack: string;
    summary: string;
    github: string;
    demoUrl: string;
    featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    title,
    date,
    stack,
    summary,
    github,
    demoUrl,
    featured = false
}) => {
    const meta = [date, stack].filter(Boolean).join(' · ');

    return (
        <Flex
            fillWidth gap="m" padding="l"
            radius="l"
            background="surface"
            border={featured ? 'brand-medium' : 'neutral-medium'}
            borderStyle="solid-1"
            direction="column">
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
        </Flex>
    );
};
