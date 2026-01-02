
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LogoHeader from '@/components/LogoHeader';
import { Target, Globe, Shield, Lightbulb, Star } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us - Nairametrics";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <LogoHeader />
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About BusinessDay Nigeria</h1>
          
          <div className="space-y-6 mb-12">
            <p className="text-lg">
              Nairametrics is the premier provider of business and financial intelligence and insight in West Africa and a two-time winner of the Diageo Africa business 
              newspaper of the year award in 2010. It is 100 per cent owned by BusinessDay Media Limited, an independent media company incorporated in Lagos.
            </p>
            
            <p className="text-lg">
              Established in 2001 by a group led by first-class journalist Frank Aigbogun, BusinessDay is published with content from the Financial Times under a long lasting 
              syndication partnership that ensures that members of our community have access to unrivaled local and global insights and newsbreaks.
            </p>
          </div>
          
          {/* Vision & Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Vision</h2>
              <p className="text-center">
                To be the preferred source of reliable, trusted in-depth business news and analysis in Africa and beyond. We aspire 
                to lead in shaping the narrative, fostering informed decisions, and nurturing progress in the business and across 
                the entire economic landscape.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">Mission</h2>
              <p className="text-center">
                To be a diversified provider of superior business, financial and management intelligence across all platforms accessible to 
                all our customers anywhere in the world.
              </p>
            </div>
          </div>
          
          {/* Company History */}
          <div className="space-y-6 mb-12">
            <p className="text-lg">
              Nigeria's premier private equity firm Capital Alliance took a forty per cent equity in BusinessDay Media Limited in 2002. This holding grew to about 60 per cent in 
              2004 when it formed Johnnic West Africa Limited with Johnnic Communications of South Africa, owners of Business Day SA. This controlling equity is now held 
              by management led by the Publisher, Frank Aigbogun.
            </p>
            
            <p className="text-lg">
              Nairametrics, regarded as the most trusted media outlet among the Nigerian investor community, also has some of Nigeria's finest journalists and writers and, it is 
              known for its insightful commentaries and well-researched reports. Published only five days a week at inception, BusinessDay has rapidly grown its online and 
              social media footprint leading to the launch of a paid digital subscription service in 2018 built upon a strategy document done by Boston Consulting Group, BCG. It 
              currently has over 4 million unique visitors to its website monthly.
            </p>
            
            <p className="text-lg">
              Apart from the print edition published Monday to Friday, Nairametrics has an online weekend edition called WEEKENDER as well as an online edition every 
              Sunday. They are both easy to read editions and also popular among Nigerian youths. BusinessDay is currently working on restarting BusinessDay Ghana under a 
              long-standing partnership.
            </p>
            
            <p className="text-lg">
              Nairametrics Media Limited is arguably the most diversified media company in Nigeria with investment in conferences and thought leadership as well as data and 
              market research and real estate.
            </p>
          </div>
          
          {/* Core Values */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Globe className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">As The fourth Estate we are Guarantors of liberal economic thought</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">nairametrics is Credible, Objective and fair-based</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Target className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">We are totally Independent and free from public and private interest</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Lightbulb className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Our teams are Entrepreneurial and constantly search for new opportunities while maintaining highest ethical standards.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Star className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold">BusinessDay people are purpose-driven and some of the most high-talented people who share our vision</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-6 mb-12">
            <p className="text-lg">
              Our summits and other thought leadership events provide platforms for growing our communities as well as for discussion and debate around current economic 
              and industrial challenges facing Nigeria and sub-Saharan Africa and have become the foremost thought leadership events dedicated to promoting a thriving private 
              sector in Nigeria, Africa's most populous nation.
            </p>
            
            <p className="text-lg">
              nairametrics' annual CEO Forum Nigeria is a ground-breaking initiative initiated twelve years ago by BusinessDay Nigeria in collaboration with McKinsey & Co. 
              This annual event brings together the largest collection of Nigeria's business elite and has attracted speakers like Professor Michael Porter, the world acclaimed 
              economist and researcher at Harvard Business School; Paul Collier, Professor of Economics and Public Policy at the Blavatnik School of Government at the 
              University of Oxford; Richard Edgleton (Global CEO of TNS – one of the World's largest insight, information and consultancy groups); Rich Lesser (Global CEO of 
              the Boston Consulting Group), and Peter Tufano, dean of the Business School at Oxford University, Prof Jeffery Sachs, Prof Hal Gregersen the master of modern 
              innovation at MIT, among other leading visionaries.
            </p>
            
            <p className="text-lg">
              In 2023, Nairametrics established a foundation, BusinessDay Centre for Social & Economic Development to help advance its advocacy work in the area of 
              promoting liberal economic concepts and pushing the cause of small and medium size, SMEs in Nigeria.
            </p>
            
            <p className="text-lg">
              nairametrics's corporate governance structures are the envy of its peers. Its board of directors is composed of men and women of sound character and led by Dr 
              Richard Ikiebe, a writer and journalism scholar at the Pan Atlantic University. In addition, BusinessDay has an independent editorial advisory board made up of 
              leading Nigerian business luminaries who help in shaping the content of the newspaper from time to time.
            </p>
            
            <p className="text-lg">
              Nairametrics has now set its sight on the next phase of growth across various mass media platforms leveraging the best technology available for innovation and 
              expansion.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-950 py-4 text-center text-sm">
        <div className="container mx-auto">
          <p>© 2024 - Nairametrics Media Limited. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
