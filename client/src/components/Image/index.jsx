import React from "react";
import PropTypes from "prop-types";

export default function Img(props){
    const {src, alt, className, width, height} = props;
    return (
        <img src={src} alt={alt} className={className} width={width} height={height}/>
    )
}

Img.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
}

Img.defaultProps = {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png",
    alt: 'image name',
    className: '',
    width: 40,
    height: 40,
}