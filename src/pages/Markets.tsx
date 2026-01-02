import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '@/lib/api';
import { fetchArticles, formatDate } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartLine, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const Markets = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        // Fetch market category articles
        const response = await fetch('https://nairametrics.com/wp-json/wp/v2/categories?slug=market-news');
        const categories = await response.json();
        
        if (categories.length > 0) {
          const marketCategoryId = categories[0].id;
          const fetchedArticles = await fetchArticles(marketCategoryId, 12);
          
          if (fetchedArticles.length > 0) {
            setFeaturedArticle(fetchedArticles[0]);
            setArticles(fetchedArticles.slice(1));
          }
        }
        
        // Set page title
        document.title = "Markets - Nairametrics";
      } catch (error) {
        console.error('Error loading market articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white border-b border-red-600 pb-2 inline-block">MARKETS</h1>
        </div>

        {/* Featured Article and Market Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            <>
              <Skeleton className="h-100 col-span-2 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
            </>
          ) : (
            <>
              {/* Featured Article */}
              <div className="lg:col-span-2">
                {featuredArticle && (
                  <Link to={`/article/${featuredArticle.slug}`} className="block">
                    <div className="relative h-100 rounded-lg overflow-hidden group">
                      <img 
                        src={featuredArticle._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                        alt={featuredArticle.title.rendered}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold mb-3 inline-block">MARKETS</span>
                        <h2 
                          className="text-xl md:text-3xl font-bold text-white mb-2" 
                          dangerouslySetInnerHTML={{ __html: featuredArticle.title.rendered }}
                        ></h2>
                        <div className="flex items-center text-gray-300 text-sm">
                          <span>{formatDate(featuredArticle.date, { showTime: false })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Market Stats Cards */}
              <div className="space-y-4">
                <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                      NSE All-Share Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">63,870.89</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <span>+1.23%</span>
                    </div>
                    <div className="h-16 mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <DollarSign className="h-4 w-4 mr-2 text-yellow-500" />
                      USD/NGN Exchange
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">₦1,580.25</div>
                    <div className="flex items-center text-red-500 text-sm">
                      <span>-0.35%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-sm font-medium">
                      <ChartLine className="h-4 w-4 mr-2 text-blue-500" />
                      Market Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white mb-1">428.5M</div>
                    <div className="flex items-center text-green-500 text-sm">
                      <span>+12.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>

        {/* Market News Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-red-600 pb-2 inline-block">MARKET NEWS</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <div key={article.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                  <Link to={`/article/${article.slug}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                        alt={article.title.rendered}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 
                        className="text-lg font-bold mb-2 hover:text-blue-400 transition-colors line-clamp-2" 
                        dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                      ></h3>
                      <div className="text-sm text-gray-400 mb-3">{formatDate(article.date)}</div>
                      <div 
                        className="text-sm text-gray-300 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                      ></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors">
              View More Market News
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Markets;
