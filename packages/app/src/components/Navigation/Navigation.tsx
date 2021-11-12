import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { isMobile } from 'web3modal';
import { useOutsideClick } from '../../hooks';
import { pepemon, events, home, my_collection, staking, store, subscriptions, logoexpand, MenuIcon } from '../../assets';
import { theme } from '../../theme';

const Navigation = () => {
	const [navLogo, setNavLogo] = useState(pepemon);
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();

	const navRef = useRef(null);
	useOutsideClick(navRef, () => isOpen && setIsOpen(false));

	return (
		<StyledMenuOuterWrapper {...(!isMobile() && { onMouseEnter: () => setNavLogo(logoexpand), onMouseLeave: () => setNavLogo(pepemon) })} ref={navRef}>
			<StyledMenuInnerWrapper isOpen={isOpen}>
				<StyledLogoWrapper>
					<StyledMenuIcon onClick={() => setIsOpen(!isOpen)}>
						<MenuIcon isOpen={isOpen}/>
					</StyledMenuIcon>
					<StyledLogoLink to="/">
						<img src={navLogo} alt="logo" />
					</StyledLogoLink>
				</StyledLogoWrapper>

				<StyledMenuList isOpen={isOpen}>
					<StyledMenuListItem onClick={() => setIsOpen(false)} isActive={ pathname === "/" && true }>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ home } alt="home" />
							<span>Home</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem onClick={() => setIsOpen(false)} isActive={ pathname.startsWith("/staking") && true }>
						<StyledLink to="/staking">
							<StyledLinkIcon loading="lazy" src={ staking } alt="staking" />
							<span>Staking</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem onClick={() => setIsOpen(false)} isActive={ pathname.startsWith("/subscription") && true }>
						<StyledLink to="/subscription">
							<StyledLinkIcon loading="lazy" src={ subscriptions } alt="subscriptions" />
							<span>Subscription</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem onClick={() => setIsOpen(false)} isActive={ pathname.startsWith("/store") && true }>
						<StyledLink to="/store">
							<StyledLinkIcon loading="lazy" src={ store } alt="store" />
							<span>Store</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem soon isActive={false}>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ my_collection } alt="my collection" />
							<span>My Collection</span>
						</StyledLink>
					</StyledMenuListItem>
					<StyledMenuListItem soon isActive={false}>
						<StyledLink to="/">
							<StyledLinkIcon loading="lazy" src={ events } alt="events" />
							<span>Events</span>
						</StyledLink>
					</StyledMenuListItem>
				</StyledMenuList>
			</StyledMenuInnerWrapper>
		</StyledMenuOuterWrapper>
	);
}

const StyledLogoWrapper = styled.div`
	align-self: flex-start;
	align-items: center;
	display: flex;
	height: ${theme.topBarSize}px;
	right: -100%;
	position: relative;

	@media (min-width: ${theme.breakpoints.desktop}) {
		right: 0;
		margin-bottom: 2em;
		margin-top: 2em;
	}
`

const StyledMenuInnerWrapper = styled.div<{isOpen: boolean}>`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100vh;
	transform: translateX(-100%);
	transition: transform .2s cubic-bezier(.04,.8,.61,.89);
	max-width: ${theme.sideBar.width.opened}px;

	@media (min-width: ${theme.breakpoints.desktop}) {
		background-color: ${theme.color.white};
		transform: translateX(0);
	}

	${({isOpen}) => isOpen && `
		transform: translateX(0);

		${StyledLogoWrapper} {
			right: 0;
		}
	`}
`
const StyledMenuList = styled.ul<{isOpen: boolean}>`
	align-items: center;
	background-color: ${theme.color.white};
	display: flex;
	flex-direction: column;
	height: 100%;
	list-style-type: none;
	margin-bottom: 0;
	margin-top: 0;
	padding-left: 1em;
	width: 100%;

	@media (min-width: ${theme.breakpoints.desktop}) {
		padding-left: 2em;
	}
`

interface StyledLinkProps {
	isActive?: boolean;
	soon?: boolean;
}

const StyledLink = styled(Link)<StyledLinkProps>`
	align-items: flex-start;
	display: flex;
	justify-content: flex-start;
	margin-bottom: 1.6em;
	margin-top: 1.6em;
	overflow: hidde;
	text-decoration: none;

	@media (min-width: ${theme.breakpoints.desktop}) {
		align-items: center;
	}

	span {
		flex: 1 0 auto;
		font-size: 1.25rem;
		margin-left: 1em;
		padding-right: 1em;
		position: relative;

		@media (min-width: ${theme.breakpoints.desktop}) {
			opacity: 0;
			padding-right: 1.9em;
			transform: translateX(-100%);
			transition: all .4s cubic-bezier(.04,.8,.61,.89);
		}
	}
`

const StyledMenuListItem = styled.li<StyledLinkProps>`
	overflow: hidden;
	width: 100%;

	${StyledLink} {
		color: ${props => props.isActive ? theme.color.layoutPrimary : theme.color.layoutOverlay};
		pointer-events: ${props => props.soon && "none"};

		img {
			opacity: ${props => props.isActive ? 1 : 0.6};
		}

		span {
			${({soon}) => soon && `
				&::after {
					background-image: linear-gradient(to bottom, #aa6cd6 -100%, #713aac);
					border-radius: 8px;
					padding: 3px 5px;
					color: ${theme.color.white};
					content: "soon";
					font-family: "Inter";
					font-size: .7rem;
					opacity: 2;
					position: absolute;
					right: 2em;
					top: -1.7em;
				}
			`}
		}
	}
`

const StyledMenuIcon = styled.button`
	background-color: transparent;
	border: none;
	padding-left: 1em;
	padding-right: 1em;

	@media (min-width: ${theme.breakpoints.desktop}) {
		display: none;
	}
`

const StyledLogoLink = styled(StyledLink)<StyledLinkProps>`
	align-items: center;
	height: ${theme.topBarSize}px;
	margin-bottom: 0;
	margin-top: 0;

	img {
		width: 40px;
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${(theme.sideBar.width.closed - 80) / 2}px;
		margin-right: ${(theme.sideBar.width.closed - 80) / 2}px;
		height: 107px;

		img {
			width: 80px;
		}
	}
`

const StyledLinkIcon = styled.img`
	width: ${theme.sideBar.width.closed / 4}px;
	height: ${theme.sideBar.width.closed / 4}px;
	object-fit: contain;
`

const StyledMenuOuterWrapper = styled.div`
	&{
		background-color: ${theme.color.typographyAllTextOnDark};
		box-shadow: 0 4px 8px 0 ${theme.color.iconBackgroundGrey8};
		height: ${theme.topBarSize}px;
		left: 0;
		position: fixed;
		top: 0;
		transition: width .2s cubic-bezier(.04,.8,.61,.89);
		width: 100vw;
		z-index: 30;

		@media (min-width: ${theme.breakpoints.desktop}) {
			box-shadow: none;
			width: ${theme.sideBar.width.closed}px;
		}
	}

	&:hover {
		@media (min-width: ${theme.breakpoints.desktop}) {
			width: ${theme.sideBar.width.opened}px;
			box-shadow: 0 4px 15px 10px ${theme.color.colorsLayoutShadows};

			${StyledLogoLink} {
				margin-left: 2em;

				img {
					width: 200px;
				}
			}

			span {
				opacity: 1;
				transform: translateX(0%);
			}
		}

	}
`

export default Navigation;
