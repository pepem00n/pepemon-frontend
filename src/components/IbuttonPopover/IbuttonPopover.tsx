import styled from "styled-components";
import { ibutton, cross } from "../../assets";
import { theme } from "../../theme";
import { Spacer, Text, Title } from "../../components";

type ModalProps = {
	isOpen: boolean;
	heading: string;
	toggle: () => void;
	button?: React.ReactNode;
};

const IbuttonPopover: React.FC<ModalProps> = ({ isOpen, heading, toggle, button}) => {
  return (
	<div>
		<ImgButton aria-label="show APY informations"><img height="18px" width="18px" src={ibutton} alt="info" onClick={toggle}/></ImgButton>
		<Modal isOpen={isOpen}>
			<ModalContainer>
			<ModalHeader>
				<Title as="h1" align="center" font={theme.font.inter} size={1} color={theme.color.purple[600]} weight="bold">{heading}</Title>
				<ImgButton absolute aria-label="close"><img src={cross} alt="close" onClick={toggle}/></ImgButton>
			</ModalHeader>
					<Table>
						<thead>
							<tr>
								<th style={{ paddingLeft: "0px" }}>Timeframe</th>
								<th>ROI</th>
								<th>PPDEX per $1,000</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{ paddingLeft: "0px" }}>1d</td>
								<td>0.23%</td>
								<td>0.14</td>
							</tr>
							<tr>
								<td style={{ paddingLeft: "0px" }}>7d</td>
								<td>1.54%</td>
								<td>0.99</td>
							</tr>
							<tr>
								<td style={{ paddingLeft: "0px" }}>30d</td>
								<td>5.45%</td>
								<td>4.85</td>
							</tr>
							<tr>
								<td style={{ paddingLeft: "0px" }}>365d(APY)</td>
								<td>87%</td>
								<td>80.38</td>
							</tr>
						</tbody>
					</Table>
					<Spacer size="sm"/>

					<Text as="p" size={.75} lineHeight={1.33}>
						Calculated based on current rates. Compounding 288x daily. Rates are
						estimates provided for your convenience only, and by no means represent
						guaranteed returns.
					</Text>
					<Spacer size="sm"/>
						<Text as="p" size={.75} lineHeight={1.33}>
							All estimated rates take into account this pool’s 2% performance fee
						</Text>
						{button && <><Spacer size="sm"/>
							{button}
						</>}
				</ModalContainer>
			</Modal>
		</div>
	);
};

const Modal = styled.div<{isOpen?: boolean}>`
	background-color: ${theme.color.layoutOverlay};
	display: ${props => props.isOpen ? "block" : "none"};
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 9999;
`

const ModalContainer = styled.div`
	background-color: ${theme.color.white};
	border-radius: 1.5em;
	max-width: 90vw;
	padding: 1.5em;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	width: ${theme.page.maxWidth/3}px;
`

const ModalHeader = styled.div`
	border-bottom: 1px solid ${theme.color.colorsTypographyLightParagraphs};
	padding-bottom: 1em;
	position: relative;
`

const ImgButton = styled.button.attrs({
	type: "button"
})<{absolute?: boolean}>`
	background: unset;
	border: none;
	cursor: pointer;
	padding: 0;
	display: flex;

	${({absolute}) => absolute && `
		position: absolute;
		right: 0;
		top: -3px;
	`}
`

const Table = styled.table`
	width: 100%;

	th, td {
		font-family: ${theme.font.inter};
		font-size: .625rem;
		padding-bottom: .5em;
		padding-top: .5em;
	}

	th {
		color: ${theme.color.gray[400]};
		font-weight: normal;
		letter-spacing: 1px;
		text-align: left;
	}

	td {
		color: ${theme.color.headers};
		font-weight: bold;
	}
`

export default IbuttonPopover;
