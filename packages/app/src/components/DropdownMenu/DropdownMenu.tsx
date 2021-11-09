import React, { useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';
import { Check, ChevronDown } from '../../assets';
import styled from 'styled-components/macro'
import { theme } from '../../theme';

interface DropdownMenuProps {
	title: string,
	options: {
		title: string,
		onClick: () => void,
	}[]
	style?: any;
}

const DropdownMenu: React.FC<any> = ({ title, options, activeOptions, style, setActiveSeries}) => {
	const dropdownRef = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const toggleDropdown = () => setIsActive(!isActive);

	useOutsideClick(dropdownRef, () => {
		if (isActive) {
			setIsActive(!isActive);
		}
	})

	// const editedTitle = () => {
	// 	if (activeOptions.length === options.length) { return 'all' }
	// 	else if (activeOptions.length !== 1) { return `${activeOptions.length} selected` }
	// 	else { return activeOptions[0].title };
	// }

	return (
		<StyledMenuContainer>
			<StyledMenuTrigger onClick={toggleDropdown} width={style ? style.width : null} bgColor={style ? style.bgColor : null}>
				<span>{activeOptions.title}</span>
				<ChevronDown/>
			</StyledMenuTrigger>
			<StyledMenu active={isActive} ref={dropdownRef}>
				{(options.length > 1 || (options.length === 1 && title !== options[0].title)) &&
					<StyledList>
						{options.map((option, key) => {
							// const index = activeOptions.findIndex(serie => serie.title === option.title);
							const isActive = activeOptions.title === option.title;
							return (
								<StyledListItem key={key} active={isActive}>
									<StyledListItemLink
										onClick={() => { option.onClick(); setIsActive(false); }}>
										{isActive && <Check/> } {option.title}
									</StyledListItemLink>
								</StyledListItem>
							)
						})}
					</StyledList>
				}
			</StyledMenu>
		</StyledMenuContainer>
	);
};

interface StyledMenuProps {
	active: boolean
}

interface StyledProps {
	width?: string;
	bgColor?: string;
}

const StyledMenuContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	position: relative;
`


const StyledMenuTrigger = styled.button<StyledProps>`
	background: ${(props) => props.bgColor ? props.bgColor : props.theme.color.white};
	border-radius: 1em;
	color: ${props => props.theme.color.purple[600]};
	cursor: pointer;
	display: flex;
	font-family: ${props => props.theme.font.spaceMace};
	font-size: 0.625rem;
	justify-content: center;
	align-items: center;
	padding: .8em 1.2em;
	text-align: center;
	text-transform: uppercase;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0);
	border: 2px solid ${props => props.theme.color.purple[600]};
	vertical-align: middle;
	transition: box-shadow 0.4s ease;

	&:hover {
	   box-shadow: 0 1px 8px ${theme.color.colorsLayoutShadows};
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
	}

	svg {
		height: 1em;
		width: 1em;
		margin-left: .7em
	}
`


const StyledMenu = styled.div<StyledMenuProps>`
  z-index: 99;
  background: ${(props) => props.theme.color.white};
  position: absolute;
  top: 3.5em;
  right: 0;
  opacity: ${(props) => props.active ? 1 : 0};
  visibility: ${(props) => props.active ? 'visible' : 'hidden'};
  transform: ${(props) => props.active ? 'translateY(0)' : 'translateY(-20px)'};
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  font-size: 1rem;
  border-radius: 1em;
  box-shadow: 0 4px 8px 0 ${theme.color.colorsLayoutShadows};
  border: solid 1px ${props => props.theme.color.purple[600]};
  width: 18.75em;

  &:before {
	  content: "";
	  display: inline-block;
	  background-color: ${props => props.theme.color.white};
	  height: 1em;
	  width: 1em;
	  transform: rotate(45deg) translateY(-50%);
	  position: absolute;
	  right: 2.5em;
	  border-color: ${props => props.theme.color.purple[600]};
	  transform-origin: top;
	  border-left-style: solid;
	  border-top-style: solid;
	  border-top-width: 1px;
	  border-left-width: 1px;
`

const StyledList = styled.ul`
  list-style: none;
  padding: 1em 2.75em;
  margin: 0;
  position: relative;
`

const StyledListItem = styled.li<{active?: boolean}>`
	color: ${props => props.active ? theme.color.purple[600] : theme.color.gray[500]};
	font-weight: ${props => props.active && 'bold'};
`

const StyledListItemLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: currentColor;
  padding: .5em 0;
  display: flex;
  align-items: center;

  &:hover {
	  color: ${props => props.theme.color.purple[600]};
  }

  svg {
	  left: 1em;
	  height: 1em;
	  width: 1em;
	  position: absolute;
  }

  &.active {
	  color: ${props => props.theme.color.purple[600]};
	  font-weight: bold;
  }
`

export default DropdownMenu
