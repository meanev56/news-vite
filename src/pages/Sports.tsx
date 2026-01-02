
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LogoHeader from '@/components/LogoHeader';
import Footer from '@/components/Footer';
import type { Article } from '@/lib/api';
import { fetchArticles, formatDate } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const Sports = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSportsArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Category ID 3 represents sports in many WordPress setups, but you may need to adjust
        // We'll search by category slug 'sports' from the API endpoint
        const response = await fetch('https://nairametrics.com/wp-json/wp/v2/categories?slug=sport-news');
        const categories = await response.json();
        
        if (categories && categories.length > 0) {
          const sportsCategory = categories[0];
          const articles = await fetchArticles(sportsCategory.id, 15);
          setArticles(articles);
        } else {
          // Fallback to search for sports-related content if category not found
          const allArticles = await fetchArticles(undefined, 30);
          const sportsArticles = allArticles.filter(article => 
            article.title.rendered.toLowerCase().includes('sports') ||
            article.excerpt.rendered.toLowerCase().includes('sports') ||
            article.title.rendered.toLowerCase().includes('football') ||
            article.title.rendered.toLowerCase().includes('league')
          );
          setArticles(sportsArticles.slice(0, 15));
        }
      } catch (err) {
        console.error('Error fetching sports articles:', err);
        setError('Failed to load sports articles');
        toast({
          title: "Error",
          description: "Failed to load sports articles. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSportsArticles();
  }, []);
  
  // Set page title
  useEffect(() => {
    document.title = "Sports News | Nairametrics";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LogoHeader />
      <Navbar />
      <main className="grow container mx-auto px-4 py-6">
        <div className="bg-gray-800 text-white px-4 py-2 mb-6">
          <h1 className="text-xl font-bold">SPORTS</h1>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6">
                <Skeleton className="h-40 w-full md:w-52 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-6">
            {/* Featured article */}
            {articles.length > 0 && (
              <div className="mb-8">
                <Link to={`/article/${articles[0].slug}`} className="block group">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <img 
                        src={articles[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                        alt={articles[0].title.rendered}
                        className="w-full h-48 md:h-64 object-cover rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <h2 
                        className="text-xl md:text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: articles[0].title.rendered }}
                      ></h2>
                      <div className="text-sm text-gray-500 mb-3">{formatDate(articles[0].date)}</div>
                      <div 
                        className="text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: articles[0].excerpt.rendered }}
                      ></div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            {/* List of articles */}
            {articles.slice(1).map(article => (
              <div key={article.id} className="border-b border-gray-200 pb-6 last:border-0">
                <Link to={`/article/${article.slug}`} className="group flex flex-col md:flex-row gap-4">
                  <div className="md:w-48 lg:w-56">
                    <img 
                      src={article._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                      alt={article.title.rendered}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 
                      className="text-lg font-bold mb-2 group-hover:text-red-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                    ></h2>
                    <div className="text-sm text-gray-500 mb-2">{formatDate(article.date)}</div>
                    <div 
                      className="text-gray-700 text-sm line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                    ></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No sports articles found</p>
          </div>
        )}
        
        {/* Advertisements - matching the layout in the image */}
        <div className="my-8 text-center">
          <div className="bg-gray-200 p-4 rounded-md">
            <p className="text-sm text-gray-500">ADVERTISEMENT</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sports;
