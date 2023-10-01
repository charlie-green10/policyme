import React from 'react';
import styled from 'styled-components';



export const Button = ({
    label,
    onClick
}) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    );
}