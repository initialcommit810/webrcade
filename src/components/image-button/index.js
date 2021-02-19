import React, { Component } from "react";
import { GamepadNotifier } from "../../utils"

require("./style.scss");

export default class ImageButton extends Component {
  constructor() {
    super();

    this.state = {
      focused: false
    };
  }

  gamepadCallback = (e) => {
    const { onPad } = this.props;
    const { focused } = this.state;

    if (!focused) return;

    switch (e.type) {
      case "a":
        this.onClick();
        break;
      case "down":
      case "up":
      case "left":
      case "right":
        if (onPad) onPad(e);
        break;        
      default: 
        break;
    }
    return true;
  }

  componentDidMount() {
    GamepadNotifier.instance.addCallback(this.gamepadCallback);
  }

  componentWillUnmount() {
    GamepadNotifier.instance.removeListener(this.gamepadCallback);
  }

  onClick = (e) => {
    const { onClick } = this.props;
    console.log('PLAY');
    if (onClick) onClick();
  }

  onFocus = () => {
    this.setState({ focused: true });
  }

  onBlur = () => {
    this.setState({ focused: false });
  }

  focus() {
    const { focused } = this.state;
    const { button } = this;
    if (!focused && button) {
      button.focus();
      return true;
    }
    return false;
  }

  render() {
    const { label, imgSrc, hoverImgSrc } = this.props;
    const { focused } = this.state;
    return (
      <button
        className="image-button"
        ref={(button) => { this.button = button; }}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}>
        <img alt={label} src={focused && hoverImgSrc ? hoverImgSrc : imgSrc}></img>
        <div>{label}</div>
      </button>
    );
  }
};