"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="card-hover bg-card/50 backdrop-blur-sm border-border/50 mx-auto max-w-2xl">
                <CardHeader className="text-center">
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <CardTitle className="font-heading text-xl text-primary">
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-accent">
                    {testimonial.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground italic text-lg">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
