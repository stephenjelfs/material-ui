import React from 'react';
import StylePropable from './mixins/style-propable';
import TextField from './text-field';
import DropDownMenu from './drop-down-menu';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import ContextPure from './mixins/context-pure';

const SelectField = React.createClass({

  mixins: [
    StylePropable,
    ContextPure,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  statics: {
    getChildrenClasses() {
      return [
        TextField,
        DropDownMenu,
      ];
    },
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    errorStyle: React.PropTypes.object,
    errorText: React.PropTypes.node,
    floatingLabelStyle: React.PropTypes.object,
    floatingLabelText: React.PropTypes.node,
    fullWidth: React.PropTypes.bool,
    hintText: React.PropTypes.node,
    iconStyle: React.PropTypes.object,
    id: React.PropTypes.string,
    inputStyle: React.PropTypes.object,
    labelMember: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    menuItemStyle: React.PropTypes.object,
    menuItems: React.PropTypes.array.isRequired,
    multiLine: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    rows: React.PropTypes.number,
    selectFieldRoot: React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
    style: React.PropTypes.object,
    type: React.PropTypes.string,
    underlineStyle: React.PropTypes.object,
    value: React.PropTypes.any,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getDefaultProps() {
    return {
      fullWidth: false,
      labelMember: 'text',
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    let styles = {
      root: {
        height: 46,
        position: 'relative',
        width: '100%',
        top: 16,
        fontSize: 16,
      },
      label: {
        paddingLeft: 0,
        top: 4,
        width: '100%',
      },
      icon: {
        top: 20,
        right: 0,
      },
      underline: {
        borderTop: 'none',
      },
      input: {},
      error: {},
    };

    if (!this.props.floatingLabelText) {
      styles.label.top = -6;
      styles.icon.top = 11;

      if (this.props.hintText) {
        styles.root.top = -5;
      } else {
        styles.root.top = -8;
      }
    } else {
      styles.error.bottom = -15;
    }

    return styles;
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      labelStyle,
      iconStyle,
      underlineStyle,
      errorStyle,
      selectFieldRoot,
      menuItems,
      disabled,
      floatingLabelText,
      floatingLabelStyle,
      hintText,
      fullWidth,
      errorText,
      onFocus,
      onBlur,
      labelMember,
      ...other,
    } = this.props;

    const textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      floatingLabelStyle: floatingLabelStyle,
      hintText: (!hintText && !floatingLabelText) ? ' ' : hintText,
      fullWidth: fullWidth,
      errorText: errorText,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle),
      onFocus: onFocus,
      onBlur: onBlur,
    };
    const dropDownMenuProps = {
      menuItems: menuItems,
      disabled: disabled,
      style: this.mergeAndPrefix(styles.root, selectFieldRoot),
      labelStyle: this.mergeAndPrefix(styles.label, labelStyle),
      iconStyle: this.mergeAndPrefix(styles.icon, iconStyle),
      underlineStyle: this.mergeAndPrefix(styles.underline, underlineStyle),
      autoWidth: false,
      labelMember: labelMember,
    };

    return (
      <TextField {...textFieldProps}>
        <DropDownMenu {...dropDownMenuProps} {...other} />
      </TextField>
    );
  },
});

export default SelectField;
