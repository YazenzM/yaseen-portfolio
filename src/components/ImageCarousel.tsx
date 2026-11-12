"use client";

import { KeyboardEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Flex, Icon, IconButton, Text } from "@/once-ui/components";
import styles from "./ImageCarousel.module.scss";

export type CarouselImage = {
    src: string;
    width: number;
    height: number;
    caption: string;
    alt: string;
};

interface ImageCarouselProps {
    images: CarouselImage[];
    // Names the carousel for screen readers, e.g. the project title
    label: string;
    // Shape of the frame; defaults to the first image's shape
    aspectRatio?: string;
    // Passed to next/image so it loads a file sized for the space it fills
    sizes: string;
    // When set (project cards), every slide links here; otherwise a slide opens its full-size file
    href?: string;
    // Show the current image's caption and an "Open full size" link (project pages)
    captions?: boolean;
}

export const ImageCarousel = ({
    images,
    label,
    aspectRatio,
    sizes,
    href,
    captions = false
}: ImageCarouselProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const count = images.length;

    if (count === 0) return null;

    const frame = aspectRatio ?? `${images[0].width} / ${images[0].height}`;
    const current = images[Math.min(index, count - 1)];

    const goTo = (target: number) => {
        const track = trackRef.current;
        if (!track) return;
        const next = (target + count) % count; // wraps from the last image to the first
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    // The scroll position is the source of truth, so swiping and the buttons stay in sync
    const onScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        setIndex(Math.round(track.scrollLeft / track.clientWidth));
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(index + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(index - 1);
        }
    };

    const dots = count > 1 && (
        <Flex alignItems="center">
            {images.map((image, i) => (
                <button
                    key={image.src}
                    type="button"
                    className={styles.dot}
                    aria-label={`Show image ${i + 1} of ${count}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}/>
            ))}
        </Flex>
    );

    return (
        <Flex
            fillWidth gap="8"
            direction="column"
            role="region"
            aria-roledescription="carousel"
            aria-label={label}>
            <div className={styles.frame}>
                <div
                    ref={trackRef}
                    className={styles.track}
                    onScroll={onScroll}
                    onKeyDown={count > 1 ? onKeyDown : undefined}
                    tabIndex={count > 1 ? 0 : undefined}
                    aria-label={count > 1 ? `${label}: use the arrow keys to switch images` : undefined}>
                    {images.map((image, i) => {
                        const picture = (
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes={sizes}
                                className={styles.image}/>
                        );
                        return (
                            <div
                                key={image.src}
                                className={styles.slide}
                                style={{ aspectRatio: frame }}
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${count}`}>
                                {href ? (
                                    <Link href={href} className={styles.link} tabIndex={-1}>
                                        {picture}
                                    </Link>
                                ) : (
                                    <a href={image.src} target="_blank" rel="noreferrer" className={styles.link} tabIndex={-1}>
                                        {picture}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
                {count > 1 && (
                    <>
                        <div className={`${styles.arrow} ${styles.prev}`}>
                            <IconButton
                                icon="chevronLeft"
                                size="s"
                                variant="secondary"
                                aria-label="Previous image"
                                onClick={() => goTo(index - 1)}/>
                        </div>
                        <div className={`${styles.arrow} ${styles.next}`}>
                            <IconButton
                                icon="chevronRight"
                                size="s"
                                variant="secondary"
                                aria-label="Next image"
                                onClick={() => goTo(index + 1)}/>
                        </div>
                    </>
                )}
            </div>
            {captions ? (
                <Flex
                    fillWidth gap="8" wrap
                    justifyContent="space-between" alignItems="center">
                    <Flex
                        gap="8" wrap
                        alignItems="center">
                        {dots}
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak"
                            aria-live="polite">
                            {current.caption}
                        </Text>
                    </Flex>
                    {/* A plain link to the original file, so phones can pinch-zoom the full-resolution image */}
                    <Text
                        variant="body-default-s">
                        <a
                            href={current.src}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--static-space-4)' }}>
                            Open full size
                            <Icon name="arrowUpRight" size="xs"/>
                        </a>
                    </Text>
                </Flex>
            ) : (
                dots && (
                    <Flex fillWidth justifyContent="center">
                        {dots}
                    </Flex>
                )
            )}
        </Flex>
    );
};
