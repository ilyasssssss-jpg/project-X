import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Search, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Star, Calendar, 
  Building, Users, DollarSign, Download, Clock, Filter, RefreshCw, User, 
  Briefcase, MessageSquare, Settings, Bell, LogOut, Plus, FileText, ChartBar 
} from 'lucide-react';

const InvestmentResearchPlatform = () => {
  const [selectedStock, setSelectedStock] = useState('SPOT');
  const [reportDate] = useState('April 30, 2025');
  const [activeTab, setActiveTab] = useState('research');
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useState({ name: 'Alex Johnson', role: 'Portfolio Manager' });
  const [notifications] = useState(3);
  const [recentReports, setRecentReports] = useState([]);
  const [watchlist, setWatchlist] = useState(['SPOT', 'AAPL', 'MSFT']);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Comprehensive stock data
  const stockData = {
    SPOT: {
      companyName: 'Spotify Technology S.A.',
      ticker: 'SPOT',
      exchange: 'NYSE',
      sector: 'Communication Services',
      industry: 'Entertainment',
      marketCap: 122.36,
      price: 576.94,
      change: 3.21,
      recommendation: 'BUY',
      priceTarget: 625,
      targetUpside: 8.3,
      rating: 4,
      thesis: "Spotify demonstrates exceptional execution with standout Premium subscriber growth, record gross margins, and robust free cash flow generation. Strategic innovation in ad automation and AI-driven content is accelerating platform evolution while strengthening competitive positioning against Apple Music and Amazon Music.",
      keyStrengths: [
        "Market-leading 31% global music streaming market share",
        "678M monthly active users (+10% YoY) with strong engagement metrics", 
        "Premium subscribers up 12% to 268M with highest Q1 net additions since 2020",
        "Expanding gross margins reaching record 31.6% (+180bps YoY)",
        "Strong free cash flow generation of €534M in Q1 2025"
      ],
      keyRisks: [
        "Intense competition from Apple Music, Amazon Music, and YouTube Music",
        "Content licensing cost inflation from major record labels",
        "Currency headwinds with expected €100M negative Q2 impact",
        "Ad-supported business sensitivity to macroeconomic conditions"
      ],
      financialMetrics: {
        revenue: 15.67,
        revenueGrowth: 15.2,
        grossMargin: 31.6,
        operatingMargin: 12.1,
        netMargin: 4.3,
        freeCashFlow: 534,
        debt: 1.2,
        cash: 3.8,
        roe: 8.9,
        roic: 11.2
      },
      valuation: {
        peRatio: 95.26,
        pegRatio: 1.8,
        evRevenue: 7.2,
        evEbitda: 45.3,
        priceBook: 12.4,
        priceSales: 7.8
      },
      dcfAnalysis: {
        scenarios: [
          { case: 'Bear', priceTarget: 498, probability: 25, assumptions: 'Revenue growth 5-8%, margin compression' },
          { case: 'Base', priceTarget: 625, probability: 50, assumptions: 'Revenue growth 12-15%, stable margins' },
          { case: 'Bull', priceTarget: 742, probability: 25, assumptions: 'Revenue growth 18-22%, margin expansion' }
        ],
        assumptions: {
          terminalGrowth: 3.0,
          wacc: 8.5,
          revenueCAGR: 12.5,
          targetMargin: 16.0
        }
      },
      esgScores: {
        environmental: 85,
        social: 78, 
        governance: 92,
        overall: 85,
        percentile: 88
      },
      priceData: [
        { month: 'Nov 2024', price: 380, benchmark: 365 },
        { month: 'Dec 2024', price: 420, benchmark: 385 },
        { month: 'Jan 2025', price: 480, benchmark: 410 },
        { month: 'Feb 2025', price: 520, benchmark: 435 },
        { month: 'Mar 2025', price: 560, benchmark: 465 },
        { month: 'Apr 2025', price: 577, benchmark: 485 }
      ],
      peerComparison: [
        { company: 'SPOT', name: 'Spotify', marketCap: 122.36, growth: 15.2, margin: 12.1, pe: 95.3, recommendation: 'BUY' },
        { company: 'NFLX', name: 'Netflix', marketCap: 185.42, growth: 8.1, margin: 18.9, pe: 34.2, recommendation: 'HOLD' },
        { company: 'DIS', name: 'Disney', marketCap: 198.75, growth: 3.2, margin: 7.8, pe: 28.1, recommendation: 'HOLD' },
        { company: 'WBD', name: 'Warner Bros Discovery', marketCap: 24.18, growth: -8.9, margin: -2.1, pe: -12.5, recommendation: 'SELL' }
      ],
      recentNews: [
        { date: '2025-04-25', headline: 'Q1 2025 Earnings Beat: Revenue up 15.2% YoY', sentiment: 'positive' },
        { date: '2025-04-10', headline: 'Spotify launches AI-powered playlist recommendations', sentiment: 'positive' },
        { date: '2025-03-28', headline: 'Partnership with Universal Music Group renewed', sentiment: 'positive' },
        { date: '2025-03-15', headline: 'European Commission investigates app store policies', sentiment: 'neutral' }
      ]
    },
    AAPL: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      exchange: 'NASDAQ',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketCap: 2850.42,
      price: 187.45,
      change: -1.23,
      recommendation: 'HOLD',
      priceTarget: 195,
      targetUpside: 4.0,
      rating: 3,
      thesis: "Apple maintains its dominant position in premium technology with strong ecosystem loyalty and services growth. While hardware sales face saturation in mature markets, the company's services segment continues to expand with high margins and recurring revenue streams.",
      keyStrengths: [
        "World's most valuable brand with exceptional customer loyalty",
        "Services revenue up 14% YoY to $22.3B with 40%+ operating margins",
        "Installed base of over 2.2 billion active devices",
        "Strong balance sheet with $162B cash and marketable securities",
        "Premium pricing power with industry-leading profit margins"
      ],
      keyRisks: [
        "Slowing iPhone sales growth in key markets",
        "Regulatory scrutiny on App Store practices globally",
        "Supply chain vulnerabilities in Asia",
        "Dependence on Chinese manufacturing",
        "Innovation cycle slowdown in core product lines"
      ],
      financialMetrics: {
        revenue: 98.4,
        revenueGrowth: 5.1,
        grossMargin: 44.8,
        operatingMargin: 29.1,
        netMargin: 24.3,
        freeCashFlow: 2540,
        debt: 108.6,
        cash: 162.3,
        roe: 165.2,
        roic: 32.4
      },
      valuation: {
        peRatio: 28.7,
        pegRatio: 2.1,
        evRevenue: 6.8,
        evEbitda: 22.3,
        priceBook: 38.4,
        priceSales: 6.9
      },
      dcfAnalysis: {
        scenarios: [
          { case: 'Bear', priceTarget: 158, probability: 20, assumptions: 'Revenue growth 2-4%, margin compression' },
          { case: 'Base', priceTarget: 195, probability: 60, assumptions: 'Revenue growth 5-7%, stable margins' },
          { case: 'Bull', priceTarget: 225, probability: 20, assumptions: 'Revenue growth 8-10%, services acceleration' }
        ],
        assumptions: {
          terminalGrowth: 2.5,
          wacc: 7.8,
          revenueCAGR: 6.0,
          targetMargin: 29.5
        }
      },
      esgScores: {
        environmental: 92,
        social: 85, 
        governance: 88,
        overall: 88,
        percentile: 91
      },
      priceData: [
        { month: 'Nov 2024', price: 198, benchmark: 195 },
        { month: 'Dec 2024', price: 205, benchmark: 202 },
        { month: 'Jan 2025', price: 212, benchmark: 208 },
        { month: 'Feb 2025', price: 208, benchmark: 205 },
        { month: 'Mar 2025', price: 195, benchmark: 192 },
        { month: 'Apr 2025', price: 187, benchmark: 185 }
      ],
      peerComparison: [
        { company: 'AAPL', name: 'Apple', marketCap: 2850.42, growth: 5.1, margin: 29.1, pe: 28.7, recommendation: 'HOLD' },
        { company: 'MSFT', name: 'Microsoft', marketCap: 3100.65, growth: 12.8, margin: 45.2, pe: 34.5, recommendation: 'BUY' },
        { company: 'GOOGL', name: 'Alphabet', marketCap: 2150.33, growth: 10.2, margin: 32.1, pe: 25.8, recommendation: 'BUY' },
        { company: 'AMZN', name: 'Amazon', marketCap: 1950.78, growth: 11.5, margin: 8.9, pe: 42.3, recommendation: 'HOLD' }
      ],
      recentNews: [
        { date: '2025-04-28', headline: 'Apple announces AI partnership with OpenAI for iOS 19', sentiment: 'positive' },
        { date: '2025-04-24', headline: 'Q2 Earnings: Revenue $98.4B, slightly below expectations', sentiment: 'neutral' },
        { date: '2025-04-15', headline: 'EU approves App Store changes under Digital Markets Act', sentiment: 'positive' },
        { date: '2025-03-30', headline: 'Foxconn factory in India reaches full production capacity', sentiment: 'positive' }
      ]
    },
    MSFT: {
      companyName: 'Microsoft Corporation',
      ticker: 'MSFT',
      exchange: 'NASDAQ',
      sector: 'Technology',
      industry: 'Software',
      marketCap: 3100.65,
      price: 418.72,
      change: 2.45,
      recommendation: 'BUY',
      priceTarget: 450,
      targetUpside: 7.5,
      rating: 4,
      thesis: "Microsoft continues to demonstrate exceptional execution across its cloud, AI, and enterprise software businesses. Azure growth acceleration, coupled with strong Office 365 adoption and strategic AI integration across products, positions the company for sustained outperformance.",
      keyStrengths: [
        "Azure cloud platform growing at 28% YoY with improving margins",
        "Leadership position in enterprise AI with Copilot adoption accelerating",
        "Office 365 commercial revenue up 14% with 375M paid seats",
        "Xbox Game Pass reaches 30M subscribers with expanding content library",
        "Strong capital allocation with consistent dividend growth and buybacks"
      ],
      keyRisks: [
        "Intensifying competition in cloud from AWS and Google Cloud",
        "Regulatory scrutiny on AI practices and market dominance",
        "Integration challenges with recent AI acquisitions",
        "Macroeconomic sensitivity in enterprise software spending",
        "Cybersecurity threats to cloud infrastructure"
      ],
      financialMetrics: {
        revenue: 61.9,
        revenueGrowth: 12.8,
        grossMargin: 69.2,
        operatingMargin: 45.2,
        netMargin: 37.8,
        freeCashFlow: 2480,
        debt: 56.4,
        cash: 134.2,
        roe: 42.1,
        roic: 28.7
      },
      valuation: {
        peRatio: 34.5,
        pegRatio: 1.9,
        evRevenue: 10.2,
        evEbitda: 28.7,
        priceBook: 12.3,
        priceSales: 10.3
      },
      dcfAnalysis: {
        scenarios: [
          { case: 'Bear', priceTarget: 375, probability: 20, assumptions: 'Cloud growth 15-18%, AI adoption slower' },
          { case: 'Base', priceTarget: 450, probability: 60, assumptions: 'Cloud growth 25-28%, AI driving upside' },
          { case: 'Bull', priceTarget: 510, probability: 20, assumptions: 'Cloud growth 30%+, AI platform dominance' }
        ],
        assumptions: {
          terminalGrowth: 3.0,
          wacc: 7.5,
          revenueCAGR: 13.5,
          targetMargin: 46.0
        }
      },
      esgScores: {
        environmental: 88,
        social: 91, 
        governance: 94,
        overall: 91,
        percentile: 94
      },
      priceData: [
        { month: 'Nov 2024', price: 380, benchmark: 375 },
        { month: 'Dec 2024', price: 405, benchmark: 400 },
        { month: 'Jan 2025', price: 415, benchmark: 410 },
        { month: 'Feb 2025', price: 420, benchmark: 415 },
        { month: 'Mar 2025', price: 432, benchmark: 425 },
        { month: 'Apr 2025', price: 419, benchmark: 418 }
      ],
      peerComparison: [
        { company: 'MSFT', name: 'Microsoft', marketCap: 3100.65, growth: 12.8, margin: 45.2, pe: 34.5, recommendation: 'BUY' },
        { company: 'ORCL', name: 'Oracle', marketCap: 380.42, growth: 7.2, margin: 38.1, pe: 24.8, recommendation: 'HOLD' },
        { company: 'ADBE', name: 'Adobe', marketCap: 280.33, growth: 9.1, margin: 31.2, pe: 45.2, recommendation: 'HOLD' },
        { company: 'CRM', name: 'Salesforce', marketCap: 220.78, growth: 11.3, margin: 8.9, pe: 52.3, recommendation: 'BUY' }
      ],
      recentNews: [
        { date: '2025-04-26', headline: 'Azure AI services revenue up 67% YoY', sentiment: 'positive' },
        { date: '2025-04-23', headline: 'Microsoft 365 Copilot reaches 25M users', sentiment: 'positive' },
        { date: '2025-04-18', headline: 'SEC closes investigation on cloud accounting practices', sentiment: 'positive' },
        { date: '2025-04-05', headline: 'GitHub introduces AI-powered code review tools', sentiment: 'positive' }
      ]
    }
  };

  const ESGColors = ['#10B981', '#3B82F6', '#8B5CF6'];
  const currentStock = stockData[selectedStock];

  // Add to recent reports when stock changes
  useEffect(() => {
    if (currentStock && !recentReports.find(r => r.ticker === currentStock.ticker)) {
      setRecentReports(prev => [
        { ticker: currentStock.ticker, company: currentStock.companyName, date: reportDate },
        ...prev.slice(0, 4)
      ]);
    }
  }, [selectedStock, reportDate, recentReports]);

  const addToWatchlist = (ticker) => {
    if (!watchlist.includes(ticker)) {
      setWatchlist([...watchlist, ticker]);
    }
  };

  const removeFromWatchlist = (ticker) => {
    setWatchlist(watchlist.filter(t => t !== ticker));
  };

  const filteredStocks = Object.keys(stockData).filter(ticker => 
    ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stockData[ticker].companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Search */}
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">ApexResearch</h1>
              </div>
              <div className="ml-8 relative flex-1 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search stocks, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                    {filteredStocks.length > 0 ? (
                      filteredStocks.map(ticker => (
                        <div
                          key={ticker}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedStock(ticker);
                            setSearchQuery('');
                          }}
                        >
                          <div>
                            <div className="font-medium text-gray-900">{ticker}</div>
                            <div className="text-sm text-gray-500">{stockData[ticker].companyName}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Watchlist */}
              <div className="relative">
                <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                  <Star className="h-5 w-5 text-gray-400" />
                  <span>Watchlist ({watchlist.length})</span>
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                >
                  <Bell className="h-5 w-5 text-gray-400" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {showNotificationDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">New research report available for AAPL</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">SPOT price target increased to $625</p>
                          <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-900">Market volatility alert for tech sector</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-800">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center"
                  src="https://ui-avatars.com/api/?name=Alex+Johnson&background=0ea5e9&color=fff"
                  alt="User profile"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Navigation */}
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="space-y-2">
                {[
                  { id: 'research', label: 'Research Reports', icon: FileText },
                  { id: 'dashboard', label: 'Dashboard', icon: ChartBar },
                  { id: 'alerts', label: 'Market Alerts', icon: Bell },
                  { id: 'portfolio', label: 'My Portfolio', icon: Briefcase },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Watchlist */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Watchlist</h3>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {watchlist.map((ticker) => {
                  const stock = stockData[ticker];
                  return (
                    <div key={ticker} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <div>
                        <div className="font-medium text-gray-900">{ticker}</div>
                        <div className="text-sm text-gray-500">{stock.price.toFixed(2)}</div>
                      </div>
                      <div className={`text-sm font-medium ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setSelectedStock(report.ticker)}
                  >
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.ticker}</div>
                      <div className="text-xs text-gray-500">{report.company}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'research' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Report Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentStock.companyName}</h1>
                      <div className="flex items-center space-x-4 text-lg text-gray-600">
                        <span className="flex items-center"><Building className="w-5 h-5 mr-2" />{currentStock.ticker}</span>
                        <span>{currentStock.exchange}</span>
                        <span>{currentStock.industry}</span>
                      </div>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <div className="flex items-center justify-end mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-gray-600">{reportDate}</span>
                      </div>
                      <div className="text-4xl font-bold text-gray-900">${currentStock.price.toFixed(2)}</div>
                      <div className={`flex items-center justify-end text-lg font-semibold ${
                        currentStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {currentStock.change >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                        {currentStock.change >= 0 ? '+' : ''}{currentStock.change}%
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export PDF</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => addToWatchlist(currentStock.ticker)}
                    >
                      <Star className="w-4 h-4" />
                      <span>Add to Watchlist</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Update Data</span>
                    </button>
                  </div>
                </div>

                {/* Executive Summary */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Executive Summary</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Investment Rating</h3>
                      <div className="flex items-center space-x-3">
                        <span className={`px-4 py-2 rounded-lg font-bold text-lg ${
                          currentStock.recommendation === 'BUY' ? 'bg-green-600 text-white' :
                          currentStock.recommendation === 'HOLD' ? 'bg-yellow-500 text-white' :
                          'bg-red-600 text-white'
                        }`}>
                          {currentStock.recommendation}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < currentStock.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Price Target</h3>
                      <div className="text-3xl font-bold text-blue-600">${currentStock.priceTarget}</div>
                      <div className="text-sm text-gray-600">+{currentStock.targetUpside}% upside potential</div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Market Cap</h3>
                      <div className="text-3xl font-bold text-gray-900">${currentStock.marketCap}B</div>
                      <div className="text-sm text-gray-600">{currentStock.sector}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Investment Thesis</h3>
                    <p className="text-gray-800 leading-relaxed">{currentStock.thesis}</p>
                  </div>
                </section>

                {/* Key Investment Points */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Key Investment Points</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Key Strengths
                      </h3>
                      <ul className="space-y-3">
                        {currentStock.keyStrengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm leading-relaxed">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Key Risks
                      </h3>
                      <ul className="space-y-3">
                        {currentStock.keyRisks.map((risk, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm leading-relaxed">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Financial Analysis */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Financial Analysis</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">${currentStock.financialMetrics.revenue}B</div>
                      <div className="text-sm text-gray-600">Revenue (TTM)</div>
                      <div className="text-sm font-semibold text-green-600">+{currentStock.financialMetrics.revenueGrowth}%</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{currentStock.financialMetrics.grossMargin}%</div>
                      <div className="text-sm text-gray-600">Gross Margin</div>
                      <div className="text-sm font-semibold text-green-600">+180bps YoY</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{currentStock.financialMetrics.operatingMargin}%</div>
                      <div className="text-sm text-gray-600">Operating Margin</div>
                      <div className="text-sm font-semibold text-green-600">+340bps YoY</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">${currentStock.financialMetrics.freeCashFlow}M</div>
                      <div className="text-sm text-gray-600">Free Cash Flow</div>
                      <div className="text-sm font-semibold text-green-600">Q1 Record</div>
                    </div>
                  </div>
                </section>

                {/* Valuation Analysis */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Valuation Analysis</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">DCF Price Targets</h3>
                      <div className="space-y-4">
                        {currentStock.dcfAnalysis.scenarios.map((scenario, index) => (
                          <div key={index} className={`p-4 rounded-lg border-2 ${
                            scenario.case === 'Bear' ? 'border-red-200 bg-red-50' :
                            scenario.case === 'Base' ? 'border-blue-200 bg-blue-50' :
                            'border-green-200 bg-green-50'
                          }`}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold">{scenario.case} Case</span>
                              <span className="text-xl font-bold">${scenario.priceTarget}</span>
                            </div>
                            <div className="text-sm text-gray-600">{scenario.assumptions}</div>
                            <div className="text-xs text-gray-500 mt-1">{scenario.probability}% probability</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Valuation Multiples</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-gray-600">P/E Ratio</span>
                          <span className="font-semibold">{currentStock.valuation.peRatio}x</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-gray-600">PEG Ratio</span>
                          <span className="font-semibold">{currentStock.valuation.pegRatio}x</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-gray-600">EV/Revenue</span>
                          <span className="font-semibold">{currentStock.valuation.evRevenue}x</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-gray-600">EV/EBITDA</span>
                          <span className="font-semibold">{currentStock.valuation.evEbitda}x</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Price Performance Chart */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Price Performance</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={currentStock.priceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #d1d5db', 
                            borderRadius: '6px',
                            fontSize: '12px'
                          }} 
                        />
                        <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={3} name={currentStock.ticker} />
                        <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" strokeWidth={2} name="Sector Index" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                {/* Peer Comparison */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Peer Comparison</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Market Cap ($B)</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Revenue Growth</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Operating Margin</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">P/E Ratio</th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentStock.peerComparison.map((peer, index) => (
                          <tr key={index} className={peer.company === currentStock.ticker ? 'bg-blue-50' : ''}>
                            <td className="px-4 py-3">
                              <div className="font-semibold text-gray-900">{peer.company}</div>
                              <div className="text-sm text-gray-600">{peer.name}</div>
                            </td>
                            <td className="px-4 py-3 text-right font-medium">{peer.marketCap}</td>
                            <td className={`px-4 py-3 text-right font-medium ${peer.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {peer.growth >= 0 ? '+' : ''}{peer.growth}%
                            </td>
                            <td className={`px-4 py-3 text-right font-medium ${peer.margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {peer.margin}%
                            </td>
                            <td className="px-4 py-3 text-right font-medium">{peer.pe}x</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                peer.recommendation === 'BUY' ? 'bg-green-100 text-green-800' :
                                peer.recommendation === 'HOLD' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {peer.recommendation}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* ESG Analysis */}
                <section className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">ESG Analysis</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Overall ESG Score</h3>
                          <span className="text-3xl font-bold text-blue-600">{currentStock.esgScores.overall}/100</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">{currentStock.esgScores.percentile}th percentile in sector</div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Environmental</span>
                              <span className="text-sm font-semibold">{currentStock.esgScores.environmental}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: `${currentStock.esgScores.environmental}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Social</span>
                              <span className="text-sm font-semibold">{currentStock.esgScores.social}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: `${currentStock.esgScores.social}%`}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-600">Governance</span>
                              <span className="text-sm font-semibold">{currentStock.esgScores.governance}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{width: `${currentStock.esgScores.governance}%`}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-gray-50 p-6 rounded-lg h-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Score Breakdown</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Environmental', value: currentStock.esgScores.environmental },
                                { name: 'Social', value: currentStock.esgScores.social },
                                { name: 'Governance', value: currentStock.esgScores.governance }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}`}
                            >
                              {ESGColors.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Recent News & Catalysts */}
                <section className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">Recent News & Catalysts</h2>
                  <div className="space-y-4">
                    {currentStock.recentNews.map((news, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          news.sentiment === 'positive' ? 'bg-green-500' :
                          news.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-semibold text-gray-900">{news.headline}</h4>
                            <span className="text-sm text-gray-500">{news.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Report Footer */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">Apex Research</h3>
                      <p className="text-sm text-gray-600">Professional Investment Research</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Report Date: {reportDate}</p>
                      <p className="text-sm text-gray-600">Next Review: {new Date(new Date(reportDate).setMonth(new Date(reportDate).getMonth() + 1)).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Disclaimer:</strong> This report is for informational purposes only and does not constitute investment advice. 
                      Past performance does not guarantee future results. Please consult with a qualified financial advisor before making investment decisions. 
                      The information contained herein is based on sources believed to be reliable but is not guaranteed to be accurate or complete.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Dashboard</h2>
                  
                  {/* Portfolio Overview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-800 mb-1">Total Value</div>
                        <div className="text-2xl font-bold text-blue-900">$1.24M</div>
                        <div className="text-sm text-green-600">+12.4% YTD</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-800 mb-1">Unrealized P/L</div>
                        <div className="text-2xl font-bold text-green-900">+$132K</div>
                        <div className="text-sm text-green-600">+12.1%</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-sm text-yellow-800 mb-1">Dividend Income</div>
                        <div className="text-2xl font-bold text-yellow-900">$8.2K</div>
                        <div className="text-sm text-gray-600">TTM</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-800 mb-1">Portfolio Beta</div>
                        <div className="text-2xl font-bold text-purple-900">0.98</div>
                        <div className="text-sm text-gray-600">Market Neutral</div>
                      </div>
                    </div>
                    
                    {/* Portfolio Performance Chart */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={[
                          { month: 'Jan', value: 1100 },
                          { month: 'Feb', value: 1120 },
                          { month: 'Mar', value: 1150 },
                          { month: 'Apr', value: 1180 },
                          { month: 'May', value: 1210 },
                          { month: 'Jun', value: 1240 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #d1d5db', 
                              borderRadius: '6px',
                              fontSize: '12px'
                            }} 
                          />
                          <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Watchlist Performance */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Watchlist Performance</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Change</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Market Cap</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Recommendation</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {watchlist.map((ticker) => {
                            const stock = stockData[ticker];
                            return (
                              <tr key={ticker} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                  <div className="font-semibold text-gray-900">{stock.ticker}</div>
                                  <div className="text-sm text-gray-600">{stock.companyName}</div>
                                </td>
                                <td className="px-4 py-3 text-right font-medium">${stock.price.toFixed(2)}</td>
                                <td className={`px-4 py-3 text-right font-medium ${
                                  stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                                </td>
                                <td className="px-4 py-3 text-right font-medium">${stock.marketCap}B</td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    stock.recommendation === 'BUY' ? 'bg-green-100 text-green-800' :
                                    stock.recommendation === 'HOLD' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {stock.recommendation}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                    onClick={() => setSelectedStock(ticker)}
                                  >
                                    View Report
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Alerts</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                      All Alerts
                    </button>
                    <button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                      Price Alerts
                    </button>
                    <button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                      News Alerts
                    </button>
                    <button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                      Earnings Alerts
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-yellow-900">Price Alert: SPOT</h4>
                          <span className="text-sm text-yellow-700">2 hours ago</span>
                        </div>
                        <p className="text-sm text-yellow-800">Spotify (SPOT) has reached your target price of $625. Consider reviewing your position.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-green-900">News Alert: AAPL</h4>
                          <span className="text-sm text-green-700">5 hours ago</span>
                        </div>
                        <p className="text-sm text-green-800">Apple announces AI partnership with OpenAI for iOS 19, potentially accelerating services growth.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-blue-900">Earnings Alert: MSFT</h4>
                          <span className="text-sm text-blue-700">1 day ago</span>
                        </div>
                        <p className="text-sm text-blue-800">Microsoft reports Q2 earnings with Azure growth at 28% YoY, exceeding expectations of 25%.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-red-900">Risk Alert: SPOT</h4>
                          <span className="text-sm text-red-700">3 days ago</span>
                        </div>
                        <p className="text-sm text-red-800">European Commission investigation into app store policies could impact Spotify's distribution costs.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentResearchPlatform;