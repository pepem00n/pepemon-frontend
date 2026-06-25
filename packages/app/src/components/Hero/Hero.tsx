import React from "react";
import {
  ContentBox,
  ContentBoxNumber,
  ContentColumn,
  ContentColumns,
  ExternalLink,
  Spacer,
  ButtonLink,
  Title,
  Text,
} from "../../components";
import { theme } from "../../theme";
import { group, pepetrainer } from "../../assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hero: React.FC<any> = ({ apy }) => {
  return (
    <ContentColumns mobileStyle={{ marginBottom: "7em" }}>
      <ContentColumn width="40%" style={{ paddingTop: "3.75em" }}>
        <Title as="h1" font={theme.font.spaceMace} size="xxxl">
          The Ultimate Degentralized Arena!
        </Title>
        <ContentColumns mobileStyle={{ flexDirection: "row" }}>
          <ContentColumn
            desktopStyle={{ paddingTop: "16px", maxWidth: "460px" }}
          >
            <Text as="p" font={theme.font.inter} size="l">
              Get ready for Degen Battleground – where every battle, trade, and collectible isn't just a play, it's piece of nostalgia. One click, one wallet, endless rewards. Ready to claim your stake in the Pepemon universe?
            </Text>
          </ContentColumn>
          <ContentColumn
            mobileStyle={{ marginLeft: "1em", flex: "1 0 35%" }}
            tabletLStyle={{ display: "none" }}
          >
            <img
              src={pepetrainer}
              alt="pepetrainer"
              style={{ margin: "0 auto", display: "block" }}
            />
          </ContentColumn>
        </ContentColumns>
        <Spacer size="lg" />
        <ContentColumns
          width="250%"
          style={{ position: "relative", zIndex: 1 }}
        >
          <ContentColumn width="calc(1/3 * 100%)" space="1.25em">
            <ContentBox shadow style={{ height: "auto" }}>
              <ContentBoxNumber>
                <span>1</span>
              </ContentBoxNumber>
              <Text as="p" align="center">
                Collect rare on-chain TCG cards.<br></br>Battle, trade &amp; own your Pepemon deck.
              </Text>
              <Spacer size="md" />
              <ExternalLink
                shadow
                href="https://opensea.io/collection/pepemonfactory"
                styling="button"
              >
                Collect on OpenSea
              </ExternalLink>
            </ContentBox>
          </ContentColumn>
          <ContentColumn
            width="calc(1/3 * 100%)"
            space="1.25em"
            style={{ transform: "translateY(30%)" }}
          >
            <ContentBox shadow style={{ height: "auto" }}>
              <ContentBoxNumber>
                <span>2</span>
              </ContentBoxNumber>
              <Text as="p" align="center">
                Beat the inflation.<br></br>Earn with PPBLZ
              </Text>
              <Text
                as="p"
                size="xl"
                font={theme.font.neometric}
                weight={900}
                align="center"
              >
                {apy && apy}
              </Text>
              <Spacer size="md" />
              <ButtonLink light="true" to="/staking">
                Start earning today
              </ButtonLink>
            </ContentBox>
          </ContentColumn>
          <ContentColumn
            width="calc(1/3 * 100%)"
            space="1.25em"
            style={{ transform: "translateY(60%)" }}
            align="flex-end"
          >
            <ContentBox shadow style={{ height: "auto" }}>
              <ContentBoxNumber>
                <span>3</span>
              </ContentBoxNumber>
              <Text as="p" align="center">
                Secure your Pepemon Boosterpacks.<br></br>Get whitelisted
              </Text>
              <Spacer size="md" />
              <ButtonLink light="true" to="/store/boosterpacks">
                Preview Boosterpacks
              </ButtonLink>
            </ContentBox>
          </ContentColumn>
        </ContentColumns>
      </ContentColumn>
      <ContentColumn
        width="60%"
        mobileStyle={{ display: "none" }}
        tabletLStyle={{ display: "block" }}
      >
        <LazyLoadImage
          src={group}
          alt="Pepetrainers"
          style={{ maxWidth: "120%", width: "750px" }}
          effect="blur"
        />
      </ContentColumn>
    </ContentColumns>
  );
};

export default Hero;
