import React, { useRef } from 'react'
import styled from 'styled-components'

const StyledToggleButton = styled.div`
	& input {
		display: none;
		&:checked + label {
			background-color: #003366;
			&::before {
				left: 2em;
			}
		}
	}

	& label {
		background-color: #ff9933;
		border-radius: 2em;
		border: 2px solid var(--text-color);
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 2em;
		position: relative;
		transition: .5s;
		width: 3.75em;

		&::before {
			background: #fff;
			border-radius: 100%;
			content: '';
			display: inline-block;
			height: 1.5em;
			position: absolute;
			left: 0.25em;
			transition: .5s ease-out;
			width: 1.5em;
			z-index: 2;
		}
	}
`

const ToggleButton = ({ className, handleChange }) => (
    <StyledToggleButton className={className}>
		<input id="btn-mode" type="checkbox" onChange={handleChange} />
		<label htmlFor="btn-mode">

		</label>
	</StyledToggleButton>
)

export default ToggleButton