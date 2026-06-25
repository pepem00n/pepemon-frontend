import React from "react";
import styled from "styled-components";
import {
  AnimatedImg,
  ContentCentered,
  ContentColumn,
  ContentColumns,
  Evolve,
  Head,
  Hero,
  Stats,
  Spacer,
  Title,
  Text,
  SocialBoxes,
} from "../../components";
import Balances from "./components/Balances";
import { theme } from "../../theme";
import { useTokenPrices } from "../../hooks";
import { calculatePpblzApy } from "../../utils";
import { cover, coverblack, logoexpand } from "../../assets";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import MintCard from "../../components/MintCard";

const Home: React.FC<any> = () => {
  const { ppblzPrice, ppdexPrice } = useTokenPrices();
  const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);

  return (
    <HomeWrapper bgImage={cover}>
      <Head
        title="Pepemon! Play and earn web3 card game"
        description="Embark on an exhilarating journey with Degen Battleground, a web3 card game built on Pepechain - offering a world of action-packed fun, low fees, and lightning-fast transactions!"
        twitterTitle="Pepemon! Play and earn web3 card game"
        twitterDescription="Embark on an exhilarating journey with Degen Battleground, a web3 card game built on Pepechain - offering a world of action-packed fun, low fees, and lightning-fast transactions!"
      />
      <StyledSection
        desktopStyle={{ paddingTop: "12.125em" }}
        mobileStyle={{
          paddingTop: "3em",
          backgroundColor: theme.color.purple[200],
        }}
      >
        <Hero apy={`${ppblzApy.toFixed(0)}% APY`} />
      </StyledSection>

      <StyledSection
        mobileStyle={{ marginTop: "3.75em", paddingTop: "3.75em" }}
        desktopStyle={{ marginTop: "17em", marginBottom: "7.5em" }}
      >
        <MintCard />
      </StyledSection>

      <LazyLoadComponent threshold={200}>
        <StyledSection
          bgImage={coverblack}
          mobileStyle={{ overflowX: "hidden" }}
          desktopStyle={{ color: theme.color.white, textAlign: "center" }}
        >
          <ContentCentered style={{ paddingTop: "7.5em" }}>
            <Title
              as="h1"
              font={theme.font.neometric}
              size="xxl"
              color="inherit"
              weight={900}
              lineHeight={1.04}
            >
              Start earning
              <br /> before ETH 2.0
            </Title>
            <Spacer size="md" />
            <Text
              as="p"
              font={theme.font.spaceMace}
              align="left"
              color="inherit"
              underline
            >
              Airdropped to the community
            </Text>
            <Spacer size="md" />
            <Text as="p" font={theme.font.inter} color="inherit">
              PPBLZ tokens were 100% airdropped in 2020. No sale of the token
              was ever conducted and there was no 'VC' investment made. Early
              adopters of DeFi and NFTs got PPBLZ airdropped for supporting the
              project early.<br></br>
              <br></br>Since then on avg 80% of PPBLZ supply is earning PPDEX
              used for minting Collector's Edition NFT cards and play the higher
              leagues.
            </Text>
            <Spacer size="md" />

            <Balances />

            <Stats />
          </ContentCentered>
        </StyledSection>
      </LazyLoadComponent>

      <StyledSection
        bgColor={theme.color.purple[200]}
        mobileStyle={{
          paddingTop: "2em",
          paddingBottom: "2em",
          marginBottom: "2em",
        }}
        desktopStyle={{
          paddingTop: "3.75em",
          paddingBottom: "3.75em",
          marginBottom: "3.75em",
        }}
      >
        <ContentColumns mobileStyle={{ flexDirection: "column-reverse" }}>
          <ContentColumn width="40%">
            <Evolve />
          </ContentColumn>
          <ContentColumn width="60%" style={{ paddingTop: "3.75em" }}>
            <Title
              as="h2"
              font={theme.font.neometric}
              size={"xxl"}
              weight={900}
            >
              Evolve your monsters
            </Title>
            <Spacer size="md" />
            <Text as="p" font={theme.font.spaceMace} underline>
              Breed rare Pepemon NFTs
            </Text>
            <Spacer size="md" />
            <Text as="p" font={theme.font.inter}>
              Crush other Pepemon trainers on a web3 card game rewarding
              everyone for playing.<br></br>
              <br></br>Evolve your Pepemon NFTs and mint rare ones to climb the
              Leaderboard and win epic drops!
            </Text>
          </ContentColumn>
        </ContentColumns>
      </StyledSection>

      <StyledSection>
        <ContentColumns style={{ marginBottom: "7.5em" }}>
          <ContentColumn width="55%" style={{ paddingTop: "3.75em" }}>
            <Title as="h2" font={theme.font.neometric} size="xxl" weight={900}>
              Pepemon: Degen Battleground
            </Title>
            <Spacer size="md" />
            <Text as="p" font={theme.font.spaceMace} underline>
              Releasing soon
            </Text>
            <Spacer size="md" />
            <Text as="p" font={theme.font.inter}>
              Challenge opponents in Pepemon Degen Battleground, an engaging
              card game that rewards skillful play. Players of all levels can
              earn exclusive on-chain NFT prizes after each battle, ensuring
              opportunities for everyone.<br></br>
              <br></br>Dive into the play-to-earn experience, where your NFT
              card collection grows and thrives within the Pepechain ecosystem!
            </Text>
          </ContentColumn>
          <ContentColumn mobileStyle={{ marginTop: "2em" }} width="45%">
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <AnimatedImg src={logoexpand} alt="Pepemon" />
            </div>
          </ContentColumn>
        </ContentColumns>
      </StyledSection>


      <StyledSection
        bgColor={theme.color.purple[200]}
        style={{ paddingTop: "3.75em", paddingBottom: theme.footer.spaceTop }}
      >
        <SocialBoxes />
      </StyledSection>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.main<{ bgImage?: string }>`
  width: 100vw;

  @media (min-width: ${theme.breakpoints.desktop}) {
    ${(props) =>
      props.bgImage &&
      `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
    margin-left: ${theme.sideBar.width.closed}px;
    width: calc(100vw - ${theme.sideBar.width.closed}px);
  }
`;

interface StyledSectionProps {
  bgImage?: string;
  bgColor?: string;
  desktopStyle?: object;
  mobileStyle?: object;
}

const StyledSection = styled.section<any>`
  background-color: ${(props) => props.bgColor && props.bgColor};
  padding-left: clamp(1em, 2.65vw, 2em);
  padding-right: clamp(1em, 2.65vw, 2em);

  @media (max-width: ${theme.breakpoints.desktop}) {
    ${(props) => props.mobileStyle && props.mobileStyle}
  }

  @media (min-width: ${theme.breakpoints.desktop}) {
    ${(props) =>
      props.bgImage &&
      `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
    ${(props) => props.desktopStyle && props.desktopStyle}
  }
`;

export default Home;
