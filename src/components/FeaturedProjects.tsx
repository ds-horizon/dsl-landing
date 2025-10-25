import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface GithubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

const fetchGithubRepos = async (): Promise<GithubRepo[]> => {
  const response = await fetch('https://api.github.com/orgs/ds-horizon/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
};

const FeaturedProjects = () => {
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['github-repos'],
    queryFn: fetchGithubRepos
  });

  // Filter for featured projects - you can customize this list
  const featuredRepoNames = [
    'react-native-fast-image', 
    'marco', 
    'checkmate', 
    'defrost', 
    'rn-benchmarking'
  ];
  
  // Filter for featured repos and sort by star count
  const featuredRepos = repos
    ?.filter(repo => featuredRepoNames.includes(repo.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count) || [];

  return (
    <section id="featured-projects" className="section-container">
      <div className="flex items-center justify-between mb-8">
        <h2 className="section-heading">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <Button 
          asChild
          variant="outline" 
          size="lg"
          className="btn-hover-effect group relative overflow-hidden transition-all duration-300"
        >
          <Link to="/projects" className="flex items-center gap-2">
            View All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {featuredRepos.map((repo) => (
            <ProjectCard
              key={repo.name}
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
  );
};

export default FeaturedProjects;
