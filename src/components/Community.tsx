import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Users, 
  ExternalLink,
  TrendingUp,
  GitPullRequest,
  Heart,
  Share2,
  MessageSquare
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import projectsData from "@/data/projects.json";

const iconComponents = {
  Github: <Github className="h-5 w-5" />,
  Twitter: <Twitter className="h-5 w-5" />,
  Linkedin: <Linkedin className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  Users: <Users className="h-4 w-4" />,
  MapPin: <MapPin className="h-4 w-4" />,
  GitPullRequest: <GitPullRequest className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />
};

const SocialButton = ({ 
  icon, 
  label, 
  href,
  stats
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  stats?: string;
}) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className="gap-2 w-full group relative overflow-hidden transition-all duration-300 hover:border-primary"
    >
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="py-6 flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-2">
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span>{label}</span>
        </div>
        {stats && (
          <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
            {stats}
          </div>
        )}
      </a>
    </Button>
  );
};

const MeetupCard = ({
  title,
  date,
  location,
  attendees,
  imageSrc,
  link
}: {
  title: string;
  date: string;
  location: string;
  attendees: string;
  imageSrc: string;
  link: string;
}) => {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg border-border hover:border-primary">
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{attendees}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full justify-center group-hover:border-primary group-hover:text-primary transition-all duration-300">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <span>View Details</span>
            <ExternalLink className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Community = () => {
  const { meetups, socialLinks } = projectsData;

  return (
    <section id="community" className="section-container bg-card/50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Join Our <span className="text-gradient">Community</span></h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-16 pt-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <p className="text-center text-lg text-muted-foreground mb-12">
              DreamSportsLabs actively engages with the developer community through meetups, tech blogs, and open source contributions. 
              Join us to stay updated with our latest initiatives.
            </p>
            
            {/* Meetups Section with Enhanced UI */}
            <div className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50"></div>
                <h3 className="text-2xl font-bold text-center">Recent <span className="text-gradient">Meetups</span></h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meetups.map(meetup => (
                  <MeetupCard
                    key={meetup.id}
                    title={meetup.title}
                    date={meetup.date}
                    location={meetup.location}
                    attendees={meetup.attendees}
                    imageSrc={meetup.imageSrc}
                    link={meetup.link}
                  />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="group transition-all duration-300 hover:border-primary hover:bg-primary/5"
                >
                  <a href="https://x.com/Dream11Engg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Follow for Upcoming Events</span>
                    <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Social Links with Enhanced UI */}
            <div className="relative pb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/50"></div>
                <h3 className="text-2xl font-bold text-center">Connect <span className="text-gradient">With Us</span></h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/50"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {socialLinks.map((link, index) => (
                  <SocialButton
                    key={link.id}
                    icon={iconComponents[link.icon as keyof typeof iconComponents]}
                    label={link.label}
                    href={link.href}
                    stats={index === 0 ? "3.2K stars" : index === 1 ? "5K followers" : undefined}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <Button
                  size="lg"
                  asChild
                  className="relative overflow-hidden group"
                >
                  <a 
                    href="https://github.com/orgs/ds-horizon/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Start Contributing</span>
                    <TrendingUp className="h-4 w-4 ml-1 group-hover:translate-y-[-2px] transition-transform duration-300" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
