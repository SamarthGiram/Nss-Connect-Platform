import LeaderboardWidget from '../../components/LeaderboardWidget';

const LeaderboardPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800">NSS Leaderboard</h1>
        <p className="text-sm text-gray-400 font-medium mt-0.5">Top volunteers based on event attendance</p>
      </div>
      
      <div className="h-auto max-w-2xl mx-auto">
        <LeaderboardWidget limit={0} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
