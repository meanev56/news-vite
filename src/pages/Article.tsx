
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article as ArticleType } from '@/lib/api';
import { fetchArticleBySlug, fetchArticles, getArticleImageUrl, formatDate } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedArticle = await fetchArticleBySlug(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          // Set page title
          document.title = fetchedArticle.title.rendered + " - Nairametrics";
          
          // Load related articles from the same category if available
          if (fetchedArticle.categories && fetchedArticle.categories.length > 0) {
            loadRelatedArticles(fetchedArticle.categories[0], fetchedArticle.id);
          } else {
            setIsRelatedLoading(false);
          }
        } else {
          setError("Article not found");
          setIsRelatedLoading(false);
        }
      } catch (err) {
        setError("Failed to load article");
        setIsRelatedLoading(false);
        console.error("Error loading article:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadRelatedArticles = async (categoryId: number, currentArticleId: number) => {
      setIsRelatedLoading(true);
      try {
        const articles = await fetchArticles(categoryId, 4);
        // Filter out the current article
        setRelatedArticles(articles.filter(a => a.id !== currentArticleId));
      } catch (error) {
        console.error("Error loading related articles:", error);
      } finally {
        setIsRelatedLoading(false);
      }
    };

    loadArticle();
    
    // Reset title when component unmounts
    return () => {
      document.title = "Nairametrics";
    };
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-4 text-[#0A2647] hover:text-[#205295]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-100 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">{error}</h2>
            <p className="text-gray-600 mb-4">The article you requested could not be loaded.</p>
            <Link to="/">
              <Button className="bg-news-primary hover:bg-[#144272]">
                Return to Home
              </Button>
            </Link>
          </div>
        ) : article ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <article className="bg-white shadow-sm rounded-lg overflow-hidden lg:col-span-8">
              <div className="h-100 relative">
                <img 
                  src={getArticleImageUrl(article)} 
                  alt={article.title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <h1 
                  className="text-2xl md:text-4xl font-bold mb-4 text-[#0A2647]" 
                  dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                ></h1>
                
                <div className="flex items-center justify-between text-gray-500 mb-6">
                  <span>{formatDate(article.date, { showTime: true })}</span>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content.rendered }}
                ></div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link to="/">
                    <Button className="bg-news-primary hover:bg-[#144272]">
                      Read More Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
            
            <aside className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-news-accent inline-block pb-1">Related Articles</h2>
                {isRelatedLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex space-x-3">
                        <Skeleton className="h-16 w-24 rounded" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : relatedArticles.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticles.slice(0, 3).map(article => (
                      <ArticleCard key={article.id} article={article} variant="minimal" />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No related articles found</p>
                )}
              </div>
            </aside>
          </div>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default Article;
