import React from "react";
import styled from "styled-components";

interface ProgressBarProps {
	percent: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
	return (
		<Container>
			<Background/>
			<Progress percent={percent}/>
		</Container>
	)
}

const Container = styled.div`
  height: 8px;
  width: 100%;
  position: relative;
`;

const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 2px;
  transition: width 10s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: ${props => props.theme.color.gray[100]};
  width: 100%;
`;

const Progress = styled(BaseBox)<ProgressBarProps>`
	background: ${props => props.theme.color.green[200]};
	width: ${({ percent }) => percent}%;
`;

export default ProgressBar;
