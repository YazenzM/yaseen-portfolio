"use client";

import { ReactNode, useId, useRef, useState } from "react";
import classNames from "classnames";

import { Button, Flex } from "@/once-ui/components";
import styles from "./ShowMore.module.scss";

interface ShowMoreProps {
    // How many projects are behind the button, for its label
    count: number;
    children: ReactNode;
}

// Shows a blurred preview of `children` with a button that reveals them.
// The content is always in the HTML (search engines see it); while collapsed it is inert,
// so keyboard and screen reader users skip it just as sighted visitors do.
export const ShowMore = ({ count, children }: ShowMoreProps) => {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const id = useId();

    const expand = () => {
        const content = contentRef.current;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (content && !reduceMotion) {
            // Animate from the preview height to the full height, then drop the limit
            // so the section can still grow or shrink when the window resizes
            content.style.maxHeight = `${content.scrollHeight}px`;
            content.style.overflow = 'hidden';
            const done = (event: TransitionEvent) => {
                if (event.target !== content || event.propertyName !== 'max-height') return;
                content.style.maxHeight = '';
                content.style.overflow = '';
                content.removeEventListener('transitionend', done);
            };
            content.addEventListener('transitionend', done);
        }
        setExpanded(true);
        // The button disappears, so move focus to the revealed projects
        requestAnimationFrame(() => content?.focus({ preventScroll: true }));
    };

    return (
        <Flex
            fillWidth
            direction="column" alignItems="center">
            <div
                id={id}
                ref={contentRef}
                tabIndex={-1}
                className={classNames(styles.content, !expanded && styles.collapsed)}
                aria-hidden={!expanded}
                inert={!expanded}>
                {children}
            </div>
            {!expanded && (
                <div className={styles.button}>
                    <Button
                        variant="secondary"
                        size="m"
                        suffixIcon="chevronDown"
                        aria-expanded={false}
                        aria-controls={id}
                        onClick={expand}
                        label={`Show ${count} more project${count === 1 ? '' : 's'}`}/>
                </div>
            )}
        </Flex>
    );
};
