import { Helmet } from "react-helmet";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

const fetchAllGithubRepos = async (): Promise<GithubRepo[]> => {
  const response = await fetch('https://api.github.com/orgs/ds-horizon/repos?per_page=100');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
};

const AllProjects = () => {
  const navigate = useNavigate();
  
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['all-github-repos'],
    queryFn: fetchAllGithubRepos
  });

  // Sort repositories by star count in descending order
  const sortedRepos = repos?.sort((a, b) => b.stargazers_count - a.stargazers_count) || [];

  return (
    <ThemeProvider defaultTheme="light">
      <Helmet>
        <title>All Projects - DreamSportsLabs</title>
        <meta name="description" content="Browse all open source projects by DreamSportsLabs, Dream11's initiative for advancing sports technology." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <section className="section-container">
            <div className="flex items-center justify-between mb-10">
              <h1 className="section-heading">
                <span className="text-gradient">All Projects</span>
              </h1>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="btn-hover-effect transition-all duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="p-6 border rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-6" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <p className="text-red-500">Failed to load projects from GitHub. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedRepos.map((repo) => (
                  <ProjectCard
                    key={repo.id}
                    title={repo.name}
                    description={repo.description || "No description available"}
                    logoSrc="/placeholder.svg"
                    stars={repo.stargazers_count}
                    githubUrl={repo.html_url}
                    variant="featured"
                  />
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AllProjects;
