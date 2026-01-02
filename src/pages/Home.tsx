import { useEffect, useState } from "react";

import LogoHeader from "@/components/LogoHeader";
import Navbar from "@/components/Navbar";
import TopNewsSidebar from "@/components/TopNewsSidebar";
import MainArticle from "@/components/MainArticle";
import RecentSidebar from "@/components/RecentSidebar";
import FeaturedSection from "@/components/FeaturedSection";
import NewsGrid from "@/components/NewsGrid";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";

import { toast } from "@/components/ui/use-toast";
import type { Category } from "@/lib/api";
import { fetchCategories } from "@/lib/api";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    toast({
      title: "Welcome to Nairametrics",
      description:
        "Get the latest news and insights from Nigeria's leading business newspaper.",
    });

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setCategories(
          data
            .filter(cat => Number(cat.count) > 0)
            .slice(0, 4)
        );
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LogoHeader />
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Top layout */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-4">
              <TopNewsSidebar />
            </div>
            <div className="lg:col-span-4">
              <MainArticle />
            </div>
            <div className="lg:col-span-4">
              <RecentSidebar />
            </div>
          </section>

          <FeaturedSection />

          <section className="my-8">
            <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-6">
              LATEST NEWS
            </h2>
            <NewsGrid />
          </section>

          {!isLoading &&
            categories.map(category => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                title={category.name.toUpperCase()}
              />
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
