import React from 'react';
import styled, { keyframes } from 'styled-components';
import { walk1, walk2, walk3 } from '../../assets';
import { Title } from '../../components';
import { theme } from '../../theme';

interface LoadingProps {
	text?: string;
}

const Loading = ({text}: {text?: string|undefined}) => {
	return (
		<StyledLoading>
			{ text &&
				<Title as="h1" size='l' font={theme.font.inter} weight="900">{text}</Title>
			}
			<AnimatedImg1 src={walk1} alt="loading"/>
			<AnimatedImg2 src={walk2} alt="loading"/>
			<AnimatedImg3 src={walk3} alt="loading"/>
		</StyledLoading>
	)
}

const StyledLoading = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`

const walkAnim1 = keyframes`
  0% {
    transform: translateX(-50vw);
  }

  100% {
	transform: translateX(50vw);
  }
`;

const walkAnim2 = keyframes`
  0% {
    transform: translateX(0vw);
  }

  100% {
	transform: translateX(50vw);
  }
`;

const walkAnim3 = keyframes`
  0% {
    transform: translateX(-75vw);
  }

  100% {
	transform: translateX(75vw);
  }
`;

const AnimatedImg1 = styled.img`
	animation: ${walkAnim1} 4s linear infinite;
`

const AnimatedImg2 = styled.img`
	animation: ${walkAnim2} 4s linear infinite;
`

const AnimatedImg3 = styled.img`
	animation: ${walkAnim3} 4s linear infinite;
`

export default Loading;
