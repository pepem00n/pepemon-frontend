import React from "react";
import styled from "styled-components";
import { ibutton } from "../../assets";
import { theme } from "../../theme";
import { useModal } from "../../hooks";
import { ExternalLink, Spacer, Text, Title } from "../../components";

export type IButtonPopoverProps = {
	apy: number;
	heading: string;
	cursor?: string,
	button?: { text: string, href: string };
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

const IButtonPopover: React.FC<IButtonPopoverProps> = ({ apy, heading, cursor = 'pointer', button, ppdexPrice}) => {
	// const ppdexPer1kUSD = 1000*roi_1d/ppdexPrice
	const apyPercentage = apy/100;

	const data = [
		{
			title: '1d',
			roi: (apy/365).toFixed(2),
			ppdexPer1kUSD: (1000*(apyPercentage/365)/ppdexPrice).toFixed(2),
		},
		{
			title: '7d',
			roi: (apy/365*7).toFixed(2),
			ppdexPer1kUSD: (1000*(apyPercentage/365*7)/ppdexPrice).toFixed(2),
		},
		{
			title: '30d',
			roi: (apy/365*30).toFixed(2),
			ppdexPer1kUSD: (1000*(apyPercentage/365*30)/ppdexPrice).toFixed(2),
		},
		{
			title: '365d(APY)',
			roi: (apy).toFixed(2),
			ppdexPer1kUSD: (1000*(apyPercentage)/ppdexPrice).toFixed(2),
		},
	];

	const [handlePresent] = useModal({
		title: <Title as="h1" size='xxs' align="center" font={theme.font.inter} color={theme.color.purple[600]} weight="bold">{heading}</Title>,
		content: <>
				<hr/>
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
					All estimated rates take into account this pool’s 2% performance fee.
				</Text>
				<Spacer size='sm'/>
				<ExternalLink size={.75} href={button.href}>{button.text}</ExternalLink>
			</>,
		maxWidth: theme.page.maxWidth/3
	})

	return (
		<div>
			<ImgButton aria-label="show APY informations" cursor={cursor}>
				<img height="18px" width="18px" src={ibutton} alt="info" onClick={handlePresent}/>
			</ImgButton>
		</div>
	);
};

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
