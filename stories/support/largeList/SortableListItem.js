/* eslint-disable no-use-before-define */
import React, { PropTypes} from 'react';
import {
  css, StyleSheet, cssWithClass, color, spacing, transition, breakPoints, font,
} from 'src/styles/theme';

import NavigationMenu from 'src/components/svg/material/navigation/menu';
import TextTruncate from 'src/components/extended/TextTruncate';
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

const DragHandle = sortableHandle(() =>
  <NavigationMenu color={color.divider} hoverColor={color.divider} />);

const text = 'Leadership Communication for Maximum Impact: Storytelling Storytelling Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, minima.';

const SortableListItem = sortableElement(({
  value, index, useDragHandle, isHorizontal
}) => {
  return (
    <li {...cssWithClass('horizontal-box align-items-vertical-center', styles.SortableListItem)}>
      {!useDragHandle &&
        <div {...cssWithClass('horizontal-box align-items-absolute-center', styles.dragHandleContainer)}>
          <DragHandle />
        </div>
      }
      <span {...css(styles.indexNum)}>{index + 1}</span>
      <div {...cssWithClass('horizontal-box align-items-vertical-center flex-1', styles.itemMain)}>
        <img {...css(styles.image)} src="//placehold.it/100x100/A66506/FFFFFF" alt="CourseraAlt" />
        <div {...cssWithClass('flex-1', styles.titleContainer)}>
          <TextTruncate
            text={text}
            line={index % 2 === 0 ? 1 : 4}
            truncateText={'...'}
          />
        </div>
        <span className="text-muted font-xs">{value}</span>
        <span {...cssWithClass('text-muted font-sm', styles.courseNumberSpan)}>1 Course</span>
      </div>
    </li>
  );
});

module.exports = SortableListItem;


const styles = StyleSheet.create({
  SortableListItem: {
    padding: spacing.md,
    position: 'relative',
    backgroundColor: color.white,
    outline: `1px solid ${color.divider}`,
    userSelect: 'none',
    minHeight: '2rem',
  },
  dragHandleContainer: {
    [`@media (max-width: ${breakPoints.sm}px)`]: {
      paddingRight: spacing.md,
    },
  },
  indexNum: {
    display: 'inline-block',
    marginLeft: spacing.md,
    marginRight: spacing.md,
    [`@media (max-width: ${breakPoints.sm}px)`]: {
      display: 'none',
    },
  },
  titleContainer: {
    maxHeight: '6rem',
    lineHeight: '1.5rem',
    fontSize: font.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  image: {
    width: 44,
    height: 44,
  },
  courseNumberSpan: {
    minWidth: 56,
    textAlign: 'right',
  },
});
