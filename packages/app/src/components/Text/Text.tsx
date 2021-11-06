import styled from 'styled-components/macro';
import { theme } from '../../theme';

interface StyledTextProps {
	as?: 'div' | 'p' | 'span' | 'b' | 'strong' | 'mark';
	align?: string;
	color?: string;
	font?: string;
	lineHeight?: number;
	size?: number;
	spacing?: number;
	txtTransform?: string;
	underline?: boolean;
	weight?: number | string;
}

const Text = styled.div<StyledTextProps>`
	color: ${props => props.color ? props.color : props.theme.color.headers};
	font-family: ${props => props.font && props.font};
	font-size: ${props => props.size && props.size}rem;
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
			background-color: ${color ? "currentColor" : theme.color.purple[600]};
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
