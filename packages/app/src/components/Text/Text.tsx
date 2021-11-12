import styled from 'styled-components';
import { theme } from '../../theme';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'inherit';

interface StyledTextProps {
	as?: 'div' | 'p' | 'span' | 'b' | 'strong' | 'mark';
	align?: string;
	color?: string;
	font?: string;
	lineHeight?: number;
	size?: Size;
	spacing?: number;
	txtTransform?: string;
	underline?: boolean;
	weight?: number | string;
}

const getSize = (size) : string => {
	switch (size) {
		case 'xs':
			return 'clamp(.7rem, 1vw, .75rem)';
		case 's':
			return 'clamp(.75rem, 1.1vw, .875rem)';
		case 'l':
			return 'clamp(1.1rem, 1.8vw, 1.375rem)';
		case 'xl':
			return 'clamp(1.8rem, 3rem, 2rem)';
		case 'xxl':
			return 'clamp(2rem, 4vw, 2.5rem)';
		case 'inherit':
			return 'inherit';
		case 'm':
		default:
			return 'clamp(.9rem, 1vw, 1rem)';
	}
}

const Text = styled.div<StyledTextProps>`
	color: ${props => props.color ? props.color : props.theme.color.headers};
	font-family: ${props => props.font && props.font};
	font-size: ${props => props.size && getSize(props.size)};
	font-weight: ${props => props.weight ? props.weight : "normal"};
	text-align: ${props => props.align && props.align};
	text-transform: ${props => props.txtTransform && props.txtTransform};
	letter-spacing: ${props => props.spacing && props.spacing + "px"};
	line-height: ${props => props.lineHeight ? props.lineHeight : 1.5};
	margin-top: 0;
	margin-bottom: 0;

	${({underline, color}) => underline && `
		display: inline-flex;
		flex-direction: column;

		&:after {
			background-color: ${theme.color.purple[600]};
			content: "";
			display: block;
			height: 2px;
			positon: relative;
			width: 100%;
		}
	`}
`

Text.defaultProps = {
	as: 'p'
}

export default Text;
