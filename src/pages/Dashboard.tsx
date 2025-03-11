
import React from 'react';
import { useMining } from '@/hooks/useMining';
import Header from '@/components/Header';
import UserStats from '@/components/UserStats';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ArrowUp, Clock } from 'lucide-react';

// Mock mining history data
const MOCK_HISTORY = [
  { date: '2023-05-01', coins: 1.0 },
  { date: '2023-05-02', coins: 1.0 },
  { date: '2023-05-03', coins: 1.25 },
  { date: '2023-05-04', coins: 1.25 },
  { date: '2023-05-05', coins: 1.5 },
  { date: '2023-05-06', coins: 1.5 },
  { date: '2023-05-07', coins: 1.5 },
  { date: '2023-05-08', coins: 1.5 },
  { date: '2023-05-09', coins: 1.75 },
  { date: '2023-05-10', coins: 1.75 },
  { date: '2023-05-11', coins: 1.75 },
  { date: '2023-05-12', coins: 2.0 },
  { date: '2023-05-13', coins: 2.0 },
  { date: '2023-05-14', coins: 2.0 },
].map(item => ({
  ...item,
  day: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
}));

// Simulate recent mining activity
const MOCK_ACTIVITIES = [
  { id: 1, action: 'Mining reward', amount: '+1.75', date: '15 minutes ago' },
  { id: 2, action: 'Referral bonus (John)', amount: '+0.25', date: '2 hours ago' },
  { id: 3, action: 'Mining reward', amount: '+1.5', date: '12 hours ago' },
  { id: 4, action: 'Referral activated (Sarah)', amount: '+25% rate', date: '1 day ago' },
  { id: 5, action: 'Mining reward', amount: '+1.5', date: '1 day ago' },
  { id: 6, action: 'Mining reward', amount: '+1.25', date: '2 days ago' },
];

const Dashboard: React.FC = () => {
  const { coins, miningRate, activeReferrals, totalReferrals } = useMining();
  
  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16 min-h-screen gradient-bg">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Track your mining progress and activity.
            </p>
          </div>
          
          {/* Stats */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <UserStats 
              coins={coins}
              miningRate={miningRate}
              activeReferrals={activeReferrals}
              totalReferrals={totalReferrals}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mining history chart */}
            <div className="lg:col-span-2 glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Mining History</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Last 14 days</span>
                </div>
              </div>
              
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={MOCK_HISTORY}
                    margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorCoins" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--mining-default))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--mining-default))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      tickLine={false} 
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="coins" 
                      stroke="hsl(var(--mining-default))" 
                      fillOpacity={1} 
                      fill="url(#colorCoins)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="lg:col-span-1 glass-card rounded-xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {MOCK_ACTIVITIES.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start space-x-3 animate-fade-in"
                    style={{ animationDelay: `${0.3 + (index * 0.05)}s` }}
                  >
                    <div className="mt-0.5">
                      {activity.action.includes('Mining') ? (
                        <div className="w-8 h-8 rounded-full bg-mining-light/50 flex items-center justify-center">
                          <ArrowUp className="w-4 h-4 text-mining-default" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{activity.action}</span>
                        <span className={activity.amount.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-mining-default'}>
                          {activity.amount}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
