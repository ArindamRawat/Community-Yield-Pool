import DepositForm from "../components/DepositForm";
import WithdrawForm from "../components/WithdrawForm";
import ClaimRewards from "../components/ClaimRewards";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <DepositForm />
      <WithdrawForm />
      <ClaimRewards />
    </div>
  );
}
