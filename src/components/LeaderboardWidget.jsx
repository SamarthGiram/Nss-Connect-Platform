import { useState, useEffect } from 'react';
import { fetchLeaderboard } from '../services/attendanceService';
import { parseProfile } from '../utils/avatarParser';
import { FiAward } from 'react-icons/fi';

const LeaderboardWidget = ({ limit = 3 }) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetchLeaderboard()
      .then(data => {
        setLeaders(limit > 0 ? data.slice(0, limit) : data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load leaderboard');
        setLoading(false);
      });
  }, []);

  const getRankStyles = (index) => {
    switch (index) {
      case 0:
        return {
          bg: 'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200',
          icon: 'text-amber-500',
          label: '🥇',
          ring: 'ring-amber-300'
        };
      case 1:
        return {
          bg: 'bg-gradient-to-r from-slate-100 to-slate-50 border-slate-200',
          icon: 'text-slate-400',
          label: '🥈',
          ring: 'ring-slate-300'
        };
      case 2:
        return {
          bg: 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200',
          icon: 'text-orange-600',
          label: '🥉',
          ring: 'ring-orange-300'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-100',
          icon: 'text-gray-400',
          label: `#${index + 1}`,
          ring: 'ring-gray-200'
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
          <FiAward size={18} className="text-amber-500" /> Top Volunteers
        </h3>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full min-h-[150px]">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full min-h-[150px] text-xs font-semibold text-gray-400">
            {error}
          </div>
        ) : leaders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-center">
            <p className="text-2xl mb-1">🏆</p>
            <p className="text-xs font-semibold text-gray-400">No points awarded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaders.map((student, idx) => {
              const parsed = parseProfile(student);
              const rank = getRankStyles(idx);
              
              return (
                <div key={student.id} 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-md ${rank.bg}`}>
                  
                  {/* Rank Icon */}
                  <div className={`w-8 font-black text-lg text-center ${rank.icon}`}>
                    {rank.label}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden ring-2 ring-offset-1 ${rank.ring}
                    ${parsed.avatar_theme ? `bg-gradient-to-br ${parsed.avatar_theme}` : 'bg-gradient-to-br from-[#102167] to-[#3b4da8]'}`}>
                    {parsed.avatar_img ? (
                      <img src={parsed.avatar_img} alt={parsed.name} className="w-full h-full object-cover" />
                    ) : (
                      parsed.avatar_icon || parsed.name?.[0] || '?'
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{parsed.name}</p>
                    <p className="text-[10px] text-gray-500 font-semibold truncate">{parsed.points} NSS Points</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardWidget;
