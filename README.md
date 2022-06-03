# Tutu

This all started as a linking thinking exercise which is another way of thinking about what blockchain technolgy will become.

## Intent

Use [monorepo](https://mm.dreamineering.com/docs/projects/monorepo-apps/) architecture to build multiple apps from shared libraries to create a foundational [Web3 Startup Model](https://mm.dreamineering.com/docs/web3/startups/playbook) that enables the creation of value from ideas with optimal flow.

1. [Understand:](https://mm.dreamineering.com/docs/humans/skills/meta-learning/) [Good Pattterns](https://mm.dreamineering.com/docs/engineering/software/smart-contracts/patterns/) from Bad and why?
2. [Review:](https://mm.dreamineering.com/docs/flow/act/) with spaced repetition linked to linked thinking documentation to accelerate actionable knowledge.
3. [Practice:](https://mm.dreamineering.com/docs/engineering/software/developer-roadmaps) follow the path to form good habits
4. [Coach:](https://mm.dreamineering.com/docs/humans/skills/leadership/coach) create an ecosystem of coaches that help others levelup with [flow](/docs/flow)
5. [Evolve:](https://mm.dreamineering.com/docs/flow/decide/) collective wisdom through decision making processed used for making future bets

## Approach

Innovate at the edges then pull proven patterns into the core.

- [Web3 Analysis](https://mm.dreamineering.com/docs/web3/)
- [Web3 Startup Playbook](https://mm.dreamineering.com/docs/web3/startups/playbook)
- [Web3 Dev Roadmap](https://mm.dreamineering.com/docs/engineering/software/developer-roadmaps)

### Standing on the Shoulders of Giants

The project is the result of analysis of various [starter-kits](https://mm.dreamineering.com/docs/tech-stack/web3-stack/starter-kits/) but primarily a combination of:

- [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)
- [chain.link ts starter-kit](https://blog.chain.link/hardhat-starter-kit-typescript/)

[Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) is great but I wanted to use Typescript with Nextjs over Vite to [Speed Run Ethereum](https://speedrunethereum.com/) and I wanted a place to prototype ideas but also add polish to apps in once place and consolidate best practices into a library.

Analysis spreadsheets:

- [Web3 Business Models](https://docs.google.com/spreadsheets/d/1Lp6VNvj7d_rWV0hUHR6YxqijnECtg32XDVinhucBaS0/edit#gid=1528191388)
- [Web3 Stack Analysis](https://docs.google.com/spreadsheets/d/1ohhinbb1QvTZD7ZXpMBToFutBvsjdfvCuQR3bO3MQxE/edit#gid=194008115)

The libary components come from:

- [eth-hooks](https://github.com/scaffold-eth/eth-hooks)
- [eth-components](https://github.com/scaffold-eth/eth-components)

## Plan

Help to drive standardisation of naming conventions, and best practices to help conceptual and fundamental leaps forward in the world of multi-chain development.

### Web3 App Fundamentals

Create a common library to evolve ideas for building core types of Web3 app that can also be used to onboard new developers more efficiently.

- [ ] Create a DAO with Multi-Sig to run operations
- [ ] Create a DeFi operations project to leverage capital
- [ ] Create a base marketing project to sell ideas
- [ ] Use software to create [real world](https://mm.dreamineering.com/docs/projects) value

### Components

Use [CDD](https://mm.dreamineering.com/docs/engineering/software/architecture/component-driven-development) to evolve core building blocks to rapidly evolve Web3 apps.

Use [eth-hooks](https://github.com/scaffold-eth/eth-hooks) to **learn the fundamental building blocks** ethereum blockchain interactions and conversion of [eth-components](https://github.com/scaffold-eth/eth-components) to use [Tailwindcss](https://mm.dreamineering.com/docs/tech-stack/graphic-design-tech/tailwindcss/) and [Headless UI](https://mm.dreamineering.com/docs/tech-stack/frontend-dev/react/react-headless-ui) to create improved UX and can readily be customised.

#### Scaffold Eth App

Made for prototyping, where each new hardhat deploy will populate new ABI for the generic contract interface to automatically provide a UI for playing around with the contract.

- [ ] Create an app to replicate scaffold-eth-typescripts **kitchen sink** of features
- [ ] Understand/document jobs of core dependencies
- [ ] Use Storybook to create a common library with visual reference of standard components and variant use cases
- [ ] Investigate archecture of headless (any CSS lib) and and bottomless (any chain) UI components

### Backend

What is the best L2 blockchain and supporting [stack members](https://mm.dreamineering.com/docs/engineering/software/stacks/) for building a Web3 games?

- [ ] Ethereum combine build process of chainlink and scaffold-eth
- [ ] Run subgraphs from NX commands
- [ ] Investigate Polygon
- [ ] Investigate [Optimism](https://mm.dreamineering.com/docs/humans/skills/leadership/optimism)
- [ ] Etc

Evolve [roadmaps](https://mm.dreamineering.com/docs/engineering/software/developer-roadmaps) to create more [engineers](https://mm.dreamineering.com/docs/engineering/).

## Getting Started

### First Build

Workaround: after clone and yarn install in hardhat.config.ts comment out **tasks** import as these are dependent on generated **typechain** files.

```ts
// Tasks
import './libs/ethereum/src/tasks';
```

Generate **typechain** files

```bash
nx run ethereum:hh-typechain
```

Uncomment **tasks** import.

### Development

Open

```bash
nx run ethereum:hh-deploy
```

```bash
nx run ethereum:hh-node
```

If issues, clean, deploy, and hh-node

```bash
nx run ethereum:hh-clean
```

## Importing Contracts

Ethereum Lib: Export generated output in _libs/ethereum/src/index.ts_

```ts
import * as generatedBlogABI from './generated/artifacts/contracts/Blog.sol/Blog.json';
export const blogABI = generatedBlogABI.abi;
```

Apps: Import contract ABI from @drmg/ethereum

```ts
/* import Application Binary Interface (ABI) */
import { blogABI } from '@drmg/ethereum';
```

See _apps/stackmates_ for an example
