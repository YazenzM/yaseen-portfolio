import { Flex, Grid } from '@/once-ui/components';
import { renderContent } from '@/app/resources';
import { useTranslations } from 'next-intl';

import { ProjectCard } from '@/components';
import { ShowMore } from '@/components/work/ShowMore';

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

    // Cards after the first `visibleProjects` sit behind the "Show more" button
    const visibleCount = work.visibleProjects ?? otherProjects.length;
    const shownProjects = otherProjects.slice(0, visibleCount);
    const hiddenProjects = otherProjects.slice(visibleCount);

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
            featured={project.featured}
            images={project.images}/>
    );

    const renderGrid = (projects: typeof otherProjects) => (
        <Grid
            fillWidth gap="l"
            columns="repeat(2, 1fr)" mobileColumns="1col">
            {projects.map(renderCard)}
        </Grid>
    );

    return (
        <Flex
            fillWidth gap="l" marginBottom="40" paddingX="l"
            direction="column">
            {featuredProjects.map(renderCard)}
            {shownProjects.length > 0 && renderGrid(shownProjects)}
            {hiddenProjects.length > 0 && (
                <ShowMore count={hiddenProjects.length}>
                    {renderGrid(hiddenProjects)}
                </ShowMore>
            )}
        </Flex>
    );
}
