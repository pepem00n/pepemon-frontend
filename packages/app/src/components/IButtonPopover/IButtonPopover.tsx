import React from "react";
import styled from "styled-components";
import { ibutton, cross } from "../../assets";
import { theme } from "../../theme";
import { Spacer, Text, Title } from "../../components";

type ModalProps = {
	apy: number;
	isOpen: boolean;
	heading: string;
	toggle: () => void;
	cursor?: string,
	button?: React.ReactNode;
	ppdexPrice: number
};

interface DataProps {
	key: number,
	title: string,
	roi: string,
	ppdexPer1kUSD: string
}

const TableRow: React.FC<DataProps> = ({title, roi, ppdexPer1kUSD}) => {
	return (
		<tr>
			<td style={{ paddingLeft: "0px" }}>{title}</td>
			<td>{roi}%</td>
			<td>{ppdexPer1kUSD}</td>
		</tr>
	)
}

const IButtonPopover: React.FC<ModalProps> = ({ apy, isOpen, heading, toggle, cursor = 'pointer', button, ppdexPrice}) => {
	// const ppdexPer1kUSD = 1000*roi_1d/ppdexPrice
	const data = [
		{
			title: '1d',
			roi: (apy/365).toFixed(2),
			ppdexPer1kUSD: (1000*(apy/365)/ppdexPrice).toFixed(2),
		},
		{
			title: '7d',
			roi: (apy/365*7).toFixed(2),
			ppdexPer1kUSD: (1000*(apy/365*7)/ppdexPrice).toFixed(2),
		},
		{
			title: '30d',
			roi: (apy/365*30).toFixed(2),
			ppdexPer1kUSD: (1000*(apy/365*30)/ppdexPrice).toFixed(2),
		},
		{
			title: '365d(APY)',
			roi: (apy).toFixed(2),
			ppdexPer1kUSD: (1000*(apy)/ppdexPrice).toFixed(2),
		},
	];

  return (
	<div>
		<ImgButton aria-label="show APY informations" cursor={cursor}><img height="18px" width="18px" src={ibutton} alt="info" onClick={toggle}/></ImgButton>
		<Modal isOpen={isOpen}>
			<ModalContainer>
			<ModalHeader>
				<Title as="h1" size='xxs' align="center" font={theme.font.inter} color={theme.color.purple[600]} weight="bold">{heading}</Title>
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
							{data.map((set, key) => {
								return <TableRow key={key} {...set}/>
							})}
						</tbody>
					</Table>
					<Spacer size="sm"/>

					<Text as="p" size='xs' lineHeight={1.33}>
						Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
					</Text>
					<Spacer size="sm"/>
						<Text as="p" size='xs' lineHeight={1.33}>
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
})<{absolute?: boolean, cursor?: string}>`
	background: unset;
	border: none;
	cursor: ${props => props.cursor ? props.cursor : 'pointer'};
	padding: 0;
	display: flex;

	${({absolute}) => absolute && `
		position: absolute;
		right: 0;
		top: -3px;
	`}

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
	}
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

export default IButtonPopover;
