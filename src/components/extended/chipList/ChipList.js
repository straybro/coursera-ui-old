/* eslint-disable no-use-before-define, no-param-reassign, react/no-unused-prop-types */
import React, {PropTypes, Component} from 'react';
import {css, StyleSheet, color, spacing, transition} from 'src/styles/theme';
import _ from 'underscore';
import Chip from './Chip';

const SELECT_ALL_ID = -1;

const idType = [
  PropTypes.string,
  PropTypes.number,
];

class ChipList extends Component {
  static propTypes = {
    htmlAttributes: PropTypes.object,
    alignCenter: PropTypes.bool,
    listData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType(idType).isRequired,
      label: PropTypes.string.isRequired,
      isSelected: PropTypes.bool,
    }).isRequired).isRequired,
    chipAttributes: PropTypes.shape({
      isThemeDark: PropTypes.bool,
      height: PropTypes.number,
      fontSize: PropTypes.string,
    }),
    isThemeDark: PropTypes.bool,
    onSelectChange: PropTypes.func,
    selectAllId: PropTypes.oneOfType(idType),
    selectAllLabel: PropTypes.string,
    showSelectAll: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    htmlAttributes: {},
    listData: [],
    selectAllId: SELECT_ALL_ID,
    selectAllLabel: 'Select All',
    style: {},
  }

  static createLocalState(listData = [], showSelectAll) {
    let newListData = listData;

    // If the list item already has isSelected field, we'll not modify the list
    if (showSelectAll) {
      newListData = listData.map((item) => {
        const itemCopy = item;
        if (!{}.hasOwnProperty.call(itemCopy, 'isSelected')) {
          itemCopy.isSelected = false;
        }
        return itemCopy;
      });
    }
    const isAllSelected = _.every(newListData, item => item.isSelected);
    return {
      listData: newListData,
      isAllSelected,
    };
  }

  constructor(props, context) {
    super(props, context);
    const {listData, showSelectAll} = props;
    // Overwrite isSelected properties
    this.state = ChipList.createLocalState(listData, showSelectAll);
  }

  toggleSelect = (id) => {
    if (id === SELECT_ALL_ID) {
      this.toggleSelectAll();
    } else {
      let newIsSelect = false;
      const newListData = this.state.listData.map((item) => {
        const itemCopy = item;
        if (item.id === id) {
          itemCopy.isSelected = !itemCopy.isSelected;
          newIsSelect = itemCopy.isSelected;
        }
        return itemCopy;
      });
      // If every item is selected or not selected, change the all state
      const isAllSelected = _.every(newListData, ({isSelected}) => isSelected);
      if (isAllSelected) {
        this.setState({ listData: newListData, isAllSelected: true});
      } else {
        this.setState({ listData: newListData, isAllSelected: false});
      }

      if (this.props.onSelectChange) {
        const allSelectedIds = _(newListData)
          .chain()
          .filter(item => !!item.isSelected)
          .pluck('id')
          .value();
        this.props.onSelectChange(id, allSelectedIds, newIsSelect, newListData, isAllSelected);
      }
    }
  }

  toggleSelectAll = () => {
    const newIsAllSelected = !this.state.isAllSelected;
    const newListData = this.state.listData.map((item) => {
      item.isSelected = newIsAllSelected;
      return item;
    });

    this.setState({
      listData: newListData,
      isAllSelected: newIsAllSelected,
    });

    if (this.props.onSelectChange) {
      // default to the first id
      const {listData} = this.props;
      const allSelectedIds = newIsAllSelected ? _(listData).pluck('id') : [];
      const defaultId = allSelectedIds[0];
      this.props.onSelectChange(defaultId, allSelectedIds, newIsAllSelected, newListData);
    }
  }

  getChipsHTML = (listData, chipAttributes) =>
    _(listData).map(({ id, label, isSelected }) =>
      <Chip
        {...chipAttributes}
        key={`Chip~${id}`}
        label={label}
        isSelected={isSelected}
        onClick={() => (this.toggleSelect(id))}
        style={{margin: 8}}
      />
    );

  render() {
    const {
      htmlAttributes,
      style,
      alignCenter,
      chipAttributes,
      isThemeDark,
      selectAllId,
      selectAllLabel,
      showSelectAll,
    } = this.props;

    const dynamicStyles = getStyles({alignCenter});
    const { isAllSelected, listData } = this.state;
    if (isThemeDark) {
      chipAttributes.isThemeDark = isThemeDark;
    }

    return (
      <div {...htmlAttributes} {...css(styles.ChipList)} style={{...dynamicStyles, ...style}}>
        {showSelectAll &&
          <Chip
            {...chipAttributes}
            label={selectAllLabel}
            isSelected={isAllSelected}
            onClick={() => (this.toggleSelectAll(selectAllId))}
            style={{marginBottom: 32}}
          />
        }
        {!showSelectAll && this.getChipsHTML(listData, chipAttributes)}
        {showSelectAll &&
          <div>
            {this.getChipsHTML(listData, chipAttributes)}
          </div>
        }
      </div>
    );
  }
}


function getStyles({alignCenter}) {
  return {
    textAlign: alignCenter ? 'center' : 'left',
  };
}

module.exports = ChipList;

const styles = StyleSheet.create({
  ChipList: {
    transition: transition.easeOut(),
  },
});
