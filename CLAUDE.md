# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pepemon is a blockchain-based NFT card game frontend built with React/TypeScript. The project is a yarn workspace monorepo containing a React app and smart contract interfaces for interacting with Pepemon NFTs, staking, and marketplace functionality across multiple blockchain networks (Ethereum, BSC, Pepemon Testnet).

## Common Development Commands

### Main Scripts (run from project root)
- `yarn react-app:start` - Start development server on http://localhost:3000
- `yarn react-app:build` - Build production version
- `yarn react-app:test` - Run test suite in watch mode

### App-specific Scripts (run from packages/app/)
- `yarn start` - Start development server
- `yarn build` - Production build
- `yarn test` - Run tests
- `yarn lint-fix` - Fix ESLint issues across src/**/*.{js,jsx,ts,tsx,json,css,scss,md}

### Pre-commit Hooks
- Husky is configured to run `lint-staged` on pre-commit
- Prettier formatting is automatically applied to staged files

## Architecture

### Workspace Structure
- **Root**: Yarn workspace coordinator with main build scripts
- **packages/app/**: Main React application
- **packages/contracts/**: Smart contract ABIs and addresses

### Key Architecture Patterns

**State Management**: Custom context providers with useReducer
- `PepemonProvider` - Global blockchain state (accounts, contracts, network)
- `ModalsProvider` - UI modal state management

**Blockchain Integration**: 
- `Pepemon` class (`src/pepemon/Pepemon.js`) - Core Web3 wrapper
- Contract instances managed through contexts
- Multi-chain support (Ethereum mainnet, testnets, BSC, Pepemon testnet)

**Component Structure**:
- Styled-components for styling with centralized theme
- Lazy-loaded route components for code splitting
- HOC pattern (`withConnectedWallet`) for wallet-required pages

### Key Directories

**Components** (`src/components/`): Reusable UI components with index.ts exports
**Views** (`src/views/`): Page-level components (Home, Store, Staking, Bridge, Subscription)
**Hooks** (`src/hooks/`): Custom hooks for blockchain interactions and UI logic
**Constants** (`src/constants/`): Chain configurations, API endpoints, card definitions

### Blockchain Networks
Supported networks are defined in `src/constants/chains.ts`:
- Ethereum Mainnet (chainId: 1)
- Goerli Testnet (chainId: 5) 
- BSC Mainnet (chainId: 56)
- Pepemon Testnet (chainId: 906090)

Contract addresses for each network are defined in `src/pepemon/lib/constants.js`.

### Build System
- React Scripts 3.4.3 (Create React App)
- TypeScript with relaxed config (`strictNullChecks: false`, `noImplicitAny: false`)
- ESLint with Prettier integration
- GitHub Actions CI/CD on develop branch

## Development Notes

### Web3 Integration
- Uses Web3Modal for wallet connections
- Ethers.js for contract interactions
- Support for MetaMask, WalletConnect providers
- Custom bridge functionality for cross-chain operations

### UI/UX Patterns
- Responsive design with mobile-first approach
- Card-based layouts for NFT displays
- Modal-based interactions for transactions
- Loading states and error boundaries throughout

### Asset Management
- NFT card assets in `public/cards/` organized by generation/collection
- Metadata JSON files in `public/metadata/`
- Static images for UI components in `src/assets/`

### Testing
- React Testing Library setup
- Test files use `.test.js` extension
- Focus on component rendering and user interaction testing