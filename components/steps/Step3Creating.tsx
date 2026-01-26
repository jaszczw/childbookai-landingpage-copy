"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { HeadingText } from "../typography";
import ProgressBar from "@/components/ui/progress-bar";
import ProgressBadge from "@/components/ui/progress-badge";
import { Skeleton } from "@/components/ui/skeleton";

const Step3Creating: React.FC = () => {
  const [progress, setProgress] = useState(0);

  // Sequential image loading logic
  const imageProgresses = useMemo(() => {
    const totalImages = 3;
    const progressPerImage = 100 / totalImages; // ~33.33% per image
    const newProgresses = [0, 0, 0];
    
    if (progress >= 100) {
      // All images complete when overall is 100%
      return [100, 100, 100];
    }
    
    // Calculate which image is currently loading
    const currentImageIndex = Math.floor(progress / progressPerImage);
    const progressInCurrentImage = (progress % progressPerImage) / progressPerImage * 100;
    
    // Set completed images to 100%
    for (let i = 0; i < currentImageIndex; i++) {
      newProgresses[i] = 100;
    }
    
    // Set current image progress
    if (currentImageIndex < totalImages) {
      newProgresses[currentImageIndex] = Math.min(progressInCurrentImage, 100);
    }
    
    return newProgresses;
  }, [progress]);

  // Test progress animation - remove this in production
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // Update every 100ms for testing

    return () => clearInterval(interval);
  }, []);

  const previewImages = [
    { src: "/images/child-preview-image.png" },
    { src: "/images/child-preview-image-1.png" },
    { src: "/images/child-preview-image-2.png" },
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-4">
      {/* Heading */}
      <HeadingText
        variant="h1"
        title="Create Your Story"
        className="text-center font-bold text-foreground"
      />
      {/* Subheading with highlighted text */}
      <div className="text-center max-w-xl">
        <p className="text-lg text-foreground">
          We&apos;re creating your story and will email you the book once ready. This takes{" "}
          <span className="font-bold">5-8 minutes</span>
          . If there&apos;s no progress after{" "}
          <span className="font-bold">15 minutes</span>
          , please contact{" "}
          <a 
            href="mailto:support@childbook.ai" 
            className="text-primary font-semibold hover:underline"
          >
            support@childbook.ai
          </a>
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar progress={progress} showSections={true} />

      {/* Image Preview Grid */}
      <div className="w-full max-w-[820px] grid grid-cols-4 gap-4 mt-2 justify-center">
        {/* First 3 images */}
        {previewImages.map((image, index) => {
          const imageProgress = imageProgresses[index];
          const isCompleted = imageProgress >= 100;
          
          return (
            <div key={index} className="relative rounded-md overflow-hidden" style={{ width: '190px', height: '190px' }}>
              <Image
                src={image.src}
                alt={`Preview ${index + 1}`}
                width={190}
                height={190}
                className={`w-full h-full object-cover rounded-md transition-all duration-300 ${
                  isCompleted ? "" : "blur-sm"
                }`}
              />
              {/* Progress badge */}
              <ProgressBadge 
                progress={imageProgress} 
                isCompleted={isCompleted}
              />
            </div>
          );
        })}
        
        {/* Skeleton placeholders for remaining 5 slots */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} className="rounded-md" style={{ width: '190px', height: '190px' }} />
        ))}
      </div>
      
      {/* Test indicator - remove in production */}
      <div className="text-sm text-gray-500 mt-2">
        Progress: {progress}%
      </div>

    </div>
  );
};

export default Step3Creating;
