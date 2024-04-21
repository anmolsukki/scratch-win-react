import React, { Component } from 'react';

class ScratchCard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, finished: false };

    this.isDrawing = false;
    this.lastPoint = null;
    this.isFinished = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    this.isDrawing = false;
    this.lastPoint = null;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.image = new Image();
    this.image.crossOrigin = 'Anonymous';
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.props.width, this.props.height);
      this.setState({ loaded: true });
    };
    this.image.src = this.props.image;

    if (this.props.customBrush) {
      this.brushImage = new Image(this.props.customBrush.width, this.props.customBrush.height);
      this.brushImage.src = this.props.customBrush.image;
    }
  }

  reset() {
    this.canvas.style.opacity = '1';
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.drawImage(this.image, 0, 0, this.props.width, this.props.height);
    this.isFinished = false;
  }

  getFilledInPixels(stride) {
    if (!stride || stride < 1) stride = 1;

    let x = 0;
    let y = 0;
    let width = this.canvas.width;
    let height = this.canvas.height;

    if (this.props.customCheckZone) {
      x = this.props.customCheckZone.x;
      y = this.props.customCheckZone.y;
      width = this.props.customCheckZone.width;
      height = this.props.customCheckZone.height;
    }

    const pixels = this.ctx.getImageData(x, y, width, height);
    const total = pixels.data.length / stride;
    let count = 0;

    for (let i = 0; i < pixels.data.length; i += stride) {
      if (parseInt(pixels.data[i], 10) === 0) count++;
    }

    return Math.round((count / total) * 100);
  }

  getMouse(e, canvas) {
    const { top, left } = canvas.getBoundingClientRect();

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    let x = 0;
    let y = 0;

    if (e && e.pageX && e.pageY) {
      x = e.pageX - left - scrollLeft;
      y = e.pageY - top - scrollTop;
    } else if (e && e.touches) {
      x = e.touches[0].clientX - left - scrollLeft;
      y = e.touches[0].clientY - top;
    }

    return { x, y };
  }

  distanceBetween(point1, point2) {
    if (point1 && point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    return 0;
  }

  angleBetween(point1, point2) {
    if (point1 && point2) {
      return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    return 0;
  }

  handlePercentage(filledInPixels = 0) {
    if (this.isFinished) return;

    let finishPercent = 70;
    if (this.props.finishPercent !== undefined) finishPercent = this.props.finishPercent;

    if (filledInPixels > finishPercent) {
      if (this.props.fadeOutOnComplete !== false) {
        this.canvas.style.transition = '1s';
        this.canvas.style.opacity = '0';
      }
      this.setState({ finished: true });
      if (this.props.onComplete) this.props.onComplete();
      this.isFinished = true;
    }
  }

  handleMouseDown(e) {
    this.isDrawing = true;
    this.lastPoint = this.getMouse(e, this.canvas);
  }

  handleMouseMove(e) {
    if (!this.isDrawing) return;

    const currentPoint = this.getMouse(e, this.canvas);
    const distance = this.distanceBetween(this.lastPoint, currentPoint);
    const angle = this.angleBetween(this.lastPoint, currentPoint);

    let x, y;

    for (let i = 0; i < distance; i++) {
      x = this.lastPoint ? this.lastPoint.x + Math.sin(angle) * i : 0;
      y = this.lastPoint ? this.lastPoint.y + Math.cos(angle) * i : 0;
      this.ctx.globalCompositeOperation = 'destination-out';

      if (this.brushImage && this.props.customBrush) this.ctx.drawImage(this.brushImage, x, y, this.props.customBrush.width, this.props.customBrush.height);
      else {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.props.brushSize || 20, 0, 2 * Math.PI, false);
        this.ctx.fill();
      }
    }
    this.lastPoint = currentPoint;
    this.handlePercentage(this.getFilledInPixels(32));
  }

  handleMouseUp() {
    this.isDrawing = false;
  }

  render() {
    const containerStyle = {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      position: 'relative',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
      cursor: this.props?.brushCursor ? this.props.brushCursor : 'arrow',
    };

    const canvasStyle = { position: 'absolute', top: 0, zIndex: 1 };
    const resultStyle = { visibility: this.state.loaded ? 'visible' : 'hidden', width: '100%', height: '100%' };

    return (
      <div className="ScratchCard__Container" style={containerStyle}>
        <canvas
          ref={(ref) => (this.canvas = ref)}
          className="ScratchCard__Canvas"
          style={canvasStyle}
          width={this.props.width}
          height={this.props.height}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onTouchMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onTouchEnd={this.handleMouseUp}
        />
        <div className="ScratchCard__Result" style={resultStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ScratchCard;
