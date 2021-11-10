import styled from 'styled-components';
import { theme } from '../../../theme';

export const StyledStoreWrapper = styled.div<{width?: string, itemSelected?: any}>`
    display: 'flex'};
    flex-direction: column;
    color: ${props => props.theme.color.black};

	@media (min-width: ${theme.breakpoints.tabletL}) {
		max-width: ${props => props.width && props.width};
	}

	${props => props.itemSelected && `
		&:first-child::after {
			@media (max-width: ${theme.breakpoints.tabletL}) {
				background-color: ${theme.color.layoutOverlay};
				border-radius: ${theme.borderRadius}px;
				bottom: 0;
				content: '';
				display: inline-block;
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
				z-index: 2;
			}
		}
	`}

    &:last-child:not(:first-child) {
		position: absolute;
		z-index: 2;

		@media (min-width: ${theme.breakpoints.mobileS}) {
			left: 50%;
			max-width: 100%;
			transform: translateX(-50%);
			width: ${theme.breakpoints.mobileS};
		}

		@media (min-width: ${theme.breakpoints.tabletL}) {
			left: 0;
			margin-left: 1em;
			width: unset;
			max-width: unset;
			position: relative;
			transform: translateX(0);
		}
    }
`

export const StyledStoreHeader = styled.div`
    background-color: ${(props) => props.theme.color.purple[800]};
    color:  ${(props) => props.theme.color.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.1em;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`

export const StyledStoreBody = styled.div`
    position: relative;
    background-color: ${props => props.theme.color.white};
    padding: 1.1em;
    border-bottom-left-radius: ${theme.borderRadius}px;;
    border-bottom-right-radius: ${theme.borderRadius}px;
`

export const StyledStoreCardsWrapper = styled.div<{gridCols: number}>`
	display: grid;
	grid-column-gap: 1rem;
	grid-row-gap: 2rem;
	grid-template-columns: repeat(2, 1fr);
	overflow: visible;

	@media (min-width: ${theme.breakpoints.mobile}) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: ${theme.breakpoints.tabletL}) {
		grid-template-columns: repeat(${props => props.gridCols}, 1fr);
	}
`
