import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../context/Web3Context";
import PoolABI from "../abi/CommunityYieldPool.json";
import { COMMUNITY_YIELD_POOL_ADDRESS } from "../utils/constants";
import { Wallet, Gift, AlertCircle, CheckCircle, Loader2, TrendingUp } from "lucide-react";
import clsx from "clsx";

export default function ClaimRewards() {
  const { signer, isConnected } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pendingRewards, setPendingRewards] = useState<string>("0");
  const [totalRewards, setTotalRewards] = useState<string>("0");

  // Fetch user rewards
  useEffect(() => {
    const fetchRewards = async () => {
      if (!signer || !isConnected) return;
      
      try {
        const contract = new ethers.Contract(COMMUNITY_YIELD_POOL_ADDRESS, PoolABI, signer);
        const userAddress = await signer.getAddress();
        const userData = await contract.users(userAddress);
        
        // Calculate pending rewards
        const pending = await contract.accRewardPerShareE18();
        const userRewardPerSharePaid = userData.userRewardPerSharePaid;
        const shares = userData.shares;
        
        const pendingReward = (pending - userRewardPerSharePaid) * shares / ethers.parseUnits("1", 18);
        setPendingRewards(ethers.formatUnits(pendingReward, 18));
        
        // Get total claimed rewards (this would need to be tracked separately in a real implementation)
        setTotalRewards("0"); // Placeholder - in real implementation, track this
        
      } catch (err) {
        console.error("Failed to fetch rewards:", err);
      }
    };

    fetchRewards();
    const interval = setInterval(fetchRewards, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [signer, isConnected]);

  const handleClaim = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    if (parseFloat(pendingRewards) <= 0) {
      setError("No rewards available to claim");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const contract = new ethers.Contract(COMMUNITY_YIELD_POOL_ADDRESS, PoolABI, signer);
      
      const tx = await contract.claim();
      await tx.wait();
      
      setSuccess(`Successfully claimed ${parseFloat(pendingRewards).toFixed(4)} reward tokens!`);
      setPendingRewards("0");
      
      // Update total rewards
      setTotalRewards(prev => (parseFloat(prev) + parseFloat(pendingRewards)).toString());
      
    } catch (err: any) {
      console.error("Claim failed:", err);
      setError(err.message || "Failed to claim rewards. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatRewards = (amount: string) => {
    const num = parseFloat(amount);
    if (num === 0) return "0.0000";
    if (num < 0.0001) return "< 0.0001";
    return num.toFixed(4);
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-success-100 rounded-lg">
          <Gift className="w-6 h-6 text-success-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Claim Rewards</h2>
          <p className="text-sm text-gray-600">Claim your earned yield rewards</p>
        </div>
      </div>

      {!isConnected && (
        <div className="mb-4 p-4 bg-warning-50 border border-warning-200 rounded-xl">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-warning-600" />
            <span className="text-warning-800 font-medium">Wallet not connected</span>
          </div>
          <p className="text-sm text-warning-700 mt-1">Connect your wallet to claim rewards</p>
        </div>
      )}

      {isConnected && (
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-success-50 to-primary-50 border border-success-200 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Pending Rewards:</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success-600" />
                <span className="text-xl font-bold text-success-600">
                  {formatRewards(pendingRewards)} tokens
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium text-gray-700">Total Claimed:</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatRewards(totalRewards)} tokens
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Rewards accumulate in real-time</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Your rewards are calculated based on your staked amount and lock duration
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-danger-50 border border-danger-200 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-danger-600" />
            <span className="text-danger-800 font-medium">Error</span>
          </div>
          <p className="text-sm text-danger-700 mt-1">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-xl mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
            <span className="text-success-800 font-medium">Success</span>
          </div>
          <p className="text-sm text-success-700 mt-1">{success}</p>
        </div>
      )}

      <button
        onClick={handleClaim}
        disabled={!isConnected || isLoading || parseFloat(pendingRewards) <= 0}
        className={clsx(
          "w-full btn-success",
          (!isConnected || isLoading || parseFloat(pendingRewards) <= 0) && "opacity-50 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Claiming...
          </div>
        ) : (
          `Claim ${formatRewards(pendingRewards)} Rewards`
        )}
      </button>

      {parseFloat(pendingRewards) > 0 && (
        <p className="text-xs text-gray-500 text-center mt-3">
          💡 Tip: Claim rewards regularly to maximize your earnings
        </p>
      )}
    </div>
  );
}
