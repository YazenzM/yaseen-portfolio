import { Flex, Grid } from '@/once-ui/components';
import { renderContent } from '@/app/resources';
import { useTranslations } from 'next-intl';

import { ProjectCard } from '@/components';

interface ProjectsProps {
    range?: [number, number?];
    locale: string;
}

export function Projects({ range, locale }: ProjectsProps) {
    const t = useTranslations();
    const { work } = renderContent(t);

    const displayedProjects = range
        ? work.projects.slice(range[0] - 1, range[1] ?? work.projects.length)
        : work.projects;

    const featuredProjects = displayedProjects.filter((project) => project.featured);
    const otherProjects = displayedProjects.filter((project) => !project.featured);

    const renderCard = (project: typeof displayedProjects[number]) => (
        <ProjectCard
            key={project.slug}
            href={`/${locale}/work/${project.slug}`}
            title={project.title}
            date={project.date}
            stack={project.stack}
            summary={project.summary}
            github={project.github}
            demoUrl={project.demoUrl}
            featured={project.featured}/>
    );

    return (
        <Flex
            fillWidth gap="l" marginBottom="40" paddingX="l"
            direction="column">
            {featuredProjects.map(renderCard)}
            {otherProjects.length > 0 && (
                <Grid
                    fillWidth gap="l"
                    columns="repeat(2, 1fr)" mobileColumns="1col">
                    {otherProjects.map(renderCard)}
                </Grid>
            )}
        </Flex>
    );
}
