# VitaCore
The absolute origin of global longevity data.

## About VitaCore

VitaCore manages users’ DNA data, together with medical records and data from wearable devices. VitaCore uses decentralized data handling and sharing to mitigate legal issues and barriers as individuals always have the ownership of their data records. Personal data share cannot be prohibited by any legal system due to the nature of health data, it is you, it belongs to you. To achieve a real market fit and impact VitaCora aims to build more data use case pipelines while it is also a platform that can be integrated by any major industry giants as well. As the introduction VitaCore focuses on international patients, because they still suffer from data sharing issues yet today. The main target group of VitaCore is longevity enthusiasts who have that real early-adopter potential. Longevity patients pay today to be subject of medical experiments hungry for new datapoints. With VitaCore they can feed those experiments with massive amounts of real-world data. Besides all of its business value, VitaCore has also a massive social impact as it eases the masses to have more health insights and much cheaper devices or treatments.

### The Problem

The largest, systematically collected and organized health dataset contains data of about a billion patients and yet this dataset is not continuous but first and foremost it is not at all open as it is the collection of the U.S. veterans owned by the Department of Veterans Affairs. The largest public dataset consists of less than 100,000 records. They aren’t continuous as well and due to legal reasons it cannot include DNA data. So real, Machine Learning, Deep Learning or AI driven longevity or healthcare research is not possible because of the lack of available data. 

### The Solution

Because of legal circumstances the classic data collection method is not possible. However direct, unique, personal level data sharing cannot be prohibited by any national or international law as your health data belongs first and foremost to you. This is the point where VitaCore begins its story.

### Why VitaCore - The Unique Selling Point

VitaCore combines 3 datasets on the user level: DNA data, medical records and continuous data from wearable devices. The project offers standardized solutions for market giants to use the data while VitaCore develops also custom products e.g. cleaned and curated training data for longevity or medical experiments and services. The project delivers an attribute based matchmaking opportunity as well for personal level medical help.

### Business model

VitaCore have a pay-as-you-go revenue model for its API services, a pricing model for the data cleaning and curations service, and a middleman fee for the matchmaking.

### The Social Impact

On a longer term VitaCore aims to offer a discounted access for its dataprovider users to the cutting edge wearable devices and medical treatments to help everyone to enjoy quality healthcare and have a long and healthy life.

## Project Development Details

## Repository Structure

root-project/
├── .gitignore
├── README.md
├── package.json
├── eth_infra/
│   ├── contracts/
│   │   └── DataContributionRegistry.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── DataContributionRegistry.test.js
│   ├── hardhat.config.js
│   └── README.md
├── sui_infra/
│   ├── Move.toml
│   ├── sources/
│   │   └── storage_registry.move
│   ├── tests/
│   │   └── storage_registry_tests.move
│   └── README.md
└── user_application/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   ├── components/
    │   │   ├── WorldIdWidget.tsx
    │   │   ├── SuiStorageClient.tsx
    │   │   └── RewardClaim.tsx
    │   └── utils/
    │       ├── ethClient.ts
    │       └── suiClient.ts
    ├── public/
    ├── package.json
    ├── next.config.mjs
    └── README.md

### Component Documentation

#### 1. `eth_infra` (Ethereum Smart Contracts)

* **Purpose:** Acts as the master coordination and economic layer. It integrates World ID for proof-of-personhood (selfie check result ID verification), links Ethereum accounts to Sui storage references, and manages reward compensation pools for data contributors.

#### 2. `sui_infra` (Sui Move Smart Contracts)

* **Purpose:** Manages high-throughput, low-latency decentralized data storage indexing and contribution objects on the Sui network.

#### 3. `user_application` (Next.js / Plain React Application)

* **Purpose:** The user-facing client application built with Next.js that ties together identity verification, cross-chain interactions, and reward tracking.

