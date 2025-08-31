# Community Yield Pool

A modern, lightweight DeFi protocol where users pool stablecoins together, and the protocol automatically distributes yield back fairly based on contribution and staking duration.

## 🚀 Features

- **Beautiful Landing Page**: Modern, responsive landing page with compelling content and clear call-to-actions
- **Modern UI/UX**: Beautiful, responsive interface built with React, TypeScript, and Tailwind CSS
- **Wallet Integration**: Seamless MetaMask integration with proper error handling
- **Real-time Updates**: Live pool statistics and user balance updates
- **Smart Contract Integration**: Full integration with Ethereum smart contracts
- **Yield Farming**: Earn rewards based on staking amount and lock duration
- **Lock Periods**: Flexible staking with configurable lock periods
- **Early Exit Penalties**: Incentivize long-term staking with penalty system
- **Navigation System**: Easy switching between landing page and main application

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Web3**: Ethers.js v6
- **Blockchain**: Ethereum (compatible with any EVM chain)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd community-yield-pool
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏃‍♂️ Run Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Smart Contract Addresses

Update the contract addresses in `src/utils/constants.ts`:

```typescript
export const COMMUNITY_YIELD_POOL_ADDRESS = "YOUR_POOL_CONTRACT_ADDRESS";
export const MOCK_STABLE_ADDRESS = "YOUR_STABLE_TOKEN_ADDRESS";
export const REWARD_TOKEN_ADDRESS = "YOUR_REWARD_TOKEN_ADDRESS";
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CHAIN_ID=1
VITE_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
```

## 📱 Usage

### Connecting Wallet

1. Click "Connect Wallet" in the header
2. Approve the connection in MetaMask
3. Your wallet address will be displayed in the header

### Depositing Tokens

1. Navigate to the "Deposit Tokens" section
2. Enter the amount you want to stake
3. Set your desired lock duration (in days)
4. Click "Deposit Tokens"
5. Confirm the transaction in MetaMask

### Withdrawing Tokens

1. Navigate to the "Withdraw Tokens" section
2. View your current staked balance and lock status
3. Enter the amount you want to withdraw
4. Click "Withdraw Tokens"
5. Confirm the transaction in MetaMask

**Note**: Early withdrawals may incur penalties based on your lock period.

### Claiming Rewards

1. Navigate to the "Claim Rewards" section
2. View your pending rewards
3. Click "Claim Rewards"
4. Confirm the transaction in MetaMask

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard with pool stats
│   ├── DepositForm.tsx # Token deposit form
│   ├── WithdrawForm.tsx # Token withdrawal form
│   └── ClaimRewards.tsx # Reward claiming component
├── context/            # React context providers
│   └── Web3Context.tsx # Web3 wallet integration
├── abi/               # Smart contract ABIs
│   ├── CommunityYieldPool.json
│   ├── MockStable.json
│   └── RewardToken.json
├── utils/             # Utility functions
│   └── constants.ts   # Contract addresses and constants
└── App.tsx           # Main application component
```

## 🔒 Smart Contracts

The application integrates with the following smart contracts:

- **CommunityYieldPool**: Main staking contract
- **MockStable**: Stablecoin token for staking
- **RewardToken**: Token distributed as rewards

### Key Contract Functions

- `deposit(amount, lockDuration)`: Stake tokens with lock period
- `withdraw(amount)`: Withdraw staked tokens
- `claim()`: Claim accumulated rewards
- `users(address)`: Get user staking information

## 🎨 UI Components

### Design System

- **Colors**: Primary blue, success green, warning orange, danger red
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Shadows**: Subtle elevation with hover effects

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid layouts that adapt to screen size

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Wallet Connection Errors**: Clear messages for MetaMask issues
- **Transaction Errors**: Detailed error messages for failed transactions
- **Network Errors**: Handling for RPC connection issues
- **Validation Errors**: Input validation with helpful feedback

## 🔄 State Management

- **Web3 Context**: Global wallet and contract state
- **Local State**: Component-specific state for forms and UI
- **Real-time Updates**: Automatic refresh of pool and user data

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm test:watch
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Traditional Hosting

1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve `index.html` for all routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Ensure MetaMask is installed and connected
3. Verify you're on the correct network
4. Check that you have sufficient tokens and ETH for gas

## 🔮 Roadmap

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Governance features
- [ ] Additional reward tokens
- [ ] Social features and leaderboards

---

Built with ❤️ for the DeFi community
